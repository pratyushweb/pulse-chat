import React from 'react'

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-surface-950 animate-fade-in"
      style={{ backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(99,102,241,0.03) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(99,102,241,0.03) 2%, transparent 0%)', backgroundSize: '100px 100px' }}
    >
      <div className="flex flex-col items-center gap-5 max-w-xs text-center">
        {/* Icon */}
        <div className="relative">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center shadow-2xl shadow-brand-900/50">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          {/* Decorative dots */}
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-surface-950 animate-pulse" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-200 mb-2">Select a conversation</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Choose someone from the sidebar to start messaging. Your messages are end-to-end encrypted.
          </p>
        </div>

        {/* Decorative chips */}
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {['🔒 Encrypted', '⚡ Real-time', '📱 Cross-device'].map(tag => (
            <span key={tag} className="text-xs px-3 py-1 bg-slate-800/60 text-slate-400 rounded-full border border-slate-700/50">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
