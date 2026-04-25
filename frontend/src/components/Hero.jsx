import { useState } from 'react'

export default function Hero() {
  const [showDropdown, setShowDropdown] = useState(false)

  const resumes = [
    { label: '🇬🇧 English', file: '/data/Nikhil Mankali-Resume.pdf' },
    { label: '🇩🇪 German', file: '/data/Nikhil Mankali-Lebenslauf.pdf' },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="max-w-3xl text-center">
        <p className="text-indigo-500 dark:text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
          Welcome to my portfolio
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Nikhil Mankali
        </h1>
        <h2 className="text-xl sm:text-2xl text-indigo-600 dark:text-indigo-400 font-semibold mb-6">
          AI Engineer
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg mb-10 leading-relaxed">
          I build production-ready AI systems, from RAG pipelines and LLM applications
          to cloud-native deployments. Open to AI Engineer, GenAI Engineer, Backend Engineer, and MLOps & Cloud roles.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="#projects"
            className="w-full sm:w-auto text-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto text-center px-6 py-3 border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 rounded-lg font-medium transition-colors"
          >
            Contact Me
          </a>
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full sm:w-auto px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              Download Resume
              <span className="text-xs">{showDropdown ? '▲' : '▼'}</span>
            </button>
            {showDropdown && (
              <div className="absolute top-full mt-2 left-0 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-10">
                {resumes.map(resume => (
                  <a
                    key={resume.label}
                    href={resume.file}
                    download
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {resume.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}