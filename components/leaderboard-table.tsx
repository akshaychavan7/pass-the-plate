'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Trophy, Star, TrendingUp } from 'lucide-react'

interface Donor {
  id: string
  name: string
  avatar: string
  donations: number
  itemsDonated: number
  rating: number
  streak: number
  rank: number
}

const dummyDonors: Donor[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    donations: 45,
    itemsDonated: 89,
    rating: 4.9,
    streak: 12,
    rank: 1
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    donations: 38,
    itemsDonated: 72,
    rating: 4.8,
    streak: 8,
    rank: 2
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    donations: 35,
    itemsDonated: 65,
    rating: 4.9,
    streak: 10,
    rank: 3
  },
  {
    id: '4',
    name: 'David Kim',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    donations: 32,
    itemsDonated: 58,
    rating: 4.7,
    streak: 6,
    rank: 4
  },
  {
    id: '5',
    name: 'Lisa Patel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    donations: 30,
    itemsDonated: 55,
    rating: 4.8,
    streak: 7,
    rank: 5
  },
  {
    id: '6',
    name: 'James Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    donations: 28,
    itemsDonated: 50,
    rating: 4.6,
    streak: 5,
    rank: 6
  },
  {
    id: '7',
    name: 'Maria Garcia',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    donations: 25,
    itemsDonated: 45,
    rating: 4.7,
    streak: 4,
    rank: 7
  },
  {
    id: '8',
    name: 'Alex Thompson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    donations: 22,
    itemsDonated: 40,
    rating: 4.5,
    streak: 3,
    rank: 8
  },
  {
    id: '9',
    name: 'Sophie Lee',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
    donations: 20,
    itemsDonated: 35,
    rating: 4.6,
    streak: 2,
    rank: 9
  },
  {
    id: '10',
    name: 'Ryan Brown',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan',
    donations: 18,
    itemsDonated: 30,
    rating: 4.4,
    streak: 1,
    rank: 10
  }
]

export function LeaderboardTable() {
  return (
    <Card className="relative overflow-hidden border-green-100 bg-white/80 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50" />
      <div className="relative p-6">
        <div className="space-y-4">
          {dummyDonors.map((donor) => (
            <div
              key={donor.id}
              className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white/80 transition-all duration-300 border border-transparent hover:border-green-100 hover:shadow-sm"
            >
              {/* Rank */}
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                {donor.rank <= 3 ? (
                  <div className="relative">
                    <Trophy className={`w-6 h-6 ${
                      donor.rank === 1 ? 'text-yellow-500' :
                      donor.rank === 2 ? 'text-gray-400' :
                      'text-amber-600'
                    }`} />
                    {donor.rank === 1 && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />
                    )}
                  </div>
                ) : (
                  <span className="text-gray-500 font-medium text-sm group-hover:text-green-600 transition-colors">
                    {donor.rank}
                  </span>
                )}
              </div>

              {/* Avatar */}
              <Avatar className="w-12 h-12 shrink-0 ring-2 ring-green-100 group-hover:ring-green-200 transition-all duration-300">
                <AvatarImage src={donor.avatar} alt={donor.name} />
                <AvatarFallback className="bg-green-100 text-green-800">
                  {donor.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              {/* Name and Stats */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-green-900 truncate group-hover:text-green-700 transition-colors">
                    {donor.name}
                  </h3>
                  <Badge variant="secondary" className="flex items-center gap-1 shrink-0 bg-green-100 text-green-800 hover:bg-green-200">
                    <Star className="w-3 h-3" />
                    {donor.rating}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-sm text-green-600 flex-wrap mt-1">
                  <span className="shrink-0 flex items-center gap-1">
                    <span className="font-medium">{donor.donations}</span> donations
                  </span>
                  <span className="shrink-0 text-green-300">•</span>
                  <span className="shrink-0 flex items-center gap-1">
                    <span className="font-medium">{donor.itemsDonated}</span> items
                  </span>
                  <span className="shrink-0 text-green-300">•</span>
                  <span className="flex items-center gap-1 shrink-0">
                    <TrendingUp className="w-3 h-3" />
                    <span className="font-medium">{donor.streak}</span> day streak
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="hidden md:block w-32 shrink-0">
                <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${(donor.donations / dummyDonors[0].donations) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
} 