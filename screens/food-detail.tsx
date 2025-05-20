"use client"

import { MapPin, Clock, Heart, MessageCircle, Share2 } from "lucide-react"
import { useTheme } from "../context/theme-context"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const FoodDetail = () => {
  const { theme } = useTheme()
  const router = useRouter()
  
  const item = {
    id: "1",
    title: "Homemade Pasta",
    description: "Fresh homemade pasta, enough for 4 people. Made today.",
    distance: "0.3",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1000&auto=format&fit=crop",
    tags: ["Italian", "Vegetarian"],
    expiresIn: "2 days",
    isFree: true,
    donorId: "123",
    donorName: "John Doe"
  }

  const handleChatPress = () => {
    router.push(`/chat?recipientId=${item.donorId}&recipientName=${encodeURIComponent(item.donorName)}`)
  }

  return (
    <div className={cn(
      "min-h-screen",
      theme === "dark" ? "bg-gray-900" : "bg-white"
    )}>
      <img 
        src={item.image} 
        alt={item.title} 
        className="w-full h-[300px] object-cover" 
      />

      <div className="p-4">
        <h1 className="text-2xl font-bold text-foreground mb-2">{item.title}</h1>

        <div className="flex items-center mb-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="ml-1 text-foreground">{item.distance} miles away</span>
        </div>

        <div className="flex items-center mb-4">
          <Clock className="w-4 h-4 text-warning" />
          <span className="ml-1 text-warning">Expires in {item.expiresIn}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map((tag, index) => (
            <div 
              key={index} 
              className={cn(
                "px-2 py-1 rounded text-sm",
                theme === "dark" 
                  ? "bg-primary/20 text-primary" 
                  : "bg-primary/10 text-primary"
              )}
            >
              {tag}
            </div>
          ))}
        </div>

        <p className="text-foreground mb-6">{item.description}</p>

        <div className="flex justify-between items-center">
          <button
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg",
              theme === "dark" 
                ? "bg-primary/20 text-primary hover:bg-primary/30" 
                : "bg-primary/10 text-primary hover:bg-primary/20"
            )}
            onClick={handleChatPress}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat with Donor</span>
          </button>

          <div className="flex gap-4">
            <button
              className={cn(
                "p-2 rounded-full",
                theme === "dark" 
                  ? "text-foreground hover:bg-gray-800" 
                  : "text-foreground hover:bg-gray-100"
              )}
            >
              <Heart className="w-5 h-5" />
            </button>
            <button
              className={cn(
                "p-2 rounded-full",
                theme === "dark" 
                  ? "text-foreground hover:bg-gray-800" 
                  : "text-foreground hover:bg-gray-100"
              )}
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodDetail
