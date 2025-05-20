"use client"

import { useSearchParams } from "next/navigation"
import { Chat } from "@/components/Chat"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { MessageCircle, Search, Leaf, Sprout, Recycle, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data - In a real app, this would come from your backend
const mockConversations = [
  {
    id: "1",
    recipientId: "2",
    recipientName: "John Doe",
    lastMessage: "Is the food still available?",
    timestamp: new Date(),
    unread: true,
  },
  {
    id: "2",
    recipientId: "3",
    recipientName: "Jane Smith",
    lastMessage: "I can pick it up tomorrow",
    timestamp: new Date(Date.now() - 3600000),
    unread: false,
  },
  {
    id: "3",
    recipientId: "4",
    recipientName: "Mike Johnson",
    lastMessage: "The food was delicious!",
    timestamp: new Date(Date.now() - 86400000),
    unread: false,
  },
]

export default function ChatPage() {
  const searchParams = useSearchParams()
  const recipientId = searchParams.get("recipientId")
  const recipientName = searchParams.get("recipientName")

  // Mock current user - In a real app, this would come from your auth system
  const currentUser = {
    id: "1",
    name: "Current User",
  }

  // Only show selected conversation if we have recipient info from navigation
  const selectedConversation = recipientId 
    ? mockConversations.find(c => c.recipientId === recipientId)
    : null

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-50 p-2 rounded-lg">
            <Leaf className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9 bg-card focus-visible:ring-emerald-600"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Conversation List */}
        <Card className="col-span-1 overflow-hidden bg-card border-emerald-100">
          <div className="p-4 border-b border-emerald-100 bg-emerald-50/50">
            <div className="flex items-center gap-2 text-emerald-700">
              <Sprout className="h-4 w-4" />
              <span className="text-sm font-medium">Active Conversations</span>
            </div>
          </div>
          <ScrollArea className="h-[600px]">
            <div className="p-2 space-y-1">
              {mockConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors",
                    selectedConversation?.id === conversation.id 
                      ? "bg-emerald-50 border border-emerald-200" 
                      : "hover:bg-emerald-50/50"
                  )}
                >
                  <Avatar className="h-12 w-12 shrink-0">
                    <div className="bg-emerald-600 text-white h-full w-full flex items-center justify-center">
                      {conversation.recipientName[0]}
                    </div>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-foreground truncate">
                        {conversation.recipientName}
                      </p>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {conversation.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unread && (
                        <span className="h-2 w-2 rounded-full bg-emerald-600 shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Chat Interface */}
        <div className="col-span-2">
          {selectedConversation ? (
            <Chat
              recipientId={selectedConversation.recipientId}
              recipientName={selectedConversation.recipientName}
              currentUserId={currentUser.id}
              currentUserName={currentUser.name}
            />
          ) : (
            <Card className="h-[600px] flex items-center justify-center bg-card border-emerald-100">
              <div className="text-center p-4 sm:p-8">
                <div className="bg-emerald-50 rounded-full p-4 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 flex items-center justify-center">
                  <Leaf className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3">Start a Conversation</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Connect with food donors and recipients to coordinate food sharing. 
                  Help reduce food waste and make a positive impact on our environment.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <Recycle className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                    <p className="text-sm text-emerald-700">Reduce Waste</p>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <Heart className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                    <p className="text-sm text-emerald-700">Share Food</p>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <Sprout className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                    <p className="text-sm text-emerald-700">Grow Community</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Browse available food items</p>
                  <p>• Click the chat button to start a conversation</p>
                  <p>• Coordinate pickup times and locations</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
} 