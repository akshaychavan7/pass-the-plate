import { EnvironmentalImpactCalculator } from '@/components/environmental-impact-calculator'
import { Leaf } from 'lucide-react'

export default function ImpactCalculatorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto py-8 pb-24">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <EnvironmentalImpactCalculator />
        </div>
      </div>
    </main>
  )
} 