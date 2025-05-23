"use client"

import { dummyPantryItems } from '@/lib/data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Search, Filter, Clock, MapPin, Leaf, Share2, Edit2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SmartPantryPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center px-6 py-8 bg-gradient-to-b from-green-50 to-white rounded-2xl">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-green-900">Smart Pantry</h1>
            <p className="text-green-700">Share food, reduce waste, build community</p>
          </div>
          <Button 
            className="gap-2 bg-green-600 hover:bg-green-700 text-white"
            onClick={() => router.push('/add-food')}
          >
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
        </div>

        <Card className="border-green-100">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
                <Input 
                  placeholder="Search items..." 
                  className="pl-9 border-green-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] border-green-200">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="produce">Produce</SelectItem>
                  <SelectItem value="dairy">Dairy</SelectItem>
                  <SelectItem value="bakery">Bakery</SelectItem>
                  <SelectItem value="canned">Canned Goods</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] border-green-200">
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Conditions</SelectItem>
                  <SelectItem value="fresh">Fresh</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="expiring">Expiring</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dummyPantryItems.map((item) => (
                <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-shadow border-green-100">
                  <div className="relative h-48 w-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge
                      variant={
                        item.condition === 'fresh'
                          ? 'default'
                          : item.condition === 'good'
                          ? 'secondary'
                          : item.condition === 'expiring'
                          ? 'outline'
                          : 'destructive'
                      }
                      className={`absolute top-4 right-4 ${
                        item.condition === 'fresh'
                          ? 'bg-green-600'
                          : item.condition === 'good'
                          ? 'bg-green-100 text-green-800'
                          : item.condition === 'expiring'
                          ? 'border-green-200 text-green-700'
                          : ''
                      }`}
                    >
                      {item.condition}
                    </Badge>
                    {item.category === 'Produce' && (
                      <div className="absolute top-4 left-4 bg-green-600 text-white rounded-full p-2 shadow-lg">
                        <Leaf className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-green-900">{item.name}</h3>
                        <p className="text-sm text-green-600">{item.category}</p>
                      </div>
                      <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                        {item.quantity} {item.unit}
                      </Badge>
                    </div>
                    <p className="text-sm text-green-800 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center text-sm text-green-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Expires: {new Date(item.expiryDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 border-green-200 text-green-700 hover:bg-green-50">
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="default" size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 