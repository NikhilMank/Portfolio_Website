# Work Experience

## AI Engineer – Agentic AI, RAG Systems, LLMOps  
**Independent Projects / Proof of Concepts**  
05/2025 – Present

I have been building production-oriented AI applications focused on LLM systems, retrieval pipelines, cloud-native deployments, and automation. These projects are designed to demonstrate practical engineering capability across AI, backend, and cloud infrastructure.

### Travel-Agent — AI Trip Planner

An AI-powered travel agent that plans complete trips through natural conversation. The agent gathers requirements step-by-step, then orchestrates parallel web-search workers to build a real-time itinerary.

#### Features
- Natural-language conversation that asks one question at a time
- Automatic date clarification and traveler-count inference
- Parallel research workers with exponential back-off retry handling
- Real-time data via Tavily (primary) and DuckDuckGo (fallback)
- In-memory checkpointer keyed by session ID for state persistence without a database
- Full-stack UI built with Streamlit (frontend) and FastAPI (backend)

#### Architecture
- Parent graph using LangGraph connecting Detail Gathering → Orchestrator → Reducer
- Detail Gathering subgraph with React-style LLM agent and readiness guard
- Parallel worker execution using ThreadPoolExecutor
- Primary search via Tavily, fallback to DuckDuckGo, final fallback to LLM knowledge

#### Tech Stack Used
- Python
- LangGraph
- LangChain
- Amazon Bedrock (Claude Haiku)
- FastAPI
- Streamlit
- Tavily API
- DuckDuckGo

### Audio Transcriber MCP Server

Built a local-first MCP (Model Context Protocol) server for high-performance audio transcription and speaker-aware speech processing using faster-whisper and pyannote.audio. The system enables AI assistants and MCP-compatible clients to transcribe audio files locally without sending data to external cloud services, improving privacy, offline usability, and performance control.

#### Features
- Local-first audio transcription
- Speaker diarization with pyannote.audio
- Timestamped transcription output
- Batch transcription for folders
- Multiple audio format support (via FFmpeg)
- Lazy model loading for memory optimization
- GPU acceleration via CUDA and Apple MPS
- Offline diarization model support
- MCP-compatible AI tooling integration

#### Tech Stack Used
- Python
- FastMCP
- faster-whisper
- pyannote.audio
- FFmpeg
- PyTorch
- NumPy
- CUDA / Apple MPS

### Expense Tracker MCP Server

Designed and deployed a remotely hosted MCP (Model Context Protocol) expense tracking server that enables AI assistants to manage, analyze, and summarize financial data through structured tool calling and natural language workflows. The server is deployed using FastMCP's remote hosting platform, demonstrating cloud-based AI tooling deployment.

#### Features
- Remote MCP server deployment
- Expense CRUD operations
- Budget tracking and monitoring
- Spending trend analytics
- Category-based expense management
- Recurring expense support
- Monthly financial insights with AI-generated reports
- Multi-user architecture with access-token isolation

#### Tech Stack Used
- Python
- FastMCP
- SQLite
- aiosqlite
- asyncio

### AI Portfolio Website with RAG Chatbot

Built an interactive portfolio website that includes a Retrieval-Augmented Generation (RAG) chatbot. Replaces the traditional static resume experience with a conversational interface where recruiters and hiring managers can ask questions about my background, projects, and technical skills.

#### Architecture
- React frontend for responsive user experience
- Amazon S3 for static website hosting
- Amazon CloudFront as CDN
- API Gateway for secure API exposure
- AWS Lambda for serverless backend logic
- FAISS as vector database for similarity search
- Amazon Bedrock Titan for embeddings
- Claude via Amazon Bedrock for response generation

#### Tech Stack Used
- Python
- LangChain
- React
- AWS Lambda
- S3
- CloudFront
- API Gateway
- FAISS
- Amazon Bedrock

### Smart Receipt Scanner

Built a serverless receipt scanning web application using AWS services.

#### Features

- OCR-based text extraction from receipts
- Multi-user authentication
- Expense categorization
- Budget analytics dashboard
- React frontend with cloud backend

#### AWS Services Used

- Lambda
- S3
- DynamoDB
- Cognito
- API Gateway
- ECR

#### Tech Stack Used
- Python
- PyTorch
- React
- AWS Cloud Services
- JavaScript
- Docker
- HTML
- CSS
- GitHub

### GDPR RAG Chatbot

Developed a production-grade Retrieval-Augmented Generation question-answering system that answers users' questions regarding GDPR Guidelines.

#### Highlights

- Built with Azure OpenAI, Azure AI Search, and FastAPI
- Achieved **0.89 faithfulness score using RAGAS**
- Improved answer relevance by **23% through A/B testing**
- Containerized microservice deployment
- Automated CI/CD pipelines
- API-ready architecture

