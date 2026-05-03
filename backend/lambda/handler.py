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

# --- Globals for warm start caching ---
chain = None

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
}


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
    Downloads the FAISS index from S3, builds the RAG chain, and caches it globally.
    On warm requests the cached chain is reused, skipping the S3 download entirely.
    """
    global chain
    if chain is not None:
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
    retriever = index.as_retriever(search_kwargs={"k": TOP_K})

    retrieval_chain = build_retrieval_chain(retriever)
    parallel_chain = RunnableParallel({"context": retrieval_chain, "question": RunnablePassthrough()})
    generation_chain = build_generation_chain()
    chain = parallel_chain | generation_chain


def _text_response(status_code, text):
    """Builds a plain-text API Gateway response. The frontend reads it as a single-chunk stream."""
    return {
        "statusCode": status_code,
        "headers": {**CORS_HEADERS, "Content-Type": "text/plain; charset=utf-8"},
        "body": text
    }


try:
    import awslambda as _awslambda

    @_awslambda.response_handler
    def lambda_handler(event, response_stream, context):
        method = event.get("requestContext", {}).get("http", {}).get("method", "POST")

        # Handle CORS preflight — Function URL CORS is disabled so we handle it here
        if method == "OPTIONS":
            http_stream = _awslambda.HttpResponseStream.from_stream(
                response_stream, {"statusCode": 200, "headers": CORS_HEADERS}
            )
            http_stream.write(b"")
            return

        try:
            body = json.loads(event.get("body", "{}"))
            question = body.get("question", "").strip()

            if not question:
                http_stream = _awslambda.HttpResponseStream.from_stream(
                    response_stream, {"statusCode": 400, "headers": CORS_HEADERS}
                )
                http_stream.write(b"question is required")
                return

            load_chain()
            http_stream = _awslambda.HttpResponseStream.from_stream(
                response_stream,
                {"statusCode": 200, "headers": {**CORS_HEADERS, "Content-Type": "text/plain; charset=utf-8"}}
            )
            for chunk in chain.stream(question):
                if chunk:
                    http_stream.write(chunk.encode("utf-8"))

        except Exception as e:
            print(f"Error: {e}")
            try:
                response_stream.write(b"Something went wrong, please try again.")
            except Exception:
                pass

except ImportError:
    # Fallback for API Gateway invocation (no streaming support).
    def lambda_handler(event, context):
        try:
            body = json.loads(event.get("body", "{}"))
            question = body.get("question", "").strip()

            if not question:
                return _text_response(400, "question is required")

            load_chain()
            answer = chain.invoke(question)
            return _text_response(200, answer)

        except Exception as e:
            print(f"Error: {e}")
            return _text_response(500, "Something went wrong, please try again.")
