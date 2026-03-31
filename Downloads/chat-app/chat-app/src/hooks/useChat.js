import { useState, useCallback } from 'react'
import { conversations as initialConversations, users as initialUsers } from '../data/dummyData'

export function useChat() {
  const [conversations, setConversations] = useState(initialConversations)
  const [users, setUsers] = useState(initialUsers)
  const [typingUsers, setTypingUsers] = useState({})

  const sendMessage = useCallback((userId, text) => {
    const newMessage = {
      id: `m${Date.now()}`,
      senderId: 'me',
      text,
      timestamp: new Date(),
      status: 'sent',
    }

    setConversations(prev => ({
      ...prev,
      [userId]: [...(prev[userId] || []), newMessage],
    }))

    setUsers(prev => prev.map(u =>
      u.id === userId
        ? { ...u, lastMessage: text, lastMessageTime: 'Now', unreadCount: 0 }
        : u
    ))

    // Simulate a reply after 1.5-3 seconds
    const replyUser = users.find(u => u.id === userId)
    if (replyUser && replyUser.status === 'online') {
      const delay = 1500 + Math.random() * 1500

      // Show typing
      setTimeout(() => {
        setTypingUsers(prev => ({ ...prev, [userId]: true }))
      }, 800)

      setTimeout(() => {
        setTypingUsers(prev => ({ ...prev, [userId]: false }))

        const replies = [
          'Got it, thanks!',
          'Sure, sounds good!',
          'Let me check on that.',
          'Interesting! Tell me more.',
          'I\'ll get back to you shortly.',
          '👍 On it!',
          'Makes sense. I\'ll take a look.',
        ]
        const replyText = replies[Math.floor(Math.random() * replies.length)]

        const replyMsg = {
          id: `m${Date.now()}`,
          senderId: userId,
          text: replyText,
          timestamp: new Date(),
          status: 'delivered',
        }

        setConversations(prev => ({
          ...prev,
          [userId]: [...(prev[userId] || []), replyMsg],
        }))

        setUsers(prev => prev.map(u =>
          u.id === userId
            ? { ...u, lastMessage: replyText, lastMessageTime: 'Now' }
            : u
        ))
      }, delay)
    }
  }, [users])

  return { conversations, users, typingUsers, sendMessage }
}
