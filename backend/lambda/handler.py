import os
import json
import boto3
from langchain_aws import BedrockEmbeddings, ChatBedrock
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

# --- Config (from Lambda environment variables) ---
S3_BUCKET = os.environ["S3_BUCKET"]
S3_INDEX_KEY = os.environ["S3_INDEX_KEY"]
EMBEDDING_MODEL_ID = os.environ["EMBEDDING_MODEL_ID"]
LLM_MODEL_ID = os.environ["LLM_MODEL_ID"]
AWS_REGION = os.environ["AWS_REGION"]
PORTFOLIO_OWNER = os.environ["PORTFOLIO_OWNER"]
TOP_K = int(os.environ.get("TOP_K", 5))

FAISS_TMP_DIR = "/tmp/faiss_index"

# --- Globals for warm start caching ---
retriever = None


def load_index():
    """
    Downloads the FAISS index files from S3 and loads them into memory as a retriever.
    Uses a global variable to cache the retriever so that subsequent warm requests
    skip the S3 download and index loading entirely.
    """
    global retriever
    if retriever is not None:
        return

    s3 = boto3.client("s3")
    os.makedirs(FAISS_TMP_DIR, exist_ok=True)

    for file in ["index.faiss", "index.pkl"]:
        s3.download_file(S3_BUCKET, f"{S3_INDEX_KEY}/{file}", f"{FAISS_TMP_DIR}/{file}")

    embeddings = BedrockEmbeddings(
        model_id=EMBEDDING_MODEL_ID,
        client=boto3.client("bedrock-runtime", region_name=AWS_REGION)
    )
    index = FAISS.load_local(FAISS_TMP_DIR, embeddings, allow_dangerous_deserialization=True)
    retriever = index.as_retriever(search_kwargs={"k": TOP_K})


def build_chain():
    """
    Builds a RetrievalQA chain with a Claude LLM and a PromptTemplate.
    The prompt uses partial_variables to inject the portfolio owner's name statically,
    while context and question are injected dynamically by RetrievalQA at runtime.
    """
    llm = ChatBedrock(
        model_id=LLM_MODEL_ID,
        client=boto3.client("bedrock-runtime", region_name=AWS_REGION)
    )
    prompt = PromptTemplate(
        template=(
            "You are an AI assistant on {owner}'s portfolio website.\n"
            "Answer the question based only on the context provided below.\n"
            "If the answer is not in the context, say \"I don't have that information, "
            "but feel free to reach out to {owner} directly.\"\n"
            "Keep your answer concise, professional, and friendly.\n\n"
            "Context:\n{context}\n\n"
            "Question: {question}\n"
            "Answer:"
        ),
        input_variables=["context", "question"],
        partial_variables={"owner": PORTFOLIO_OWNER}
    )
    return RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        chain_type_kwargs={"prompt": prompt}
    )


def lambda_handler(event, context):
    """
    Lambda entry point. Parses the question from the request body, loads the FAISS
    index on cold start, runs the RetrievalQA chain, and returns the answer.
    """
    try:
        body = json.loads(event.get("body", "{}"))
        question = body.get("question", "").strip()

        if not question:
            return response(400, {"error": "question is required"})

        load_index()
        chain = build_chain()
        # RetrievalQA automatically embeds the question, fetches top-k chunks from FAISS
        # as context, and injects both context and question into the PromptTemplate
        answer = chain.invoke({"query": question})

        return response(200, {"answer": answer["result"]})

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
