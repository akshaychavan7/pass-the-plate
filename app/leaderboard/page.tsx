'use client'

import { LeaderboardTable } from '@/components/leaderboard-table'
import { Trophy, Users, Clock, Heart } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-12 pb-24">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-block p-2 px-4 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-2">
              Community Impact
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Top Donators
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Celebrating our most generous food donors who are making a difference in our community
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-white/50 backdrop-blur-sm border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Donations</p>
                  <p className="text-2xl font-bold text-green-900">1,234</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-white/50 backdrop-blur-sm border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Donors</p>
                  <p className="text-2xl font-bold text-green-900">256</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-white/50 backdrop-blur-sm border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg. Response Time</p>
                  <p className="text-2xl font-bold text-green-900">15m</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-white/50 backdrop-blur-sm border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-xl">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">People Helped</p>
                  <p className="text-2xl font-bold text-green-900">3,456</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Leaderboard Table */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-green-50/50 to-transparent rounded-3xl" />
            <LeaderboardTable />
          </div>
        </div>
      </div>
    </div>
  )
} 