import { Metadata } from 'next'
import { dummyUsers } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Settings, Share2, Heart, Award, Leaf, Users, Gift, Clock, Star, Calendar, MapPin, Mail } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Profile | Pass the Plate',
  description: 'Manage your profile settings',
}

export default function ProfilePage() {
  const user = dummyUsers[0]

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <Card className="relative overflow-hidden border-green-200">
          <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50" />
          <div className="absolute inset-0 bg-[url('/leaf-pattern.png')] opacity-5" />
          <CardHeader className="relative p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative flex-shrink-0">
                <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white shadow-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl bg-green-100 text-green-800">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
                  <Leaf className="h-4 w-4" />
                </div>
              </div>
              <div className="space-y-3 flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl md:text-3xl text-green-900">{user.name}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="border-green-200 text-green-700">
                        <Star className="h-3 w-3 mr-1" />
                        Community Leader
                      </Badge>
                      <Badge variant="outline" className="border-green-200 text-green-700">
                        <Calendar className="h-3 w-3 mr-1" />
                        Member since 2024
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-green-700">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {user.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </div>
                </div>
                <p className="text-sm text-green-800 line-clamp-2">{user.bio}</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="gap-2 border-green-200 text-green-700 hover:bg-green-50">
                    <Heart className="h-4 w-4" />
                    Follow
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 border-green-200 text-green-700 hover:bg-green-50">
                    <Users className="h-4 w-4" />
                    View Community
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-900">
                <Award className="h-5 w-5 text-green-600" />
                Community Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-green-600" />
                    <span className="text-green-800">Items Shared</span>
                  </div>
                  <span className="text-2xl font-bold text-green-700">{user.stats.itemsShared}</span>
                </div>
                <Progress value={75} className="bg-green-100" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <span className="text-green-800">Items Received</span>
                  </div>
                  <span className="text-2xl font-bold text-green-700">{user.stats.itemsReceived}</span>
                </div>
                <Progress value={45} className="bg-green-100" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    <span className="text-green-800">Community Points</span>
                  </div>
                  <span className="text-2xl font-bold text-green-700">{user.stats.communityPoints}</span>
                </div>
                <Progress value={90} className="bg-green-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-900">
                <Clock className="h-5 w-5 text-green-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Gift className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-900">Shared Organic Bananas</p>
                    <p className="text-xs text-green-600">2 hours ago</p>
                  </div>
                </div>
                <Separator className="bg-green-100" />
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-900">Received Fresh Bread</p>
                    <p className="text-xs text-green-600">Yesterday</p>
                  </div>
                </div>
                <Separator className="bg-green-100" />
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Star className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-900">Earned Community Leader Badge</p>
                    <p className="text-xs text-green-600">3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-green-900">Preferences</CardTitle>
            <CardDescription className="text-green-600">
              Customize your food sharing experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3 text-green-800">Dietary Restrictions</h3>
              <div className="flex flex-wrap gap-2">
                {user.preferences.dietaryRestrictions.map((restriction) => (
                  <Badge key={restriction} variant="secondary" className="px-3 py-1 bg-green-100 text-green-800 hover:bg-green-200">
                    {restriction}
                  </Badge>
                ))}
                {user.preferences.dietaryRestrictions.length === 0 && (
                  <p className="text-sm text-green-600">None specified</p>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-green-800">Favorite Categories</h3>
              <div className="flex flex-wrap gap-2">
                {user.preferences.favoriteCategories.map((category) => (
                  <Badge key={category} variant="outline" className="px-3 py-1 border-green-200 text-green-700">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 