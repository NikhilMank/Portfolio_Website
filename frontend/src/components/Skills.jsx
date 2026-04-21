const skillGroups = [
  {
    category: 'AI / ML',
    skills: ['PyTorch', 'TensorFlow', 'HuggingFace', 'Scikit-learn', 'OpenCV', 'MLflow', 'Weights & Biases'],
  },
  {
    category: 'LLM / GenAI',
    skills: ['LangChain', 'LangGraph', 'RAG', 'Prompt Engineering', 'LLM Fine-tuning', 'Amazon Bedrock', 'FastMCP'],
  },
  {
    category: 'Vector Stores',
    skills: ['FAISS', 'ChromaDB', 'Azure AI Search', 'Neo4j'],
  },
  {
    category: 'Cloud / DevOps',
    skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'CI/CD'],
  },
  {
    category: 'Backend',
    skills: ['Python', 'FastAPI', 'REST APIs', 'Microservices', 'Serverless'],
  },
  {
    category: 'Frontend',
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Streamlit'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map(group => (
            <div key={group.category} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
