import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Smart Pantry | Pass the Plate',
  description: 'Manage your shared food items',
}

export default function SmartPantryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 