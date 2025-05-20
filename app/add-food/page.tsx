import { Metadata } from 'next'
import { AddFoodForm } from '@/components/add-food-form'
import { Info, Leaf, Circle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Share Food | Pass the Plate',
  description: 'Share your food with the community',
}

function Logo() {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="relative">
        <Circle className="w-16 h-16 text-green-600" strokeWidth={1.5} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Leaf className="w-8 h-8 text-green-600" />
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-green-600/20 rounded-full" />
      </div>
      <div className="ml-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
          Pass the Plate
        </h2>
        <p className="text-sm text-green-600/80">Share Food, Share Joy</p>
      </div>
    </div>
  )
}

export default function AddFoodPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Logo />
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Leaf className="w-6 h-6 text-green-600" />
                <h1 className="text-3xl font-bold text-green-900">Share Food</h1>
              </div>
              <p className="text-green-700/90 text-lg">
                Help reduce food waste by sharing your surplus food with those who need it.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-100/50">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Tips for Sharing</h3>
                  <ul className="text-sm text-green-700/90 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      <span>Ensure food is properly stored and safe to eat</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      <span>Be clear about pickup times and location</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      <span>Include any dietary restrictions or allergens</span>
                    </li>
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