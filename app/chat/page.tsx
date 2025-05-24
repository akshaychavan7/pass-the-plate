"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Chat } from '@/components/Chat'
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

// Dummy chat data
const dummyChats = [
  {
    id: "1",
    name: "Sarah Johnson",
    lastMessage: "Thanks for the pasta! It was delicious.",
    time: "10:30 AM",
    unread: 0,
    avatar: "S"
  },
  {
    id: "2",
    name: "Mike Chen",
    lastMessage: "Is the bread still available?",
    time: "9:45 AM",
    unread: 2,
    avatar: "M"
  },
  {
    id: "3",
    name: "Emma Wilson",
    lastMessage: "I can pick up the vegetables tomorrow morning.",
    time: "Yesterday",
    unread: 0,
    avatar: "E"
  },
  {
    id: "4",
    name: "David Brown",
    lastMessage: "The cookies were amazing! Would love to get more next time.",
    time: "Yesterday",
    unread: 0,
    avatar: "D"
  },
  {
    id: "5",
    name: "Lisa Patel",
    lastMessage: "Can I get the recipe for the curry?",
    time: "2 days ago",
    unread: 1,
    avatar: "L"
  }
]

export default function ChatPage() {
  const searchParams = useSearchParams()
  const recipientId = searchParams.get('recipientId')
  const recipientName = searchParams.get('recipientName')
  const [selectedChat, setSelectedChat] = useState<string | null>(recipientId)

  // Update selected chat when URL parameters change
  useEffect(() => {
    if (recipientId) {
      setSelectedChat(recipientId)
    }
  }, [recipientId])

  const handleBack = () => {
    setSelectedChat(null)
  }

  if (selectedChat) {
    return (
      <div className="fixed inset-0 bg-background">
        <div className="h-[calc(100vh-4rem)] flex flex-col">
          <div className="flex items-center gap-4 p-4 border-b">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 shrink-0">
                <div className="bg-emerald-600 text-white h-full w-full flex items-center justify-center text-lg font-semibold">
                  {dummyChats.find(chat => chat.id === selectedChat)?.avatar}
                </div>
              </Avatar>
              <h2 className="text-lg font-semibold">
                {dummyChats.find(chat => chat.id === selectedChat)?.name}
              </h2>
            </div>
          </div>
          <div className="flex-1">
            <Chat
              recipientId={selectedChat}
              recipientName={dummyChats.find(chat => chat.id === selectedChat)?.name || "User"}
              currentUserId="current-user"
              currentUserName="You"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 h-[calc(100vh-4rem)]">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>
        <div className="space-y-2">
          {dummyChats.map((chat) => (
            <Card
              key={chat.id}
              className={cn(
                "p-4 cursor-pointer transition-colors hover:bg-emerald-50",
                chat.unread > 0 ? "bg-emerald-50/50" : ""
              )}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 shrink-0">
                  <div className="bg-emerald-600 text-white h-full w-full flex items-center justify-center text-lg font-semibold">
                    {chat.avatar}
                  </div>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-foreground truncate">
                      {chat.name}
                    </h3>
                    <span className="text-sm text-muted-foreground shrink-0">
                      {chat.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <div className="ml-2 bg-emerald-600 text-white text-xs font-semibold px-2 py-1 rounded-full shrink-0">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 