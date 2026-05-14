# projects.md

# Projects

## Audio Transcriber MCP Server

Built a local-first MCP (Model Context Protocol) server for high-performance audio transcription and speaker-aware speech processing using faster-whisper and pyannote.audio.

The system enables AI assistants and MCP-compatible clients to transcribe audio files locally without sending data to external cloud services, improving privacy, offline usability, and performance control.

### Problem Solved

Most speech transcription services rely on external APIs, requiring users to upload potentially sensitive audio data to cloud platforms.

There is also limited interoperability between transcription systems and modern AI agent tooling ecosystems.

### Solution

Developed a local MCP-compatible transcription server that exposes speech-processing capabilities through standardized MCP tool interfaces.

The system supports:
- plain transcription
- timestamped transcription
- speaker diarization
- batch folder transcription

while running entirely on the user's own machine.

### Features

- Local-first audio transcription
- Speaker diarization with pyannote.audio
- Timestamped transcription output
- Batch transcription for folders
- Multiple audio format support
- Lazy model loading for memory optimization
- GPU acceleration support via CUDA
- Apple Silicon support via MPS
- Offline diarization model support
- MCP-compatible AI tooling integration

### Architecture & Engineering Details

- Implemented lazy initialization for Whisper and diarization pipelines to reduce startup overhead and memory usage
- Added automatic hardware-aware execution using CPU, CUDA, or Apple MPS backends
- Used `faster-whisper` for optimized inference performance
- Integrated FFmpeg-based preprocessing for consistent audio loading and resampling
- Built speaker assignment logic by aligning transcription timestamps with pyannote diarization segments
- Added configurable model selection through environment variables
- Supported fully offline execution after one-time model download

### Technologies

- Python
- FastMCP
- faster-whisper
- pyannote.audio
- FFmpeg
- PyTorch
- NumPy
- CUDA
- Apple MPS
- Hugging Face models

### Skills Demonstrated

- AI infrastructure engineering
- Local AI systems
- Speech AI pipelines
- MCP server development
- GPU-aware optimization
- Audio preprocessing
- Multimodal AI tooling
- Backend systems engineering
- Offline-first AI architecture

---

## Expense Tracker MCP Server

Designed and deployed a remotely hosted MCP (Model Context Protocol) expense tracking server that enables AI assistants to manage, analyze, and summarize financial data through structured tool calling and natural language workflows.

The server is deployed using FastMCP’s remote hosting platform directly from GitHub, demonstrating cloud-based AI tooling deployment and production-style MCP infrastructure engineering.

### Problem Solved

Personal finance tracking tools are often disconnected from AI workflows and require users to manually navigate applications, spreadsheets, or dashboards.

Modern AI agents also require secure and structured interfaces for interacting with financial data while maintaining user isolation and validation controls.

### Solution

Built a remotely deployed MCP server that exposes expense management, budgeting, analytics, and financial insight capabilities through reusable MCP tools.

The system allows AI assistants and MCP-compatible clients to:
- add and manage expenses
- create category budgets
- analyze spending trends
- generate financial summaries
- produce AI-generated monthly reports

through structured natural language interactions.

### Features

- Remote MCP server deployment
- Expense CRUD operations
- Budget tracking and monitoring
- Spending trend analytics
- Category-based expense management
- Recurring expense support
- Monthly financial insights
- AI-generated reporting prompts
- User-isolated financial records
- Structured JSON resources
- HTTP-based MCP transport

### Architecture & Engineering Details

- Built asynchronous MCP tools using `asyncio` and `aiosqlite` for efficient non-blocking database operations
- Designed a multi-user architecture using access-token-based user isolation
- Implemented SQLite-backed persistence with transactional rollback safety
- Added validation layers for dates, budgets, and transaction amounts
- Created analytical SQL aggregation pipelines for:
  - budget tracking
  - category summaries
  - spending trends
  - transaction statistics
- Designed reusable MCP prompts that orchestrate multiple tool calls for AI-generated financial reporting
- Added hierarchical category management using parent-child category relationships
- Implemented MCP resources for structured category discovery
- Added conflict-safe budget upsert logic using SQL `ON CONFLICT`
- Exposed the MCP server over HTTP for remote AI agent integration

### AI Workflow Capabilities

