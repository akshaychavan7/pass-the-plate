'use client'

import { Home, MapPin, Plus, Search, Users, Clock, Leaf, Heart, Trophy } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

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
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-white" />
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Pass The Plate
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transforming food accessibility. Strengthening community connections. Reducing waste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Link href="/add-food" className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Share Food
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                <Link href="/map-view" className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Find Food
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center p-4">
                <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-12 text-gray-900">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg">
                <div className="text-green-600 mb-3">{feature.icon}</div>
                <h3 className="font-medium text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Featured Food Items</h2>
            <Button asChild variant="ghost" className="text-green-600">
              <Link href="/map-view">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <Link key={item.id} href={`/item/${item.id}`} className="block">
                <Card className="overflow-hidden hover:shadow-md transition">
                  <div className="aspect-[4/3] relative">
                    <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
                    <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 rounded text-sm text-gray-600">
                      {item.distance}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      {item.location}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.culturalTags.map((tag, index) => (
                        <span key={index} className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-green-600">
                      Expires in {item.expiresIn}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activities */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-8 text-gray-900">Recent Activities</h2>
          <div className="max-w-2xl">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center p-4 bg-white rounded-lg mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium">
                  {activity.user[0]}
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span> {activity.action} {activity.item}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Link href="/leaderboard" className="block">
            <Card className="p-6 bg-white border-2 border-green-100 hover:border-green-200 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-50 rounded-full">
                    <Trophy className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Top Donators</h3>
                    <p className="text-sm text-gray-600">See who's making the biggest impact in our community</p>
                  </div>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  View Leaderboard
                </Button>
              </div>
            </Card>
          </Link>
        </div>
      </section>
    </main>
  )
}
