import React from 'react'

export default function TypingIndicator({ userName }) {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="message-bubble-received flex flex-col gap-1">
        <div className="flex items-center gap-1.5 h-5">
          <div className="typing-dot" />
          <div className="typing-dot" />
          <div className="typing-dot" />
        </div>
        <span className="text-[10px] text-slate-500 font-mono">{userName} is typing...</span>
      </div>
    </div>
  )
}
