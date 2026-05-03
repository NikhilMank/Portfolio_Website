# Portfolio with RAG Chatbot

A modern, serverless portfolio website featuring an AI-powered Retrieval-Augmented Generation (RAG) chatbot that answers questions about a person's professional background using his personal data.

## Description

This project showcases a full-stack portfolio application combining a responsive React frontend with a cloud-native AWS backend. The highlight is an intelligent chatbot that uses RAG technology to provide personalized, context-aware responses about the portfolio owner's experience, skills, and projects.

## Features

### Portfolio Sections
- **Hero**: Professional introduction and overview
- **Skills**: Technical competencies across multiple domains
- **Experience**: Work history and professional achievements
- **Internship**: Internship experiences and learnings
- **Education**: Academic background and qualifications
- **Certifications**: Professional certifications
- **Projects**: Portfolio of completed work
- **Contact**: Contact information and links

### AI Chatbot
- **RAG-Powered Q&A**: Answers questions based on indexed personal data
- **Typewriter Animation**: Answer is revealed character-by-character for a smooth, streaming-like UX
- **Contextual Responses**: Retrieves relevant information from resume, bio, project details, experience, and skills; including soft skills (Not shown in Frontend)
- **Professional Persona**: Responds as if personally familiar with the portfolio owner

## Tech Stack

### Frontend
- **React 19**: Modern UI framework
- **Vite 8**: Fast build tool and dev server
- **Tailwind CSS 4**: Utility-first styling framework

### Backend
- **Python 3**: Serverless runtime
- **AWS Lambda**: Serverless compute platform
- **Lambda Function URL**: Direct HTTP endpoint (RESPONSE_STREAM mode, replaces API Gateway)
- **Amazon Bedrock**: Managed AI models (Titan Embeddings, Amazon Nova)
- **LangChain**: RAG orchestration framework
- **FAISS**: Vector similarity search
- **AWS S3**: Index storage
- **AWS CloudFront**: CDN

### Data Processing
- **Unstructured**: Markdown document parsing
- **NumPy**: Numerical computations

## Architecture Overview

### RAG System Flow

1. **Indexing Phase**:
   - Markdown files from `data/MyData/` are loaded and parsed
   - Documents are split into semantic chunks (500 chars, 100 overlap)
   - Text chunks are converted to embeddings using Amazon Titan
   - FAISS index is built and stored in AWS S3

2. **Query Processing**:
   - User question → Lambda function
   - Question embedded and searched against FAISS index
   - Top-K relevant chunks retrieved (default: 5)
   - Context + question fed to Claude 3 Haiku for generation
   - Personalized response returned

### Project Structure
```
Portfolio_with_RAG/
├── frontend/               # React application
│   ├── src/components/     # Portfolio section components
│   ├── src/App.jsx         # Main app with routing
│   └── package.json        # Frontend dependencies
├── backend/lambda/         # AWS Lambda function
│   ├── handler.py          # RAG logic and Lambda handler
│   └── requirements.txt    # Python dependencies for handler
├── backend/scripts/        # Utility scripts
│   ├── build_index.py      # FAISS index creation
│   ├── test_rag.py         # Test RAG locally
├── backend/test_server.py  # Local mock server for frontend testing (port 8000)
├── docs/                   # Session notes and implementation docs
├── data/MyData/            # Personal portfolio content (Markdown)
├── requirements.txt        # Development dependencies
└── .env                    # Environment Variables
```

## Installation

### Prerequisites
- Node.js 18+ (for frontend development)
- Python 3.8+ (for backend and scripts)
- AWS CLI configured with appropriate permissions
- AWS account with access to Lambda, S3, Bedrock, API Gateway

### Frontend Setup
```bash
cd frontend
npm install
```

### Backend Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# For Lambda deployment, use vendored dependencies
cd backend/lambda
pip install -r requirements.txt -t package/
```

### Environment Configuration
Create a `.env` file based on `.env.example`:
```env
# AWS Configuration (Lambda environment variables)
S3_BUCKET=your-s3-bucket-name
S3_INDEX_KEY=faiss/index
EMBEDDING_MODEL_ID=amazon.titan-embed-text-v2:0
LLM_MODEL_ID=amazon.nova-lite-v1:0
BEDROCK_REGION=eu-central-1
PORTFOLIO_OWNER=Your Name

# Frontend — set to your Lambda Function URL
VITE_API_URL=https://your-function-id.lambda-url.region.on.aws/
```

For local frontend development, create `frontend/.env.local` (gitignored) to override `VITE_API_URL`:
```env
VITE_API_URL=http://localhost:8000
```
Then run `python backend/test_server.py` to start the local mock server.

## Usage

### Local Development

#### Frontend
```bash
cd frontend
npm run dev          # Start dev server with HMR
npm run build        # Build for production
npm run preview      # Preview production build
```

#### Backend Testing
```bash
# Build FAISS index from local data
python scripts/build_index.py

# Test RAG system locally
python scripts/test_rag.py
```

### Deployment

#### Automatic (CI/CD via GitHub Actions)

Three separate workflows handle deployments automatically on push to `main`:

| Workflow | Trigger Path | Action |
|---|---|---|
| `deploy-frontend.yml` | `frontend/**` | Builds React app, syncs to S3, invalidates CloudFront cache |
| `deploy-backend.yml` | `backend/lambda/**` | Packages Lambda, uploads zip to S3, updates Lambda function |
| `build-index.yml` | `data/MyData/**` | Rebuilds FAISS index from Markdown files, uploads to S3 |

Required GitHub secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `FRONTEND_BUCKET_NAME`, `BACKEND_BUCKET_NAME`, `LAMBDA_FUNCTION_NAME`, `CLOUDFRONT_DISTRIBUTION_ID`, `VITE_API_URL`, `DATA_FOLDER`, `S3_INDEX_KEY`, `EMBEDDING_MODEL_ID`, `CHUNK_SIZE`, `CHUNK_OVERLAP`.

#### Manual

1. **Build and Upload Index**:
   ```bash
   cd backend/scripts
   python build_index.py
   ```

2. **Deploy Lambda Function**:
   ```bash
   cd backend/lambda
   pip install -r requirements.txt -t package/
   cp handler.py package/
   cd package && zip -r ../lambda_package.zip .
   aws s3 cp ../lambda_package.zip s3://your-bucket/lambda/lambda_package.zip
   aws lambda update-function-code --function-name your-function --s3-bucket your-bucket --s3-key lambda/lambda_package.zip
   ```

3. **Deploy Frontend**:
   ```bash
   cd frontend
   npm run build
   aws s3 sync dist/ s3://your-bucket --delete
   aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
   ```

## API Reference

### Chat Endpoint
**POST** `/` — Lambda Function URL

Request body (sent as `Content-Type: text/plain` to avoid CORS preflight):
```json
{
  "question": "What are your main technical skills?"
}
```

Response: a JSON-encoded plain string (parse with `JSON.parse` on the frontend):
```
"Nikhil's main technical skills include Python, AWS, and machine learning..."
```

## 👨💻 Author
Developed by **[Nikhil Mankali](https://d1t6fdfo6c7b31.cloudfront.net)**