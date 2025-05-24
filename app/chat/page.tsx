"use client"

import { useState, useEffect } from 'react'
import { RequestNotification } from '@/components/request-notification'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'

interface RequestNotification {
  type: 'FOOD_REQUEST'
  itemId: string
  itemTitle: string
  requesterId: string
  requesterName: string
  timestamp: string
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED'
}

interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
}

export default function ChatPage() {
  const [notifications, setNotifications] = useState<RequestNotification[]>([])
  const [activeChats, setActiveChats] = useState<{[key: string]: ChatMessage[]}>({})
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [messageInput, setMessageInput] = useState('')

  // Load notifications from localStorage
  useEffect(() => {
    const loadNotifications = () => {
      const storedNotifications: RequestNotification[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith('notification_')) {
          const notification = JSON.parse(localStorage.getItem(key) || '')
          if (notification.status === 'PENDING') {
            storedNotifications.push(notification)
          }
        }
      }
      setNotifications(storedNotifications)
    }

    loadNotifications()
    // Set up an interval to check for new notifications
    const interval = setInterval(loadNotifications, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleAcceptRequest = (notification: RequestNotification) => {
    // Update notification status
    localStorage.setItem(
      `notification_${notification.itemId}`,
      JSON.stringify({ ...notification, status: 'ACCEPTED' })
    )
    
    // Remove from notifications list
    setNotifications(prev => prev.filter(n => n.itemId !== notification.itemId))
    
    // Initialize chat
    setActiveChats(prev => ({
      ...prev,
      [notification.requesterId]: []
    }))
    setSelectedChat(notification.requesterId)
  }

  const handleRejectRequest = (notification: RequestNotification) => {
    // Update notification status
    localStorage.setItem(
      `notification_${notification.itemId}`,
      JSON.stringify({ ...notification, status: 'REJECTED' })
    )
    
    // Remove from notifications list
    setNotifications(prev => prev.filter(n => n.itemId !== notification.itemId))
  }

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'current-user-id', // Replace with actual user ID
      senderName: 'Current User', // Replace with actual user name
      content: messageInput,
      timestamp: new Date().toISOString()
    }

    setActiveChats(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage]
    }))

    setMessageInput('')
  }

  return (
    <div className="container mx-auto p-4 h-[calc(100vh-4rem)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        {/* Notifications and Chat List */}
        <div className="md:col-span-1 space-y-4">
          {/* Notifications */}
          {notifications.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Requests</h2>
              {notifications.map(notification => (
                <RequestNotification
                  key={notification.itemId}
                  notification={notification}
                  onAccept={handleAcceptRequest}
                  onReject={handleRejectRequest}
                />
              ))}
            </div>
          )}

          {/* Chat List */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Active Chats</h2>
            {Object.entries(activeChats).map(([userId, messages]) => (
              <Card
                key={userId}
                className={`p-3 mb-2 cursor-pointer hover:bg-gray-50 ${
                  selectedChat === userId ? 'bg-gray-50' : ''
                }`}
                onClick={() => setSelectedChat(userId)}
              >
                <div className="font-medium">
                  {messages[0]?.senderName || 'Chat User'}
                </div>
                <div className="text-sm text-gray-600 truncate">
                  {messages[messages.length - 1]?.content || 'No messages yet'}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="md:col-span-2 flex flex-col h-full">
          {selectedChat ? (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeChats[selectedChat]?.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === 'current-user-id' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.senderId === 'current-user-id'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-gray-100'
                      }`}
                    >
                      <div className="text-sm font-medium mb-1">
                        {message.senderName}
                      </div>
                      <div>{message.content}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 