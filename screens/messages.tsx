"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { useTheme } from "../context/theme-context"
import { useNavigation } from "../context/navigation-context"

// Mock data
const conversations = [
  {
    id: "1",
    user: {
      name: "John Smith",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
    },
    lastMessage: "Is the pasta still available?",
    time: "10:30 AM",
    unread: 2,
  },
  {
    id: "2",
    user: {
      name: "Emily Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
    },
    lastMessage: "Thanks for the vegetables! They were fresh and delicious.",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "3",
    user: {
      name: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    },
    lastMessage: "I can pick up the bread around 5pm. Does that work?",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "4",
    user: {
      name: "Sophia Garcia",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop",
    },
    lastMessage: "Do you have any more of those apples?",
    time: "Monday",
    unread: 0,
  },
  {
    id: "5",
    user: {
      name: "David Wilson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    },
    lastMessage: "I left the container on your porch. Thanks again!",
    time: "Sunday",
    unread: 0,
  },
]

const Messages = () => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")

  const handleConversationPress = (conversation: any) => {
    navigation.navigate("/conversation", { conversation: JSON.stringify(conversation) })
  }

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      height: "100vh",
      backgroundColor: colors.background,
      padding: "16px"
    }}>
      <div style={{ 
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        border: `1px solid ${colors.border}`,
        borderRadius: "12px",
        padding: "0 16px",
        height: "50px",
        marginBottom: "16px",
        backgroundColor: colors.card
      }}>
        <Search stroke={colors.text} width={20} height={20} />
        <input
          style={{ 
            flex: 1,
            marginLeft: "12px",
            fontSize: "16px",
            color: colors.text,
            backgroundColor: "transparent",
            border: "none",
            outline: "none"
          }}
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div style={{ 
        flex: 1,
        overflowY: "auto",
        paddingBottom: "20px"
      }}>
        {conversations.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "16px 0",
              borderBottom: `1px solid ${colors.border}`,
              cursor: "pointer"
            }}
            onClick={() => handleConversationPress(item)}
          >
            <img
              src={item.user.avatar}
              alt={item.user.name}
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "28px",
                marginRight: "16px",
                objectFit: "cover"
              }}
            />

            <div style={{ flex: 1 }}>
              <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "6px"
              }}>
                <span style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: colors.text
                }}>
                  {item.user.name}
                </span>
                <span style={{
                  fontSize: "12px",
                  color: colors.text + "80"
                }}>
                  {item.time}
                </span>
              </div>

              <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <span style={{
                  fontSize: "14px",
                  color: item.unread > 0 ? colors.text : colors.text + "80",
                  flex: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}>
                  {item.lastMessage}
                </span>

                {item.unread > 0 && (
                  <div style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "10px",
                    backgroundColor: colors.primary,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "8px"
                  }}>
                    <span style={{
                      color: "#FFFFFF",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}>
                      {item.unread}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Messages
