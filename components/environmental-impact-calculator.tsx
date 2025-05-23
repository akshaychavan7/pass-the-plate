'use client'

import React, { useState } from 'react'
import { FoodItem, FoodCategory, PackagingType, ImpactCalculationResult } from '../types/environmental-impact'
import { calculateEnvironmentalImpact } from '../lib/environmental-calculator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Label } from './ui/label'
import { Trash2, Plus, Calculator, Leaf, Info } from 'lucide-react'
import Image from 'next/image'

export function EnvironmentalImpactCalculator() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const [currentItem, setCurrentItem] = useState<FoodItem>({
    name: '',
    weight: 0,
    category: FoodCategory.PRODUCE,
    packaging: PackagingType.NONE,
    isLocal: false,
  })
  const [results, setResults] = useState<ImpactCalculationResult | null>(null)

  const handleAddItem = () => {
    if (currentItem.name && currentItem.weight > 0) {
      setFoodItems([...foodItems, currentItem])
      setCurrentItem({
        name: '',
        weight: 0,
        category: FoodCategory.PRODUCE,
        packaging: PackagingType.NONE,
        isLocal: false,
      })
    }
  }

  const handleRemoveItem = (index: number) => {
    setFoodItems(foodItems.filter((_, i) => i !== index))
    setResults(null)
  }

  const handleCalculate = () => {
    if (foodItems.length > 0) {
      const impact = calculateEnvironmentalImpact(foodItems)
      setResults(impact)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="shadow-lg border-green-100 overflow-hidden">
        <CardHeader className="relative h-48">
          <div className="absolute inset-0">
            <Image
              src="/images/plant.jpg"
              alt="Environmental Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-800/40 via-green-700/30 to-green-800/40" />
          </div>
          <div className="relative flex items-center justify-center gap-4 py-2">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg border border-white/30">
              <Leaf className="h-7 w-7 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-white drop-shadow-lg">
              Environmental Impact Calculator
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base text-green-800 font-medium">Food Item Name</Label>
                <Input
                  id="name"
                  value={currentItem.name}
                  onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                  placeholder="e.g., Organic Tomatoes"
                  className="h-11 border-green-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-base text-green-800 font-medium">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  min="0"
                  step="0.1"
                  value={currentItem.weight}
                  onChange={(e) => setCurrentItem({ ...currentItem, weight: parseFloat(e.target.value) })}
                  placeholder="e.g., 2.5"
                  className="h-11 border-green-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-base text-green-800 font-medium">Food Category</Label>
                <Select
                  value={currentItem.category}
                  onValueChange={(value) => setCurrentItem({ ...currentItem, category: value as FoodCategory })}
                >
                  <SelectTrigger className="h-11 border-green-200 focus:border-green-500 focus:ring-green-500">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(FoodCategory).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="packaging" className="text-base text-green-800 font-medium">Packaging Type</Label>
                <Select
                  value={currentItem.packaging}
                  onValueChange={(value) => setCurrentItem({ ...currentItem, packaging: value as PackagingType })}
                >
                  <SelectTrigger className="h-11 border-green-200 focus:border-green-500 focus:ring-green-500">
                    <SelectValue placeholder="Select packaging" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(PackagingType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-100">
              <input
                type="checkbox"
                id="isLocal"
                checked={currentItem.isLocal}
                onChange={(e) => setCurrentItem({ ...currentItem, isLocal: e.target.checked })}
                className="h-5 w-5 rounded border-green-300 text-green-600 focus:ring-green-500"
              />
              <Label htmlFor="isLocal" className="text-base text-green-800 font-medium">This is a locally sourced item</Label>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={handleAddItem}
                className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-base font-medium"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add Item
              </Button>
              <Button 
                onClick={handleCalculate} 
                disabled={foodItems.length === 0}
                className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-base font-medium"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate Impact
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {foodItems.length > 0 && (
        <Card className="shadow-lg border-green-100">
          <CardHeader className="bg-green-50 border-b border-green-100">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <CardTitle className="text-2xl text-green-800">Added Items</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {foodItems.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-green-800">{item.name}</p>
                    <p className="text-sm text-green-600">
                      {item.weight}kg • {item.category} • {item.packaging} • {item.isLocal ? 'Local' : 'Non-local'}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {results && (
        <Card className="shadow-lg border-green-100">
          <CardHeader className="bg-green-50 border-b border-green-100">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <CardTitle className="text-2xl text-green-800">Environmental Impact Results</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-green-800">Total Impact</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-600 font-medium">Carbon Footprint</p>
                    <p className="text-2xl font-bold text-blue-800">{results.totalImpact.carbonFootprint.toFixed(2)} kg CO2e</p>
                  </div>
                  <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-100">
                    <p className="text-sm text-cyan-600 font-medium">Water Usage</p>
                    <p className="text-2xl font-bold text-cyan-800">{results.totalImpact.waterUsage.toFixed(2)} liters</p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                    <p className="text-sm text-amber-600 font-medium">Packaging Waste</p>
                    <p className="text-2xl font-bold text-amber-800">{results.totalImpact.packagingWaste.toFixed(2)} kg</p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <p className="text-sm text-emerald-600 font-medium">Food Miles</p>
                    <p className="text-2xl font-bold text-emerald-800">{results.totalImpact.foodMiles.toFixed(2)} km</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-green-800">Recommendations</h3>
                <div className="space-y-3">
                  {results.recommendations.map((rec, index) => (
                    <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <p className="text-green-700">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 