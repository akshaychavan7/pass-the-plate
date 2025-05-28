import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../context/theme-context'
import { NavigationProvider } from '../context/navigation-context'
import { TabBarWrapper } from '../components/tab-bar-wrapper'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pass the Plate',
  description: 'Share food with your community',
  icons: {
    icon: '/favicon.ico',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        inter.className,
        "min-h-screen bg-background text-foreground antialiased"
      )}>
        <ThemeProvider>
          <NavigationProvider>
            <main className="relative flex min-h-screen flex-col pb-16">
              {children}
            </main>
            <TabBarWrapper />
            <Toaster />
          </NavigationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
