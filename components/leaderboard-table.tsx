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
    <Card className="p-4 md:p-6">
      <div className="space-y-2">
        {dummyDonors.map((donor) => (
          <div
            key={donor.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {/* Rank */}
            <div className="w-6 h-6 flex items-center justify-center shrink-0">
              {donor.rank <= 3 ? (
                <Trophy className={`w-5 h-5 ${
                  donor.rank === 1 ? 'text-yellow-500' :
                  donor.rank === 2 ? 'text-gray-400' :
                  'text-amber-600'
                }`} />
              ) : (
                <span className="text-gray-500 font-medium text-sm">{donor.rank}</span>
              )}
            </div>

            {/* Avatar */}
            <Avatar className="w-10 h-10 shrink-0">
              <AvatarImage src={donor.avatar} alt={donor.name} />
              <AvatarFallback>{donor.name.slice(0, 2)}</AvatarFallback>
            </Avatar>

            {/* Name and Stats */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold truncate">{donor.name}</h3>
                <Badge variant="secondary" className="flex items-center gap-1 shrink-0">
                  <Star className="w-3 h-3" />
                  {donor.rating}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                <span className="shrink-0">{donor.donations} donations</span>
                <span className="shrink-0">•</span>
                <span className="shrink-0">{donor.itemsDonated} items</span>
                <span className="shrink-0">•</span>
                <span className="flex items-center gap-1 shrink-0">
                  <TrendingUp className="w-3 h-3" />
                  {donor.streak} day streak
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
} 