The MCP server supports higher-level AI workflows including:
- automated monthly financial reports
- budget health analysis
- spending trend evaluation
- personalized expense reduction recommendations
- category risk assessment

### Technologies

- Python
- FastMCP
- MCP (Model Context Protocol)
- SQLite
- aiosqlite
- asyncio
- JSON resource management
- HTTP transport APIs

### Skills Demonstrated

- AI agent infrastructure
- Remote MCP deployment
- Async backend engineering
- Financial analytics systems
- Database schema design
- Multi-user backend architecture
- AI tool orchestration
- Structured prompt engineering
- Backend API development
- Production-style Python systems

---

## AI Portfolio Website with RAG Chatbot

I am building an interactive portfolio website that includes a Retrieval-Augmented Generation (RAG) chatbot. The goal of this project is to replace the traditional static resume experience with a conversational interface where recruiters, hiring managers, or collaborators can ask questions about my background, projects, and technical skills.

Instead of reading multiple sections manually, visitors can ask questions such as:

- What cloud experience does Nikhil have?
- Has he worked with Kubernetes?
- What AI systems has he built?
- What makes him suitable for ML or DevOps roles?
- What projects demonstrate production skills?

### Architecture

The system is designed using a modern cloud-native architecture, AWS to be precise:

- React frontend for responsive user experience
- Amazon S3 for static website hosting
- Amazon CloudFront as CDN
- API Gateway for secure API exposure
- AWS Lambda for serverless backend logic
- FAISS as vector database and for vector similarity search
- Amazon Bedrock Titan for embeddings
- Claude via Amazon Bedrock for final response generation

### Key Engineering Areas

- Prompt engineering for professional recruiter-friendly answers
- Resume and project knowledge base ingestion
- Vector search optimization
- Low-cost serverless deployment
- Scalable backend design
- Modern portfolio UX

### Why This Project Matters

This project demonstrates frontend development, backend APIs, cloud architecture, GenAI engineering, and production thinking in one system.

---

## Smart Receipt Scanner

Built a serverless full-stack web application that helps users scan receipts, automatically extract purchase data (using OCR and regular expressions), categorize expenses, and analyze spending behavior.

The project was designed as a practical real-world finance tool and demonstrates cloud-native application development using AWS services.

### Problem Solved

Manual expense tracking is time-consuming, error-prone, and boring. Users often lose receipts or do not analyze spending habits because it is time-taking.

### Solution

Users upload a receipt image and the system automatically extracts relevant information such as:

- Merchant name
- Date
- Total amount
- Expense category

### Features

- OCR text extraction from uploaded receipt images
- Information extraction using Regular Expressions
- Secure user authentication
- Multi-user account support
- Personal dashboard for expense analytics
- Budget tracking by category
- Historical spending trends
- Serverless backend architecture

### Cloud Architecture

- AWS Lambda for processing logic, API backend
- AWS API Gateway for API endpoints
- Amazon S3 for file storage, static website hosting
- DynamoDB for transaction records, user database
- Cognito for authentication and user management

### Skills Demonstrated

- Event-driven architecture
- Serverless backend development
- Cloud security basics
- Full-stack product development
- Data analytics dashboards
- Cost Optimal and high performance architecture

---

## Production-Grade Azure RAG Chatbot

Designed and developed an enterprise-style Retrieval-Augmented Generation chatbot focused on accurate question answering over private knowledge sources.

This project was built to demonstrate modern LLMOps and production RAG system design.

### Core Objective

Enable users to ask natural language questions while grounding responses in trusted indexed documents rather than relying only on base model knowledge.

### Architecture

- Azure OpenAI for generation
- Azure AI Search for document retrieval
- FastAPI backend service
- Containerized deployment
- Automated CI/CD pipelines
- Frontend with JavaScript

### Key Achievements

- Achieved **0.89 faithfulness score using RAGAS evaluation**
- Improved answer relevance by **23% through A/B testing**
- Reduced hallucination risk through retrieval grounding
- Production-ready API deployment

### Engineering Focus Areas

- Chunking strategy design
- Embedding pipeline optimization
- Prompt tuning for grounded responses
- Retrieval ranking improvements
- Response quality evaluation
- CI/CD automation

### Skills Demonstrated

- RAG architecture design
- LLM evaluation
- Cloud deployment
- API engineering
- Experiment-driven optimization
- Azure Cloud Services usage

---

