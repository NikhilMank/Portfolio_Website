import os
import time
import boto3
from dotenv import load_dotenv
from langchain_aws import BedrockEmbeddings, ChatBedrock
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableParallel

load_dotenv()

S3_BUCKET = os.getenv("S3_BUCKET")
S3_INDEX_KEY = os.getenv("S3_INDEX_KEY")
EMBEDDING_MODEL_ID = os.getenv("EMBEDDING_MODEL_ID")
LLM_MODEL_ID = os.getenv("LLM_MODEL_ID")
AWS_REGION = os.getenv("BEDROCK_REGION")
PORTFOLIO_OWNER = os.getenv("PORTFOLIO_OWNER")
TOP_K = int(os.getenv("TOP_K", 5))

FAISS_TMP_DIR = "/tmp/faiss_index"

TEST_QUESTIONS = [
    f"Who is {PORTFOLIO_OWNER}?",
    f"What is {PORTFOLIO_OWNER}'s experience with RAG systems?",
    f"What cloud platforms has {PORTFOLIO_OWNER} worked with?",
    f"What is {PORTFOLIO_OWNER}'s educational background?",
    f"What programming languages does {PORTFOLIO_OWNER} know?",
]


def load_index():
    s3 = boto3.client("s3")
    os.makedirs(FAISS_TMP_DIR, exist_ok=True)

    for file in ["index.faiss", "index.pkl"]:
        s3.download_file(S3_BUCKET, f"{S3_INDEX_KEY}/{file}", f"{FAISS_TMP_DIR}/{file}")

    embeddings = BedrockEmbeddings(
        model_id=EMBEDDING_MODEL_ID,
        client=boto3.client("bedrock-runtime", region_name=AWS_REGION)
    )
    index = FAISS.load_local(FAISS_TMP_DIR, embeddings, allow_dangerous_deserialization=True)
    return index.as_retriever(search_kwargs={"k": TOP_K})


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
        client=boto3.client("bedrock-runtime", region_name=AWS_REGION)
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


def build_chain(retriever):
    """Combines retrieval and generation chains into a single RAG chain."""
    retrieval_chain = build_retrieval_chain(retriever)
    parallel_chain = RunnableParallel({"context": retrieval_chain, "question": RunnablePassthrough()})
    generation_chain = build_generation_chain()
    return parallel_chain | generation_chain


def main():
    print("Loading FAISS index from S3...")
    retriever = load_index()
    print("Index loaded\n")

    chain = build_chain(retriever)

    for question in TEST_QUESTIONS:
        print(f"Q: {question}")
        try:
            answer = chain.invoke(question)
            print(f"A: {answer}")
        except Exception as e:
            print(f"Error: {e}")
        print("-" * 60)
        time.sleep(5)


if __name__ == "__main__":
    main()
