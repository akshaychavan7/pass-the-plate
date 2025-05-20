"use client"

import { MapPin, Clock, MessageCircle } from "lucide-react"
import { useTheme } from "../context/theme-context"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface FoodCardProps {
  item: {
    id: string
    title: string
    description: string
    distance: string
    image: any
    tags: string[]
    expiresIn: string
    isFree: boolean
    price?: string
    originalPrice?: string
    donorId?: string
    donorName?: string
  }
  onPress: () => void
}

const FoodCard = ({ item, onPress }: FoodCardProps) => {
  const { theme } = useTheme()
  const router = useRouter()

  const handleChatPress = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the card's onPress
    router.push(`/chat?recipientId=${item.donorId}&recipientName=${encodeURIComponent(item.donorName || "Donor")}`)
  }

  return (
    <div
      onClick={onPress}
      className={cn(
        "rounded-2xl overflow-hidden mb-4 cursor-pointer",
        theme === "dark" ? "bg-gray-800" : "bg-white shadow-sm"
      )}
    >
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-[200px] object-cover"
        />
        {!item.isFree && (
          <div className="absolute top-3 right-3 bg-background/90 p-2 rounded-lg flex flex-col items-end">
            <span className="font-bold text-foreground">
              {item.price}
            </span>
            {item.originalPrice && (
              <span className="text-foreground/50 line-through text-sm">
                {item.originalPrice}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-foreground mb-2">
          {item.title}
        </h3>
        <p className="text-foreground/80 text-sm mb-3">
          {item.description}
        </p>

        <div className="flex gap-2 mb-3">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "px-2 py-1 rounded text-xs",
                theme === "dark" ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-700"
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <MapPin size={16} className="text-foreground/50" />
            <span className="text-foreground/50 text-sm">
              {item.distance} km
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-foreground/50" />
            <span className="text-foreground/50 text-sm">
              {item.expiresIn}
            </span>
          </div>
        </div>

        <button
          onClick={handleChatPress}
          className={cn(
            "flex items-center gap-2 mt-3 p-2 rounded-lg w-full justify-center",
            theme === "dark" 
              ? "bg-primary/20 text-primary hover:bg-primary/30" 
              : "bg-primary/10 text-primary hover:bg-primary/20"
          )}
        >
          <MessageCircle size={16} />
          <span>Chat with Donor</span>
        </button>
      </div>
    </div>
  )
}

export default FoodCard
