import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Share Food | Pass the Plate',
  description: 'Share your food with the community',
}

export default function AddFoodLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 