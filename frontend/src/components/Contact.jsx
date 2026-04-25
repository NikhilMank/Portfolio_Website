const contacts = [
  { label: 'Email', value: 'mankalinikhil9@gmail.com', href: 'mailto:mankalinikhil9@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/nikhil-mankali', href: 'https://www.linkedin.com/in/nikhil-mankali' },
  { label: 'GitHub', value: 'github.com/NikhilMank', href: 'https://github.com/NikhilMank' },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-gray-100 dark:bg-gray-900/50">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Contact</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-12">
          Open to AI Engineer, GenAI Engineer, Backend Engineer, MLOps, and Cloud Engineering roles. Feel free to reach out!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {contacts.map(contact => (
            <a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center px-6 py-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl hover:border-indigo-500 transition-colors"
            >
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-1">{contact.label}</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">{contact.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
