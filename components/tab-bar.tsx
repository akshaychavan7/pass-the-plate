"use client"

import { Home, Map, PlusCircle, Package, User, MessageCircle } from "lucide-react"
import { useNavigation } from "../context/navigation-context"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const tabs = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Map", icon: Map, path: "/map-view" },
  { label: "Add", icon: PlusCircle, path: "/add-food" },
  { label: "Chat", icon: MessageCircle, path: "/chat" },
  { label: "Pantry", icon: Package, path: "/smart-pantry" },
  { label: "Profile", icon: User, path: "/profile" },
]

const TabBar = () => {
  const navigation = useNavigation()
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border bg-background">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = pathname === tab.path
        return (
          <button
            key={tab.path}
            onClick={() => navigation.navigate(tab.path)}
            className={cn(
              "flex flex-col items-center gap-1 border-none bg-transparent text-xs font-medium transition-colors",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon
              size={24}
              className={cn(
                "transition-colors",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )}
            />
            <span>{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default TabBar
