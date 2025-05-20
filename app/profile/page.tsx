import { Metadata } from 'next'
import { ProfileForm } from '@/components/profile-form'

export const metadata: Metadata = {
  title: 'Profile | Pass the Plate',
  description: 'Manage your profile settings',
}

export default function ProfilePage() {
  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8">
      <div className="max-w-2xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        <ProfileForm />
      </div>
    </main>
  )
} 