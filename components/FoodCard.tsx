"use client"

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Clock, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Food {
  id: string
  name: string
  description: string
  category: string
  quantity: string
  expiryDate: string
  location: string
  donor: {
    id: string
    name: string
    avatar: string
  }
  image: string
}

interface FoodCardProps {
  food: Food
}

export function FoodCard({ food }: FoodCardProps) {
  const daysUntilExpiry = Math.ceil(
    (new Date(food.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <Card className="overflow-hidden hover:shadow-md transition">
      <div className="aspect-[4/3] relative">
        <Image
          src={food.image}
          alt={food.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-medium text-foreground mb-1">{food.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{food.description}</p>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {food.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {food.location}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {daysUntilExpiry} days left
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={food.donor.avatar}
                alt={food.donor.name}
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <span className="text-sm text-muted-foreground">{food.donor.name}</span>
          </div>
          <Button asChild>
            <Link href={`/food/${food.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 