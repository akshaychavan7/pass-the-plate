'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Home, Map, Trophy, PlusCircle } from 'lucide-react'

export function Nav() {
  const pathname = usePathname()

  const links = [
    {
      href: '/',
      label: 'Home',
      icon: Home
    },
    {
      href: '/map-view',
      label: 'Map',
      icon: Map
    },
    {
      href: '/leaderboard',
      label: 'Leaderboard',
      icon: Trophy
    },
    {
      href: '/donate',
      label: 'Donate',
      icon: PlusCircle
    }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 px-3 py-2 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-gray-500 hover:text-gray-900'
                )}
              >
                <Icon className="w-6 h-6" />
                <span>{link.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
} 