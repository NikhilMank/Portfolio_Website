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


def main():
    # Load all .md files - using TextLoader to preserve markdown headers
    loader = DirectoryLoader(DATA_DIR, glob="*.md", loader_cls=TextLoader)
    docs = loader.load()
    print(f"Loaded {len(docs)} documents")

    # Split documents by markdown headers (both ## and ###)
    # This keeps each job, project, or subsection as a single chunk
    header_splitter = MarkdownHeaderTextSplitter(
        headers_to_split_on=[
            ("##", "section"),
            ("###", "subsection"),
        ]
    )

    chunks = []
    for doc in docs:
        doc_chunks = header_splitter.split_text(doc.page_content)
        # Preserve source metadata
        for chunk in doc_chunks:
            chunk.metadata["source"] = Path(doc.metadata.get("source", "unknown")).name
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