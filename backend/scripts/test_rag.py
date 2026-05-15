import os
import time
import boto3
from pathlib import Path
from dotenv import load_dotenv
from langchain_aws import BedrockEmbeddings, ChatBedrock
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

S3_BUCKET = os.getenv("S3_BUCKET")
S3_INDEX_KEY = os.getenv("S3_INDEX_KEY")
EMBEDDING_MODEL_ID = os.getenv("EMBEDDING_MODEL_ID")
LLM_MODEL_ID = os.getenv("LLM_MODEL_ID")
AWS_REGION = os.getenv("BEDROCK_REGION")
PORTFOLIO_OWNER = os.getenv("PORTFOLIO_OWNER")
TOP_K = int(os.getenv("TOP_K", 15))

FAISS_TMP_DIR = "/tmp/faiss_index"
# Use local index for testing
LOCAL_INDEX_DIR = str(Path(__file__).resolve().parent.parent.parent / "data" / "faiss_index")

# Keywords for content-type filtering (more specific)
CONTENT_TYPE_KEYWORDS = {
    "bio": ["who is", "contact", "location", "email", "phone", "languages", "about me", "personal"],
    "education": ["education", "academic", "degree", "university", "college", "studied", "grade", "thesis", "graduated", "study", "background"],
    "experience": ["experience", "work", "job", "employment", "internship", "role", "position", "company", "worked at", "career"],
    "project": ["project", "built", "developed", "created", "designed", "implemented"],
    "skill": ["skill", "programming", "technology", "tech", "cloud", "framework", "tool", "language"],
    "soft_skill": ["soft skill", "soft skills", "trait", "personality", "strengths", "approach"]
}


def get_relevant_content_types(query):
    """Determine which content types are relevant based on query keywords."""
    query_lower = query.lower()
    relevant = set()
    for content_type, keywords in CONTENT_TYPE_KEYWORDS.items():
        # Use word boundaries for more precise matching
        for kw in keywords:
            if kw in query_lower:
                relevant.add(content_type)
                break
    # If no match, default to all types (let embedding decide)
    return relevant if relevant else set(CONTENT_TYPE_KEYWORDS.keys())


def filter_chunks_by_content_type(docs, content_types):
    """Filter chunks to only include specified content types."""
    return [doc for doc in docs if doc.metadata.get("content_type") in content_types]


def similarity_search_with_filter(index, query, content_types, k=10):
    """Retrieve chunks by first filtering by content_type, then by similarity."""
    # Get all docs that match the content type
    all_docs = index.similarity_search(query, k=index.index.ntotal)
    filtered_docs = filter_chunks_by_content_type(all_docs, content_types)
    # Return top k of filtered
    return filtered_docs[:k]


# Test all questions
TEST_QUESTIONS = [
    f"Who is {PORTFOLIO_OWNER}?",
    f"What is {PORTFOLIO_OWNER}'s experience with RAG systems?",
    f"What cloud platforms has {PORTFOLIO_OWNER} worked with?",
    f"What is {PORTFOLIO_OWNER}'s educational background?",
    f"What programming languages does {PORTFOLIO_OWNER} know?",
    f"What are his experiences?"
]
# TEST_QUESTIONS = [
#     f"What is {PORTFOLIO_OWNER}'s educational background?",
# ]


def load_index():
    # Use local index if available, otherwise fall back to S3
    if os.path.exists(LOCAL_INDEX_DIR):
        print(f"Loading local index from: {LOCAL_INDEX_DIR}")
        embeddings = BedrockEmbeddings(
            model_id=EMBEDDING_MODEL_ID,
            client=boto3.client("bedrock-runtime", region_name=AWS_REGION)
        )
        index = FAISS.load_local(LOCAL_INDEX_DIR, embeddings, allow_dangerous_deserialization=True)
        return index, embeddings
    else:
        print(f"Local index not found, loading from S3...")
        s3 = boto3.client("s3")
        os.makedirs(FAISS_TMP_DIR, exist_ok=True)

        for file in ["index.faiss", "index.pkl"]:
            s3.download_file(S3_BUCKET, f"{S3_INDEX_KEY}/{file}", f"{FAISS_TMP_DIR}/{file}")

        embeddings = BedrockEmbeddings(
            model_id=EMBEDDING_MODEL_ID,
            client=boto3.client("bedrock-runtime", region_name=AWS_REGION)
        )
        index = FAISS.load_local(FAISS_TMP_DIR, embeddings, allow_dangerous_deserialization=True)
        return index, embeddings


def format_docs(docs):
    """Concatenates retrieved document chunks into a single context string."""
    return "\n\n".join(doc.page_content for doc in docs)


def generate_answer(context, question):
    """Generate answer using prompt and LLM."""
    prompt = PromptTemplate(
        template=(
            "You are an AI assistant representing {owner} on his portfolio website.\n"
            "Use ALL the context provided below to answer the question comprehensively.\n"
            "Do not summarize - include all relevant details from the context.\n"
            "Do not mention context, documents, or retrieved information.\n"
            "If the information is unavailable, say you do not have that information.\n"
            "Avoid making assumptions or inventing details.\n\n"

            "Context:\n{context}\n\n"

            "Question: {question}\n"
            "Answer:"
        ),
        input_variables=["context", "question"],
        partial_variables={"owner": PORTFOLIO_OWNER}
    )
    llm = ChatBedrock(
        model_id=LLM_MODEL_ID,
        client=boto3.client("bedrock-runtime", region_name=AWS_REGION)
    )

    return prompt | llm | StrOutputParser()


def main():
    print(f"Loading FAISS index (TOP_K={TOP_K})...")
    index, embeddings = load_index()
    print("Index loaded\n")

    for question in TEST_QUESTIONS:
        print(f"Q: {question}")

        # Determine relevant content types based on keywords
        relevant_types = get_relevant_content_types(question)
        print(f"  Relevant content types: {relevant_types}")

        # Pre-filter approach: get all docs, filter by content type first, then similarity
        if relevant_types != set(CONTENT_TYPE_KEYWORDS.keys()):
            # Use pre-filtering - get all matching content type docs, then sort by similarity
            filtered_docs = similarity_search_with_filter(index, question, relevant_types, k=TOP_K)
            print(f"  Retrieved {len(filtered_docs)} {relevant_types} chunks")
        else:
            # No specific content type - use regular similarity search
            docs = index.similarity_search(question, k=TOP_K)
            filtered_docs = docs
            print(f"  Retrieved {len(docs)} chunks (no content type filter)")

        # Show metadata
        sources = [d.metadata.get("source", "unknown") for d in filtered_docs]
        content_types = [d.metadata.get("content_type", "unknown") for d in filtered_docs]
        print(f"  Sources: {set(sources)}")
        print(f"  Content types: {set(content_types)}")

        # Format context
        context = format_docs(filtered_docs)
        print(f"Context: {context}")

        # Generate answer
        try:
            answer = generate_answer(context, question).invoke({"context": context, "question": question})
            print(f"A: {answer}")
        except Exception as e:
            print(f"Error: {e}")

        print("-" * 60)
        time.sleep(5)


if __name__ == "__main__":
    main()