## Research Paper Scraper & Multilingual Newsletter Generator

Built a full-stack automation platform that collects research papers, summarizes them, translates content, and generates polished newsletters in PDF format.

The project was created to improve research discovery and reduce the time required to review large numbers of papers.

### Problem Solved

Researchers often spend too much time manually searching for new publications and reading long technical papers.

### Solution

The system automatically:

1. Retrieves papers from Springer APIs  
2. Extracts metadata  
3. Generates concise summaries using LLM APIs  
4. Translates summaries into multiple languages  
5. Builds downloadable PDF newsletters and sends it as an email

### Features

- Automated research paper discovery
- AI summarization
- Multilingual support
- PDF export with table of contents
- User authentication
- Structured reading workflow
- Customizable newsletter frequency settings
- User profile management for topic preferences
- Multiple newsletter subscription support
- Topic selection and modification capabilities
- Customizable newsletter content configuration
- Personalized content filtering options 

### Technologies

- Python backend
- ChatGPT API integration
- PDF generation libraries
- Authentication layer
- Data automation scripts

### Skills Demonstrated

- API integrations
- Workflow automation
- Prompt engineering
- Document generation
- Full-stack engineering

---

## Aerial Anomaly Detection System

Designed and deployed an AI-based anomaly detection system for aerial perception use cases during my time at Fraunhofer IVI.

The system was intended to improve reliability in real-world autonomous or semi-autonomous scenarios by detecting objects or patterns not present in training data.

The OoD classifier in the module developed by me can be trained along any model with small adjustments and this will work like an evaluator for that model output and flags OoD/Anamolies in the input of the model.

This Module conatains a generator network (Flow Network) that learns the data distribution of the feature space generated by the model from inlier data, and later generates anamolous/OoD samples by sampling from the low-probabilty area of the learned gaussian distribution. This make sure that the generated samples are close to the inlier data so that the OoD classifier can learn the boundary of the inlier data, and the data that is not within the boundary will be classified as OoD.

### Problem Solved

Traditional supervised models may fail when encountering unknown objects or rare environmental situations.

### Solution

Built an anomaly detection pipeline capable of flagging unfamiliar observations during live aerial perception tasks.

### Real-World Validation

The system was tested in drone flight scenarios and successfully identified unseen objects such as animals, food that were not included in training datasets.

### Additional Enhancements

- Integrated uncertainty estimation
- Improved model confidence awareness
- Increased reliability for decision support
- Real-world deployment mindset

### Skills Demonstrated

- Research
- Translating research to application
- Computer vision
- Out-of-distribution detection
- Real-world model testing
- Safety-aware AI systems
- Applied ML engineering

---

## End-to-End ML Pipelines for Aerial Systems

At Fraunhofer IVI, I also built and maintained production-style machine learning pipelines supporting perception projects.

### Pipeline Stages Included

- Raw data ingestion
- Cleaning and preprocessing
- Training workflows
- Model evaluation
- Experiment tracking
- Packaging models
- Deployment workflows

### Infrastructure Used

- Python
- Docker
- Kubernetes
- Bash scripting
- CI/CD workflows

### Skills Demonstrated

- MLOps practices
- Reproducibility
- Containerization
- Deployment automation
- Scalable AI workflows

---

## Unified Aerial Vision Dataset Engineering

At Technische Hochschule Ingolstadt, I worked on building a cleaner and more effective dataset for downstream computer vision tasks.

### Work Performed

- Combined datasets from multiple aerial viewpoints:
  - top-down
  - frontal
  - oblique
- Cleaned annotations
- Balanced classes
- Improved dataset consistency

### Impact

Helped improve downstream model generalization and detection performance.

### Skills Demonstrated

- Data engineering
- Dataset curation
- Annotation quality control
- ML data pipeline preparation

---

## Adversarial Robustness of Vision Models

At Universität Siegen, I worked on understanding and improving the robustness of computer vision models under adversarial attacks.

### Scope

Evaluated attacks on:

- Grayscale data
- RGB images
- 3D voxel data

### Techniques Used

- FGSM attacks
- PGD attacks
- Adversarial training methods

### Results

- FGSM robustness improved to **95%**
- PGD robustness improved to **46%**

### Skills Demonstrated

- Deep learning research
- Model robustness
- Security-aware AI
- Experimental evaluation
- Scientific problem solving