const certifications = [
  {
    title: 'AWS Certified Cloud Practitioner (CLF-C02)',
    issuer: 'Amazon Web Services (AWS)',
    topics: ['Core AWS Services', 'Security', 'Pricing', 'Networking', 'Cloud Best Practices', 'Architecture Principles'],
  },
]

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col gap-3">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🏅</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{cert.title}</h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">{cert.issuer}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-gray-800">
                {cert.topics.map(topic => (
                  <span key={topic} className="px-2 py-1 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300">
                    {topic}
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
