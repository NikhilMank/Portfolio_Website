const internships = [
  {
    role: 'Computer Vision Intern',
    company: 'Fraunhofer Institute for Transport and Infrastructure Systems IVI',
    location: 'Ingolstadt, Germany',
    period: '06/2023 – 09/2023',
    points: [
      'Analyzed and harmonized 15+ aerial datasets for CV model training, focusing on annotation format, class distribution, and input normalization.',
      'Wrote scripts to automate label conversion and enhance compatibility with object detection and segmentation frameworks.',
      'Created internal documentation on Docker image creation, Kubernetes deployment via kubectl, and Octane simulation usage — now used as onboarding material.',
      'Collaborated with cross-functional teams to integrate AI modules into existing workflows, supporting testing, deployment, and real-world application scenarios.',
    ],
    stack: ['Python', 'PyTorch', 'Docker', 'Kubernetes', 'Git', 'Bash', 'Object Detection', 'Segmentation'],
  },
]

export default function Internship() {
  return (
    <section id="internship" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">Internship</h2>
        <div className="relative border-l-2 border-indigo-600 dark:border-indigo-400 pl-8 space-y-12">
          {internships.map((intern, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-10 w-4 h-4 rounded-full bg-indigo-600 dark:bg-indigo-400 border-4 border-white dark:border-gray-950" />
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{intern.role}</h3>
                  <span className="text-sm text-indigo-600 dark:text-indigo-400 mt-1 md:mt-0 shrink-0">{intern.period}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{intern.company} · {intern.location}</p>
                <ul className="space-y-2 mb-4">
                  {intern.points.map((point, j) => (
                    <li key={j} className="text-sm text-gray-600 dark:text-gray-400 flex gap-2">
                      <span className="text-indigo-500 mt-1 shrink-0">▸</span>
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                  {intern.stack.map(tech => (
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
