export default function Navbar({ darkMode, setDarkMode }) {
  const links = ['Skills', 'Experience', 'Internship', 'Education', 'Projects', 'Contact']

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="font-bold text-lg text-indigo-600 dark:text-indigo-400">Nikhil Mankali</span>

        <div className="flex items-center gap-8">
          {links.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {link}
            </a>
          ))}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl cursor-pointer"
            aria-label="Toggle theme"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  )
}
