import React from 'react'
import { format, isToday, isYesterday } from 'date-fns'

function formatTime(date) {
  const d = new Date(date)
  if (isToday(d)) return format(d, 'h:mm a')
  if (isYesterday(d)) return 'Yesterday ' + format(d, 'h:mm a')
  return format(d, 'MMM d, h:mm a')
}

function StatusIcon({ status }) {
  if (status === 'sent') return (
    <svg className="w-3.5 h-3.5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
  if (status === 'delivered') return (
    <svg className="w-3.5 h-3.5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"/>
    </svg>
  )
  if (status === 'read') return (
    <svg className="w-3.5 h-3.5 text-brand-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"/>
    </svg>
  )
  return null
}

export default function MessageBubble({ message, isSent }) {
  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} animate-slide-up`}>
      <div className={`flex flex-col ${isSent ? 'items-end' : 'items-start'} max-w-[75%]`}>
        <div className={isSent ? 'message-bubble-sent' : 'message-bubble-received'}>
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
        <div className={`flex items-center gap-1 mt-1 px-1 ${isSent ? 'flex-row-reverse' : ''}`}>
          <span className="text-[11px] text-slate-500 font-mono">
            {formatTime(message.timestamp)}
          </span>
          {isSent && <StatusIcon status={message.status} />}
        </div>
      </div>
    </div>
  )
}
