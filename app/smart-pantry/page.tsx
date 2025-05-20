import { Metadata } from 'next'
import { SmartPantryList } from '@/components/smart-pantry-list'

export const metadata: Metadata = {
  title: 'Smart Pantry | Pass the Plate',
  description: 'Manage your shared food items',
}

export default function SmartPantryPage() {
  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8">Smart Pantry</h1>
        <SmartPantryList />
      </div>
    </main>
  )
} 