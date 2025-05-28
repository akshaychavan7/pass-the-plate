'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

interface FoodItem {
  id: string
  title: string
  description: string
  quantity: string
  expiryDate: string
  location: string
}

export function SmartPantryList() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const { toast } = useToast()

  const handleDelete = async (id: string) => {
    try {
      // TODO: Implement API call to delete food item
      setFoodItems(items => items.filter(item => item.id !== id))
      toast({
        title: 'Success!',
        description: 'Food item has been removed.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove food item. Please try again.',
        variant: 'destructive',
      })
    }
  }

  if (foodItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No food items in your pantry yet.</p>
        <Button
          variant="link"
          onClick={() => window.location.href = '/add-food'}
          className="mt-4"
        >
          Share some food
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {foodItems.map((item) => (
        <Card key={item.id} className="p-4">
          <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
          <p className="text-gray-600 mb-2">{item.description}</p>
          <div className="text-sm text-gray-500 space-y-1">
            <p>Quantity: {item.quantity}</p>
            <p>Expires: {new Date(item.expiryDate).toLocaleDateString()}</p>
            <p>Location: {item.location}</p>
          </div>
          <Button
            variant="destructive"
            size="sm"
            className="mt-4"
            onClick={() => handleDelete(item.id)}
          >
            Remove
          </Button>
        </Card>
      ))}
    </div>
  )
} 