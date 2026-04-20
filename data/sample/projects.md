# Projects

## Portfolio Website with RAG Chatbot
*Personal Project — 2024*

A personal portfolio website with an embedded AI chatbot that answers questions about my profile using Retrieval-Augmented Generation (RAG).

- **Tech Stack:** React, AWS Lambda, FAISS, Amazon Bedrock (Claude 3 Haiku + Titan Embeddings), S3, CloudFront, API Gateway, AWS CDK
- **Highlights:** FAISS index stored in S3 and loaded in-memory on Lambda, fully serverless, cost under $5/month

## LLM-Powered Document Q&A System
*Personal Project — 2024*

An end-to-end document question answering system that lets users upload PDFs and ask questions about them using RAG.

- **Tech Stack:** Python, LangChain, FAISS, OpenAI API, FastAPI, React
- **Highlights:** Recursive text chunking with overlap, hybrid keyword + semantic search, streaming responses
- **GitHub:** github.com/johndoe/doc-qa

## AI Agent for Automated Research Summarization
*Personal Project — 2023*

A multi-agent system that autonomously searches the web, reads articles, and produces structured research summaries on any given topic.

- **Tech Stack:** Python, LangChain Agents, Groq (Llama 3), Tavily Search API, FastAPI
- **Highlights:** Tool-calling agent with memory, structured output using Pydantic, runs entirely on free-tier APIs
- **GitHub:** github.com/johndoe/research-agent

## Fine-Tuned Sentiment Classifier
*Personal Project — 2023*

Fine-tuned a BERT model on a custom dataset for multi-class sentiment analysis on product reviews.

- **Tech Stack:** Python, HuggingFace Transformers, PyTorch, AWS SageMaker
- **Highlights:** Achieved 91% accuracy, deployed as a SageMaker endpoint, full training pipeline with MLflow tracking
- **GitHub:** github.com/johndoe/sentiment-classifier
