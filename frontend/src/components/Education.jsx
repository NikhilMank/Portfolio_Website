const education = [
  {
    degree: 'AWS re/Start Cloud Computing Bootcamp',
    institution: 'neuefische GmbH – School and Pool for Digital Talent',
    location: 'Hamburg, Germany',
    period: '07/2025 – 10/2025',
    grade: null,
    points: [
      { text: 'Topics: Networking, Linux Systems, Terraform, Scripting, Docker, Kubernetes, AWS Services' },
    ],
  },
  {
    degree: 'M.Sc. Mechatronics',
    institution: 'Universität Siegen',
    location: 'Siegen, Germany',
    period: '10/2020 – 03/2024',
    grade: '1.8 / 4.0',
    points: [
      { text: 'Subjects: Software Engineering (C++, Python, SQL), Deep Learning, Unsupervised Deep Learning, Computer Vision, Artificial Intelligence, Automation and Industrial Communication, Project Management' },
      { text: 'Thesis: Pixel-wise Out-of-Distribution Detection in Semantic Segmentation for Aerial Imagery using Normalising Flow Networks for Negative Feature Synthesis', link: 'https://drive.google.com/file/d/1Pvpd0K53zPxAYuQTinDliMU-Ra0GgBmY/view?usp=drive_link' },
      { text: 'Studienarbeit: Evaluating and improving the robustness of deep neural networks through adversarial training' },
    ],
  },
  {
    degree: 'B.Tech. Mechanical Engineering',
    institution: 'CVR College of Engineering',
    location: 'Hyderabad, India',
    period: '06/2015 – 05/2019',
    grade: '9.63 / 10',
    points: [
      { text: 'Subjects: Engineering Mathematics, Fluid Mechanics, Mechanics, IC Engines, CAD, CNC, Finite Element Methods' },
    ],
  },
]

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">Education</h2>
        <div className="relative border-l-2 border-indigo-600 dark:border-indigo-400 pl-8 space-y-12">
          {education.map((edu, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-10 w-4 h-4 rounded-full bg-indigo-600 dark:bg-indigo-400 border-4 border-white dark:border-gray-950" />
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{edu.degree}</h3>
                  <span className="text-sm text-indigo-600 dark:text-indigo-400 mt-1 md:mt-0 shrink-0">{edu.period}</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{edu.institution} · {edu.location}</p>
                  {edu.grade && (
                    <span className="px-2 py-0.5 text-xs bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-md border border-indigo-200 dark:border-indigo-800">
                      Grade: {edu.grade}
                    </span>
                  )}
                </div>
                <ul className="space-y-2">
                  {edu.points.map((point, j) => (
                    <li key={j} className="text-sm text-gray-600 dark:text-gray-400 flex gap-2">
                      <span className="text-indigo-500 mt-1 shrink-0">▸</span>
                      {point.link ? (
                        <a href={point.link} target="_blank" rel="noreferrer" className="hover:text-indigo-500 underline underline-offset-2">
                          {point.text}
                        </a>
                      ) : (
                        point.text
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
