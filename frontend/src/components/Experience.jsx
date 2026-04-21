const experiences = [
  {
    role: 'AI Engineer – Agentic AI, RAG Systems, LLMOps',
    company: 'Independent Projects / Proof of Concepts',
    location: 'Siegen, Germany',
    period: '05/2025 – Present',
    points: [
      'RAG Portfolio Website — Built a portfolio website with a serverless RAG chatbot using AWS (Lambda, S3, API Gateway) and a React frontend.',
      'Smart Receipt Scanner — Serverless web app using AWS (Lambda, S3, DynamoDB, API Gateway, Cognito) with OCR text extraction, multi-user authentication, and budget analytics with expense categorization.',
      'RAG Chatbot — Production-grade Q&A system using Azure OpenAI, Azure AI Search, and FastAPI; achieved 0.89 RAGAS faithfulness and improved answer relevance by 23% via A/B testing. Deployed as a containerized microservice on Azure Container Apps with automated CI/CD.',
      'Web Scraper — Full-stack scraper curating research papers from Springer API, generating multilingual summarized PDF newsletters via ChatGPT API with secure authentication and table of contents.',
    ],
    stack: ['Python', 'LangChain', 'LangGraph', 'FastAPI', 'AWS', 'Azure', 'React', 'Docker', 'GitHub Actions'],
  },
  {
    role: 'Research Assistant – Computer Vision, Anomaly Detection',
    company: 'Fraunhofer Institute for Transport and Infrastructure Systems IVI',
    location: 'Ingolstadt, Germany',
    period: '11/2023 – 04/2025',
    points: [
      'Designed and deployed an AI-based anomaly/OOD detection system for aerial perception using normalizing flow networks for negative feature synthesis.',
      'Validated the module in real-world drone flight tests and generated outlier-exposed data; successfully flagged unseen objects (e.g., dogs) absent in training datasets.',
      'Integrated uncertainty estimation into computer vision pipelines to improve model confidence and reliability.',
      'Built end-to-end ML pipelines covering data processing, training, evaluation, and deployment.',
      'Contributed ML modules used in internal project pitches and funding proposals for UAM research.',
    ],
    stack: ['Python', 'PyTorch', 'OpenCV', 'HuggingFace', 'Docker', 'Kubernetes', 'MLflow', 'Weights & Biases', 'Grafana'],
  },
  {
    role: 'Research Assistant – Data Science',
    company: 'Technische Hochschule Ingolstadt',
    location: 'Ingolstadt, Germany',
    period: '06/2023 – 09/2023',
    points: [
      'Collected and cleaned datasets with various view types (top-down, frontal, oblique) to create a unified aerial vision dataset.',
      'Balanced dataset coverage and ensured annotation quality for training object detection and segmentation models.',
      'Resulted in improved accuracy and generalization of downstream computer vision tasks at Fraunhofer IVI.',
    ],
    stack: ['Python', 'PyTorch', 'NumPy', 'Pandas', 'OpenCV', 'Bash', 'GitLab'],
  },
  {
    role: 'Research Assistant – Computer Vision',
    company: 'Universität Siegen',
    location: 'Siegen, Germany',
    period: '08/2022 – 06/2023',
    points: [
      'Simulated adversarial attacks (FGSM, PGD) on grayscale, RGB, and 3D voxel data.',
      'Improved FGSM robustness from 30% to 95% and PGD robustness from 0% to 46% using adversarial training.',
    ],
    stack: ['Python', 'PyTorch', 'TensorBoard', 'SLURM', 'HPC', 'Git', 'Bash'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">Experience</h2>
        <div className="relative border-l-2 border-indigo-600 dark:border-indigo-400 pl-8 space-y-12">
          {experiences.map((exp, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-10 w-4 h-4 rounded-full bg-indigo-600 dark:bg-indigo-400 border-4 border-white dark:border-gray-950" />
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{exp.role}</h3>
                  <span className="text-sm text-indigo-600 dark:text-indigo-400 mt-1 md:mt-0 shrink-0">{exp.period}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{exp.company} · {exp.location}</p>
                <ul className="space-y-2 mb-4">
                  {exp.points.map((point, j) => (
                    <li key={j} className="text-sm text-gray-600 dark:text-gray-400 flex gap-2">
                      <span className="text-indigo-500 mt-1 shrink-0">▸</span>
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                  {exp.stack.map(tech => (
                    <span key={tech} className="px-2 py-1 text-xs bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-md border border-indigo-200 dark:border-indigo-800">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
