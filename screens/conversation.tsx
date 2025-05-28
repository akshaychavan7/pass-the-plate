"use client"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { useTheme } from "../context/theme-context"

// Mock data
const initialMessages = [
  {
    id: "1",
    text: "Hi there! I saw your listing for homemade pasta.",
    sender: "them",
    time: "10:15 AM",
  },
  {
    id: "2",
    text: "Is it still available?",
    sender: "them",
    time: "10:15 AM",
  },
  {
    id: "3",
    text: "Yes, it is! I made it fresh this morning.",
    sender: "me",
    time: "10:20 AM",
  },
  {
    id: "4",
    text: "Great! When would be a good time to pick it up?",
    sender: "them",
    time: "10:22 AM",
  },
  {
    id: "5",
    text: "I'm available this afternoon, around 3pm. Does that work for you?",
    sender: "me",
    time: "10:25 AM",
  },
  {
    id: "6",
    text: "That works perfectly! Where should I meet you?",
    sender: "them",
    time: "10:28 AM",
  },
]

const Conversation = () => {
  const { colors } = useTheme()
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (newMessage.trim() === "") return
    setMessages((prev) => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        text: newMessage,
        sender: "me",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ])
    setNewMessage("")
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      background: colors.background,
    }}>
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: 16,
        paddingBottom: 20,
        display: "flex",
        flexDirection: "column",
      }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              alignSelf: msg.sender === "me" ? "flex-end" : "flex-start",
              marginBottom: 16,
              maxWidth: "80%",
              display: "flex",
              flexDirection: "column",
              alignItems: msg.sender === "me" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                background: msg.sender === "me" ? colors.primary : colors.card,
                color: msg.sender === "me" ? "#fff" : colors.text,
                borderRadius: 16,
                padding: "12px 16px",
                marginBottom: 4,
                borderBottomRightRadius: msg.sender === "me" ? 4 : 16,
                borderBottomLeftRadius: msg.sender === "me" ? 16 : 4,
                fontSize: 16,
              }}
            >
              {msg.text}
            </div>
            <span style={{ fontSize: 12, color: colors.text + "80" }}>{msg.time}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={e => {
          e.preventDefault()
          handleSend()
        }}
        style={{
          display: "flex",
          alignItems: "center",
          padding: 8,
          borderTop: `1px solid ${colors.border}`,
          background: colors.card,
        }}
      >
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            border: `1px solid ${colors.border}`,
            borderRadius: 20,
            padding: "8px 16px",
            marginRight: 8,
            background: colors.background,
            color: colors.text,
            fontSize: 16,
            maxHeight: 120,
          }}
        />
        <button
          type="submit"
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            background: colors.primary,
            border: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: newMessage.trim() === "" ? "not-allowed" : "pointer",
            opacity: newMessage.trim() === "" ? 0.5 : 1,
          }}
          disabled={newMessage.trim() === ""}
        >
          <Send stroke="#FFFFFF" width={20} height={20} />
        </button>
      </form>
    </div>
  )
}

export default Conversation
