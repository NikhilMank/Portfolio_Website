import os
import boto3
from pathlib import Path
from dotenv import load_dotenv
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import MarkdownHeaderTextSplitter
from langchain_aws import BedrockEmbeddings
from langchain_community.vectorstores import FAISS

load_dotenv()

DATA_DIR = str(Path(__file__).resolve().parent.parent.parent / "data" / os.environ["DATA_FOLDER"])
S3_BUCKET = os.getenv("S3_BUCKET")
S3_INDEX_KEY = os.getenv("S3_INDEX_KEY")
EMBEDDING_MODEL_ID = os.getenv("EMBEDDING_MODEL_ID")
AWS_REGION = os.getenv("BEDROCK_REGION")


def get_content_type(filename):
    """Map filename to content type."""
    content_type_map = {
        "bio.md": "bio",
        "education.md": "education",
        "experience.md": "experience",
        "projects.md": "project",
        "skills_matrix.md": "skill",
        "soft_skills.md": "soft_skill",
    }
    return content_type_map.get(filename.lower(), "unknown")


def main():
    # Load all .md files - using TextLoader to preserve markdown headers
    loader = DirectoryLoader(DATA_DIR, glob="*.md", loader_cls=TextLoader)
    docs = loader.load()
    print(f"Loaded {len(docs)} documents")

    # Split documents by main markdown headers only (##)
    # This keeps each major section as one chunk with all sub-content
    header_splitter = MarkdownHeaderTextSplitter(
        headers_to_split_on=[
            ("##", "section"),
        ]
    )

    chunks = []
    for doc in docs:
        doc_chunks = header_splitter.split_text(doc.page_content)

        # Get source filename and determine content_type
        source_file = Path(doc.metadata.get("source", "unknown")).name
        content_type = get_content_type(source_file)

        # Preserve metadata
        for chunk in doc_chunks:
            chunk.metadata["source"] = source_file
            chunk.metadata["content_type"] = content_type
        chunks.extend(doc_chunks)

    print(f"Total chunks: {len(chunks)}")

    # Generate embeddings and build FAISS index
    embeddings = BedrockEmbeddings(
        model_id=EMBEDDING_MODEL_ID,
        client=boto3.client("bedrock-runtime", region_name=AWS_REGION)
    )
    index = FAISS.from_documents(chunks, embeddings)
    print("FAISS index built")

    # Save index locally then upload to S3
    index.save_local("/tmp/faiss_index")
    s3 = boto3.client("s3")
    for file in ["index.faiss", "index.pkl"]:
        s3.upload_file(f"/tmp/faiss_index/{file}", S3_BUCKET, f"{S3_INDEX_KEY}/{file}")
        print(f"Uploaded s3://{S3_BUCKET}/{S3_INDEX_KEY}/{file}")

    print("\nDone!")


if __name__ == "__main__":
    main()