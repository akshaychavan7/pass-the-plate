'use client'

import { Home, MapPin, Plus, Search, Users, Clock, Leaf, Heart, Trophy } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useState } from "react"
import { dummyFoods } from '@/lib/data'
import { FoodCard } from '@/components/FoodCard'
import { Input } from '@/components/ui/input'
import { Filter } from 'lucide-react'
import Image from 'next/image'

const impactStats = [
  { label: 'Meals Shared', value: '15M+' },
  { label: 'Food Saved', value: '60K tons' },
  { label: 'Community Savings', value: '$25M' },
  { label: 'Active Users', value: '100K+' },
]

const features = [
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Smart Pantry & Expiry Alerts',
    description: 'Get notifications as food approaches expiration, helping reduce waste and encourage timely sharing.',
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: 'Hyperlocal Food Listings',
    description: 'Find food near you with our location-based system, making it easy to connect with local resources.',
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'Inclusive Community Sharing',
    description: 'Everyone can participate—from students and families to local vendors and food banks.',
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: 'Cultural Relevance',
    description: 'Tag food by cultural significance, helping maintain dietary identity and cultural connection.',
  },
]

const featuredItems = [
  {
    id: 1,
    title: 'Fresh Organic Vegetables',
    location: 'Downtown',
    distance: '0.5 miles',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format',
    expiresIn: '2 days',
    culturalTags: ['Vegetarian', 'Vegan'],
  },
  {
    id: 2,
    title: 'Halal Bakery Items',
    location: 'Westside',
    distance: '1.2 miles',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format',
    expiresIn: '1 day',
    culturalTags: ['Halal', 'Kosher'],
  },
  {
    id: 3,
    title: 'Canned Goods',
    location: 'Eastside',
    distance: '0.8 miles',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=500&auto=format',
    expiresIn: '30 days',
    culturalTags: ['Non-perishable'],
  },
]

const recentActivities = [
  {
    id: 1,
    user: 'Sarah M.',
    action: 'shared',
    item: 'Fresh Fruits',
    time: '2 hours ago',
  },
  {
    id: 2,
    user: 'John D.',
    action: 'requested',
    item: 'Bread',
    time: '3 hours ago',
  },
  {
    id: 3,
    user: 'Community Center',
    action: 'donated',
    item: 'Non-perishable items',
    time: '5 hours ago',
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [
    "All",
    "Fruits",
    "Vegetables",
    "Dairy",
    "Bakery",
    "Canned Goods",
    "Other"
  ]

  const filteredFoods = dummyFoods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === null || selectedCategory === "All" || food.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image
          src="/images/karolina-kolodziejczak-1DNMBNQaQZE-unsplash.jpg"
          alt="Community Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Share Food, Share Joy
          </h1>
          <p className="text-lg md:text-xl text-green-50 max-w-2xl mb-12">
            Join our community to reduce food waste and help those in need. Every contribution makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl justify-center items-center">
            <Button 
              size="lg" 
              className="w-[250px] h-12 text-lg font-bold bg-white/15 hover:bg-white/25 text-white shadow-[0_8px_16px_rgb(0_0_0/0.1)] hover:shadow-[0_8px_16px_rgb(0_0_0/0.2)] transition-all duration-300 rounded-2xl px-6 border-2 border-white/30 hover:border-white/40 backdrop-blur-sm flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Start Sharing
            </Button>
            <Link href="/leaderboard" className="flex items-center justify-center">
              <Button 
                size="lg" 
                className="w-[250px] h-12 text-lg font-bold bg-white/15 hover:bg-white/25 text-white shadow-[0_8px_16px_rgb(0_0_0/0.1)] hover:shadow-[0_8px_16px_rgb(0_0_0/0.2)] transition-all duration-300 rounded-2xl px-6 border-2 border-white/30 hover:border-white/40 backdrop-blur-sm flex items-center justify-center"
              >
                <Trophy className="w-5 h-5 mr-2" />
                View Leaderboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-4 w-4" />
            <Input
              placeholder="Search for food items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 border-green-200 text-green-700 hover:bg-green-50">
              <MapPin className="h-4 w-4" />
              Location
            </Button>
            <Button variant="outline" className="gap-2 border-green-200 text-green-700 hover:bg-green-50">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap ${
                selectedCategory === category 
                  ? "bg-green-600 hover:bg-green-700 text-white" 
                  : "border-green-200 text-green-700 hover:bg-green-50"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </div>
    </div>
  )
}
