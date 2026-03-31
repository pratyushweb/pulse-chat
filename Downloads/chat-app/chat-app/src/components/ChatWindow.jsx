import React, { useEffect, useRef, useState } from 'react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import Avatar from './Avatar'

export default function ChatWindow({ user, messages, isTyping, onSend, onBack }) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    onSend(text)
    setInput('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800/60 bg-surface-950 flex-shrink-0">
        {/* Mobile back button */}
        <button
          className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          onClick={onBack}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <Avatar user={user} />

        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold text-white">{user.name}</h2>
          <p className={`text-xs font-mono ${isTyping ? 'text-emerald-400' : user.status === 'online' ? 'text-emerald-400' : 'text-slate-500'}`}>
            {isTyping ? 'typing...' : user.status === 'online' ? '● Online' : '○ Offline'}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors">
            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors">
            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.845v6.31a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors">
            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-surface-950"
        style={{ backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(99,102,241,0.03) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(99,102,241,0.03) 2%, transparent 0%)', backgroundSize: '100px 100px' }}
      >
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isSent={msg.senderId === 'me'}
          />
        ))}

        {isTyping && <TypingIndicator userName={user.name.split(' ')[0]} />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="flex-shrink-0 px-4 py-3 border-t border-slate-800/60 bg-surface-950">
        <div className="flex items-end gap-2">
          <button className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors mb-0.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>

          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${user.name.split(' ')[0]}...`}
              rows={1}
              className="w-full bg-surface-800 border border-slate-700 rounded-2xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/20 resize-none transition-all leading-relaxed max-h-28 overflow-y-auto"
              style={{ scrollbarWidth: 'thin' }}
            />
          </div>

          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="flex-shrink-0 w-9 h-9 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:bg-slate-700 disabled:text-slate-500 flex items-center justify-center text-white transition-all hover:shadow-lg hover:shadow-brand-600/30 active:scale-95 mb-0.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-[10px] text-slate-600 text-center mt-2 font-mono">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  )
}
