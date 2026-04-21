const projects = [
  {
    title: 'AI Portfolio Website with RAG Chatbot',
    description: 'Personal portfolio with an embedded AI chatbot that answers questions about my profile using Retrieval-Augmented Generation.',
    tags: ['React', 'AWS Lambda', 'FAISS', 'Amazon Bedrock', 'LangChain', 'S3', 'CloudFront'],
    github: 'https://github.com/NikhilMank/Portfolio_Website',
  },
  {
    title: 'Production-Grade Azure RAG Chatbot',
    description: 'Enterprise-style RAG chatbot for GDPR Q&A. Achieved 0.89 RAGAS faithfulness score and improved answer relevance by 23% through A/B testing.',
    tags: ['Azure OpenAI', 'Azure AI Search', 'FastAPI', 'LangChain', 'Docker', 'RAGAS'],
    github: 'https://github.com/BharAI-Lab/rag_azure_fastapi',
  },
  {
    title: 'Smart Receipt Scanner',
    description: 'Serverless web app for scanning receipts, extracting expense data via OCR, and tracking budgets with a personal analytics dashboard.',
    tags: ['AWS Lambda', 'S3', 'DynamoDB', 'Cognito', 'React', 'Python'],
    github: 'https://github.com/NikhilMank/Smart-Receipt-Scanner',
  },
  {
    title: 'Research Paper Scraper & Newsletter Generator',
    description: 'Full-stack automation platform that retrieves research papers, generates multilingual AI summaries, and delivers PDF newsletters.',
    tags: ['Python', 'OpenAI API', 'Springer API', 'Docker', 'Firebase'],
    github: null,
  },
  {
    title: 'Aerial Anomaly Detection System',
    description: 'AI-based out-of-distribution detection system for aerial perception, validated during real drone flight tests at Fraunhofer IVI.',
    tags: ['PyTorch', 'OpenCV', 'Docker', 'Kubernetes', 'MLflow'],
    github: null,
  },
  {
    title: 'Adversarial Robustness of Vision Models',
    description: 'Improved model robustness against FGSM and PGD attacks. FGSM accuracy improved from 30% to 95%, PGD from 0% to 46%.',
    tags: ['PyTorch', 'FGSM', 'PGD', 'Adversarial Training', 'HPC'],
    github: null,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col justify-between hover:border-indigo-500 transition-colors">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{project.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-md border border-indigo-200 dark:border-indigo-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                  View on GitHub →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
