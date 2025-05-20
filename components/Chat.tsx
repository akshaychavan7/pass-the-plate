"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Paperclip, Image as ImageIcon, Leaf, Sprout, Recycle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  senderName: string;
  status?: 'sent' | 'delivered' | 'read';
}

interface ChatProps {
  recipientId: string;
  recipientName: string;
  currentUserId: string;
  currentUserName: string;
}

export function Chat({ recipientId, recipientName, currentUserId, currentUserName }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mock function to simulate sending/receiving messages
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      content: newMessage,
      timestamp: new Date(),
      senderName: currentUserName,
      status: 'sent'
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage('');

    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Simulate response
      const response: Message = {
        id: (Date.now() + 1).toString(),
        senderId: recipientId,
        content: "Thanks for your message! I'll get back to you soon.",
        timestamp: new Date(),
        senderName: recipientName,
        status: 'delivered'
      };
      setMessages((prev) => [...prev, response]);
    }, 2000);

    // Scroll to bottom after sending message
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <Card className="w-full h-[600px] flex flex-col bg-background border-emerald-100">
      {/* Chat Header */}
      <div className="p-4 border-b border-emerald-100 flex items-center gap-3 bg-card">
        <Avatar className="h-10 w-10 shrink-0">
          <div className="bg-emerald-600 text-white h-full w-full flex items-center justify-center">
            {recipientName[0]}
          </div>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-foreground truncate">{recipientName}</h2>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              {isTyping ? 'Typing...' : 'Online'}
            </p>
            {!isTyping && (
              <div className="flex items-center gap-1">
                <Sprout className="h-3 w-3 text-emerald-600 shrink-0" />
                <span className="text-xs text-emerald-600 truncate">Active in food sharing</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-emerald-50 p-2 rounded-lg">
            <Recycle className="h-4 w-4 text-emerald-600" />
          </div>
        </div>
      </div>
      
      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="bg-emerald-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-8 w-8 text-emerald-600" />
              </div>
              <p className="text-muted-foreground mb-2">Start your conversation about food sharing</p>
              <p className="text-sm text-emerald-600">Together we can reduce food waste</p>
            </div>
          </div>
        )}
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.senderId === currentUserId ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "flex items-end gap-2 max-w-[70%]",
                  message.senderId === currentUserId ? "flex-row-reverse" : "flex-row"
                )}
              >
                <Avatar className="h-8 w-8 shrink-0">
                  <div className="bg-emerald-600 text-white h-full w-full flex items-center justify-center">
                    {message.senderName[0]}
                  </div>
                </Avatar>
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2 break-words",
                    message.senderId === currentUserId
                      ? "bg-emerald-600 text-white rounded-tr-none"
                      : "bg-emerald-50 rounded-tl-none"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className={cn(
                      "text-xs shrink-0",
                      message.senderId === currentUserId ? "text-emerald-100" : "text-muted-foreground"
                    )}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {message.senderId === currentUserId && (
                      <span className="text-xs text-emerald-100 shrink-0">
                        {message.status === 'read' ? '✓✓' : message.status === 'delivered' ? '✓✓' : '✓'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <form onSubmit={sendMessage} className="p-4 border-t border-emerald-100 bg-card">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-emerald-600 shrink-0"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-emerald-600 shrink-0"
          >
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 focus-visible:ring-emerald-600"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!newMessage.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </Card>
  );
} 