import { Metadata } from 'next'
import { AddFoodForm } from '@/components/add-food-form'
import { Info } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Share Food | Pass the Plate',
  description: 'Share your food with the community',
}

export default function AddFoodPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <div className="flex items-start gap-4 mb-8">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">Share Food</h1>
              <p className="text-gray-600">
                Help reduce food waste by sharing your surplus food with those who need it.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">Tips for Sharing</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Ensure food is properly stored and safe to eat</li>
                    <li>• Be clear about pickup times and location</li>
                    <li>• Include any dietary restrictions or allergens</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <AddFoodForm />
        </div>
      </div>
    </main>
  )
} 