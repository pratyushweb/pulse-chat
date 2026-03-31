import React from 'react'
import Avatar from './Avatar'

export default function UserListItem({ user, isActive, isTyping, onClick }) {
  return (
    <div
      className={`user-list-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <Avatar user={user} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className={`text-sm font-medium truncate ${isActive ? 'text-white' : 'text-slate-200'}`}>
            {user.name}
          </span>
          <span className="text-[11px] text-slate-500 flex-shrink-0 ml-2 font-mono">
            {user.lastMessageTime}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className={`text-xs truncate ${isTyping ? 'text-emerald-400 italic' : 'text-slate-500'}`}>
            {isTyping ? 'typing...' : user.lastMessage}
          </p>
          {user.unreadCount > 0 && (
            <span className="ml-2 flex-shrink-0 min-w-[18px] h-[18px] bg-brand-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
              {user.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
