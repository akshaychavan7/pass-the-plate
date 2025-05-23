"use client"

import { AddFoodForm } from '@/components/add-food-form'
import { Info, Leaf, Circle, ArrowLeft, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

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
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="hover:bg-green-100 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5 text-green-600" />
          </Button>
          <h1 className="text-2xl font-bold text-green-900">Back to Pantry</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 animate-slide-in-left">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-green-100/50 p-6 md:p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg transition-colors duration-300 hover:bg-green-200">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-900">Share Food</h2>
                  <p className="text-green-600/80 text-sm">Make a difference in your community</p>
                </div>
              </div>
              <p className="text-green-700/90 mb-8 leading-relaxed">
                Help reduce food waste by sharing your surplus food with those who need it. 
                Your contribution can make a significant impact on someone's life.
              </p>
              <AddFoodForm />
            </div>
          </div>

          <div className="lg:col-span-1 animate-slide-in-right">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100/50 p-6 sticky top-8 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg transition-colors duration-300 hover:bg-green-200">
                  <Sparkles className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 text-lg mb-4">Tips for Sharing</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 group transition-all duration-300 hover:translate-x-1">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors duration-300">
                        <span className="text-green-600 text-sm font-medium">1</span>
                      </div>
                      <p className="text-green-700/90 group-hover:text-green-800 transition-colors duration-300">Ensure food is properly stored and safe to eat</p>
                    </li>
                    <li className="flex items-start gap-3 group transition-all duration-300 hover:translate-x-1">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors duration-300">
                        <span className="text-green-600 text-sm font-medium">2</span>
                      </div>
                      <p className="text-green-700/90 group-hover:text-green-800 transition-colors duration-300">Be clear about pickup times and location</p>
                    </li>
                    <li className="flex items-start gap-3 group transition-all duration-300 hover:translate-x-1">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors duration-300">
                        <span className="text-green-600 text-sm font-medium">3</span>
                      </div>
                      <p className="text-green-700/90 group-hover:text-green-800 transition-colors duration-300">Include any dietary restrictions or allergens</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 