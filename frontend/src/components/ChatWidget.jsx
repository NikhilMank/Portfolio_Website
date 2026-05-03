import { useState, useRef, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [maximized, setMaximized] = useState(false)
  const [showHint, setShowHint] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm Nikhil's AI assistant. Ask me questions and I will answer them as best as I can." }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 6000)
    return () => clearTimeout(timer)
  }, [])

  async function sendMessage() {
    const question = input.trim()
    if (!question || loading) return

    setMessages(prev => [...prev, { role: 'user', text: question }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', text: data.answer }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat panel — full-width on mobile, fixed width on desktop */}
      {open && (
        <div className={`fixed z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ${maximized ? 'inset-4' : 'bottom-24 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 h-[60vh] sm:h-[500px]'}`}>
          {/* Header */}
          <div className="px-4 py-3 bg-indigo-600 dark:bg-indigo-700 flex justify-between items-center">
            <div>
              <p className="text-white font-semibold text-sm">Ask Nikhil's AI</p>
              <p className="text-indigo-200 text-xs">Powered by Amazon Bedrock</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setMaximized(m => !m)} className="text-white hover:text-indigo-200" aria-label={maximized ? 'Restore' : 'Maximise'}>
                {maximized ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                )}
              </button>
              <button onClick={() => setOpen(false)} className="text-white hover:text-indigo-200 text-lg" aria-label="Close">✕</button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-2xl rounded-bl-sm text-sm text-gray-500 dark:text-gray-400">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              className="flex-1 text-sm px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none placeholder-gray-400"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm rounded-lg transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Floating button + hint bubble */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <div className={`bg-indigo-50 dark:bg-gray-900 text-indigo-900 dark:text-gray-200 text-sm font-medium px-4 py-2 rounded-full shadow-lg border border-indigo-200 dark:border-gray-700 whitespace-nowrap transition-all duration-300 ${(showHint || hovered) && !open ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
          Got questions? Ask away
        </div>
        <button
          onClick={() => { setOpen(!open); setShowHint(false) }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-colors shrink-0"
          aria-label="Open chat"
        >
          {open ? '✕' : '🤖'}
        </button>
      </div>
    </>
  )
}
