import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile | Pass the Plate',
  description: 'Manage your profile settings',
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 