#### Tech Stack Used
- Python
- Azure AI Foundry
- Azure OpenAI
- Azure AI Search
- FastAPI
- Docker
- LangChain
- RAGAS
- Giskard
- React
- JavaScript
- HTML
- CSS
- GitHub
- GitHub Actions

### Research Paper Web Scraper

Created a full-stack system where users can create their accounts, mention their research interest and receive periodic newsletters with summaries of the latest research publications in their field of interest. This PDF contains the summary in both English and preferred language of the user. The user can mention the frequency of the newsletters, top-k articles to be included in a newsletter.

#### Features

- Springer API integration
- OpenAI API integration
- Automated paper retrieval
- Summaries using OpenAI API
- Multilingual summaries using translate python library
- PDF newsletter generation using python pypdf library
- Table of contents
- Secure authentication

#### Techstack Used
- Python
- OpenAI API
- Springer API
- Firebase
- Docker
- GitHub
- GitHub Actions


### Core Technologies

- Python
- PyTorch
- LangChain
- LangGraph
- FastAPI
- FastMCP
- Docker
- Amazon Bedrock
- AWS
- Azure
- React
- GitHub
- GitHub Actions

---

## Research Assistant – Computer Vision, Anomaly Detection  
**Fraunhofer Institute for Transport and Infrastructure Systems IVI**  
Ingolstadt, Germany  
11/2023 – 04/2025

Worked on applied AI systems for aerial perception and real-world deployment scenarios. Performed  independent research to develop methods to improve the reliability of the AI models deployed in the UAVs.

### Key Contributions

- Designed and deployed an AI-based Anomaly/Out-of-Distribution detection system for aerial perception.
- Enabled reliable decision-making in real-world environments.
- Validated the system during drone flight tests, and generated anomalous data (using OpenCV).
- Successfully detected unseen objects such as animals, food that were absent in training data.
- Integrated uncertainty estimation into the computer vision pipelines.
- Improved robustness, reliability, and model confidence.
- Built end-to-end ML pipelines including data processing, training, evaluation, and deployment.
- Used Docker and Kubernetes for scalable deployment and maintenance.
- Contributed ML tools and models used in internal project pitches and funding proposals for UAM research.

### Tech Stack

- Python
- PyTorch
- Pandas
- NumPy
- OpenCV
- Matplotlib
- Seaborn
- Tensorboard
- MLFlow
- Weights & Biases
- HuggingFace
- Docker
- Kubernetes
- Grafana
- Bash
- Git
- GitLab
- CI/CD

---

## Research Assistant – Data Science  
**Technische Hochschule Ingolstadt**  
Ingolstadt, Germany  
06/2023 – 09/2023

Worked on dataset engineering and preparation for aerial computer vision systems.

### Key Contributions

- Collected and cleaned multiple aerial datasets.
- Worked with top-down, frontal, and oblique view types.
- Built a unified aerial vision dataset by combining around 15 opensource datasets.
- Improved annotation quality.
- Balanced class coverage for training.
- Increased downstream object detection and segmentation performance.

### Tech Stack

- Python
- PyTorch
- NumPy
- Pandas
- OpenCV
- Bash
- GitLab
- CI/CD

---

## Research Assistant – Computer Vision  
**Universität Siegen**  
Siegen, Germany  
08/2022 – 06/2023

Worked on adversarial robustness of computer vision models.

### Key Contributions

- Simulated adversarial attacks on grayscale, RGB, and 3D voxel data.
- Improved model robustness using adversarial training.
- Increased FGSM accuracy to **95%** from **30%**
- Increased PGD robustness to **46%** from **0%**

### Tech Stack

- Python
- PyTorch
- Tensorboard
- SLURM
- Git
- Bash
- HPC
- Distributed Computing

---

## Computer Vision Intern  
**Fraunhofer Institute for Transport and Infrastructure Systems IVI**  
Ingolstadt, Germany  
06/2023 – 09/2023

Supported dataset engineering, deployment workflows, and onboarding documentation.

### Key Contributions

- Performed Independent research on Uncertainty Estimation, Out-of-Distribution/Anamoly Detection methodologies.
- Harmonized **15+ aerial datasets** for model training.
- Standardized annotation formats and class structures.
- Built scripts for label conversion.
- Improved compatibility with detection and segmentation frameworks.
- Created internal onboarding documentation for:
  - Docker image creation
  - Kubernetes deployment with kubectl
  - Octane simulation workflows
- Supported integration of AI modules into existing systems.

### Tech Stack

- Python
- PyTorch
- Docker
- Kubernetes
- Git
- Bash
- Object Detection
- Segmentation
- Anamoly Detection
- Out-of-Distribution Detection