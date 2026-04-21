import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Internship from './components/Internship'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ChatWidget from './components/ChatWidget'

export default function App() {
  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Hero />
        <Skills />
        <Experience />
        <Internship />
        <Education />
        <Projects />
        <Contact />
        <ChatWidget />
      </div>
    </div>
  )
}
