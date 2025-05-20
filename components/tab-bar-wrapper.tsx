'use client'

import { usePathname } from 'next/navigation'
import TabBar from './tab-bar'

export function TabBarWrapper() {
  const pathname = usePathname()
  const showTabBar = !['/login', '/signup', '/forgot-password'].includes(pathname)

  if (!showTabBar) return null

  return <TabBar />
} 