import React from 'react'

export default function Avatar({ user, size = 'md' }) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-11 h-11 text-sm',
    lg: 'w-14 h-14 text-base',
  }

  return (
    <div className={`relative flex-shrink-0 ${sizes[size]}`}>
      <div className={`${sizes[size]} rounded-full bg-gradient-to-br ${user.avatarColor} flex items-center justify-center font-semibold text-white`}>
        {user.avatar}
      </div>
      {user.status === 'online' && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-surface-900 rounded-full animate-pulse-dot" />
      )}
    </div>
  )
}
