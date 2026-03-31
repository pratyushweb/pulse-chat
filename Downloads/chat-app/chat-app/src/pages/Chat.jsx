import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatWindow from '../components/ChatWindow'
import EmptyState from '../components/EmptyState'
import { useChat } from '../hooks/useChat'
import { useAuth } from '../context/AuthContext'

export default function Chat() {
  const { logout } = useAuth()
  const { users, conversations, typingUsers, sendMessage } = useChat()
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [showSidebar, setShowSidebar] = useState(true)

  const selectedUser = users.find(u => u.id === selectedUserId)
  const messages = selectedUserId ? (conversations[selectedUserId] || []) : []
  const isTyping = selectedUserId ? !!typingUsers[selectedUserId] : false

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId)
    setShowSidebar(false) // mobile: hide sidebar when chat opens
  }

  const handleBack = () => {
    setShowSidebar(true)
    setSelectedUserId(null)
  }

  const handleSend = (text) => {
    if (selectedUserId) sendMessage(selectedUserId, text)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface-950">
      {/* Sidebar */}
      <div className={`
        w-full md:w-80 lg:w-96 flex-shrink-0
        ${showSidebar ? 'flex' : 'hidden md:flex'}
        flex-col h-full
      `}>
        <Sidebar
          users={users}
          typingUsers={typingUsers}
          selectedUserId={selectedUserId}
          onSelectUser={handleSelectUser}
          onLogout={logout}
        />
      </div>

      {/* Chat area */}
      <div className={`
        flex-1 flex flex-col h-full
        ${!showSidebar || selectedUserId ? 'flex' : 'hidden md:flex'}
      `}>
        {selectedUser ? (
          <ChatWindow
            user={selectedUser}
            messages={messages}
            isTyping={isTyping}
            onSend={handleSend}
            onBack={handleBack}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}
