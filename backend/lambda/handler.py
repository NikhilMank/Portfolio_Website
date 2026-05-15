import os
import json
import boto3
from langchain_aws import BedrockEmbeddings, ChatBedrock
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableParallel

# --- Config (from Lambda environment variables) ---
S3_BUCKET = os.environ["S3_BUCKET"]
S3_INDEX_KEY = os.environ["S3_INDEX_KEY"]
EMBEDDING_MODEL_ID = os.environ["EMBEDDING_MODEL_ID"]
LLM_MODEL_ID = os.environ["LLM_MODEL_ID"]
BEDROCK_REGION = os.environ["BEDROCK_REGION"]
PORTFOLIO_OWNER = os.environ["PORTFOLIO_OWNER"]
TOP_K = int(os.environ.get("TOP_K", 5))

FAISS_TMP_DIR = "/tmp/faiss_index"

# Keywords for content-type filtering
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
        for kw in keywords:
            if kw in query_lower:
                relevant.add(content_type)
                break
    return relevant if relevant else set(CONTENT_TYPE_KEYWORDS.keys())


def filter_chunks_by_content_type(docs, content_types):
    """Filter chunks to only include specified content types."""
    return [doc for doc in docs if doc.metadata.get("content_type") in content_types]


def similarity_search_with_filter(index, query, content_types, k=10):
    """Retrieve chunks by first filtering by content_type, then by similarity."""
    all_docs = index.similarity_search(query, k=index.index.ntotal)
    filtered_docs = filter_chunks_by_content_type(all_docs, content_types)
    return filtered_docs[:k]


# --- Globals for warm start caching ---
chain = None
index = None
embeddings = None


def format_docs(docs):
    """Concatenates retrieved document chunks into a single context string."""
    return "\n\n".join(doc.page_content for doc in docs)


def build_retrieval_chain(retriever):
    """Retrieves relevant chunks and formats them as a context string."""
    return retriever | format_docs


def build_generation_chain():
    """Fills the prompt with context and question, calls the LLM, and parses the output."""
    llm = ChatBedrock(
        model_id=LLM_MODEL_ID,
        client=boto3.client("bedrock-runtime", region_name=BEDROCK_REGION)
    )
    prompt = PromptTemplate(
        template=(
            "You are an AI assistant representing {owner} on his portfolio website.\n"
            "Answer questions about {owner} in a natural, confident, and professional tone — as if you know him well.\n"
            "Do not say phrases like 'based on the context provided' or 'according to the context'.\n"
            "Just answer directly and naturally.\n"
            "If the answer is not in the context, say \"I don't have that information, but feel free to reach out to {owner} directly.\"\n\n"
            "Context:\n{context}\n\n"
            "Question: {question}\n"
            "Answer:"
        ),
        input_variables=["context", "question"],
        partial_variables={"owner": PORTFOLIO_OWNER}
    )
    return prompt | llm | StrOutputParser()


def load_chain():
    """
    Downloads the FAISS index from S3 and caches it globally.
    On warm requests the cached index is reused, skipping the S3 download.
    """
    global index, embeddings
    if index is not None:
        return

    s3 = boto3.client("s3")
    os.makedirs(FAISS_TMP_DIR, exist_ok=True)

    for file in ["index.faiss", "index.pkl"]:
        s3.download_file(S3_BUCKET, f"{S3_INDEX_KEY}/{file}", f"{FAISS_TMP_DIR}/{file}")

    embeddings = BedrockEmbeddings(
        model_id=EMBEDDING_MODEL_ID,
        client=boto3.client("bedrock-runtime", region_name=BEDROCK_REGION)
    )
    index = FAISS.load_local(FAISS_TMP_DIR, embeddings, allow_dangerous_deserialization=True)

def lambda_handler(event, context):
    """
    Lambda entry point. Parses the question from the request body, loads the index,
    retrieves relevant chunks with content-type filtering, and generates an answer.
    """
    try:
        body = json.loads(event.get("body", "{}"))
        question = body.get("question", "").strip()

        if not question:
            return response(400, {"error": "question is required"})

        load_chain()

        if index is None:
            return response(500, {"error": "Failed to load index"})

        # Determine relevant content types based on query keywords
        relevant_types = get_relevant_content_types(question)

        # Use pre-filtering if specific content types identified, otherwise use standard retrieval
        if relevant_types != set(CONTENT_TYPE_KEYWORDS.keys()):
            docs = similarity_search_with_filter(index, question, relevant_types, k=TOP_K)
        else:
            docs = index.similarity_search(question, k=TOP_K)

        # Format context and generate answer
        context = format_docs(docs)
        llm = ChatBedrock(
            model_id=LLM_MODEL_ID,
            client=boto3.client("bedrock-runtime", region_name=BEDROCK_REGION)
        )
        prompt = PromptTemplate(
            template=(
                "You are an AI assistant representing {owner} on his portfolio website.\n"
                "Answer questions about {owner} in a natural, confident, and professional tone — as if you know him well.\n"
                "Do not say phrases like 'based on the context provided' or 'according to the context'.\n"
                "Just answer directly and naturally.\n"
                "If the answer is not in the context, say \"I don't have that information, but feel free to reach out to {owner} directly.\"\n\n"
                "Context:\n{context}\n\n"
                "Question: {question}\n"
                "Answer:"
            ),
            input_variables=["context", "question"],
            partial_variables={"owner": PORTFOLIO_OWNER}
        )
        chain = prompt | llm | StrOutputParser()
        answer = chain.invoke({"context": context, "question": question})

        return response(200, {"answer": answer})

    except Exception as e:
        print(f"Error: {e}")
        return response(500, {"error": "Something went wrong, please try again."})


def response(status_code: int, body: dict) -> dict:
    """
    Builds a consistent API Gateway response with JSON content type and CORS headers.
    """
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps(body)
    }
