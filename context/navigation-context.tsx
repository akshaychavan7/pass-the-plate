"use client"

import { createContext, useContext, useCallback } from "react"
import { useRouter } from "next/navigation"

type NavigationContextType = {
  navigate: (path: string, params?: Record<string, any>) => void
  goBack: () => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const navigate = useCallback((path: string, params?: Record<string, any>) => {
    if (params) {
      const queryString = new URLSearchParams(params).toString()
      router.push(`${path}?${queryString}`)
    } else {
      router.push(path)
    }
  }, [router])

  const goBack = useCallback(() => {
    router.back()
  }, [router])

  return (
    <NavigationContext.Provider value={{ navigate, goBack }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
} 