# projects.md

# Projects

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