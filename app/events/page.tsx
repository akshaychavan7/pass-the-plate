'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Plus, MapPin, Users, Calendar, Search, Heart, Share2, Clock } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Dummy data for events
const dummyEvents = [
  {
    id: '1',
    title: 'Community Food Drive',
    description: 'Join us for our monthly food drive to support local families in need. Bring non-perishable items and help make a difference.',
    location: 'Downtown Community Center',
    startDate: '2024-04-15T10:00:00',
    endDate: '2024-04-15T16:00:00',
    communityId: '1',
    communityName: 'Downtown Community',
    creatorId: '1',
    creatorName: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&auto=format&fit=crop',
    type: 'Food Drive',
    likes: 128,
    participants: [
      { id: '1', userId: '1', userName: 'John Doe', role: 'DONATOR', status: 'ATTENDING' },
      { id: '2', userId: '2', userName: 'Jane Smith', role: 'VOLUNTEER', status: 'ATTENDING' },
      { id: '3', userId: '3', userName: 'Mike Brown', role: 'RECIPIENT', status: 'INTERESTED' },
    ],
  },
  {
    id: '2',
    title: 'Fresh Produce Distribution',
    description: 'Weekly distribution of fresh fruits and vegetables from local farms. Open to all community members.',
    location: 'Westside Park',
    startDate: '2024-04-20T09:00:00',
    endDate: '2024-04-20T12:00:00',
    communityId: '2',
    communityName: 'Westside Community',
    creatorId: '2',
    creatorName: 'David Wilson',
    image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&auto=format&fit=crop',
    type: 'Distribution',
    likes: 89,
    participants: [
      { id: '4', userId: '4', userName: 'Emma Davis', role: 'VOLUNTEER', status: 'ATTENDING' },
      { id: '5', userId: '5', userName: 'Tom Harris', role: 'DONATOR', status: 'INTERESTED' },
    ],
  },
  {
    id: '3',
    title: 'Cooking Workshop',
    description: 'Learn how to prepare nutritious meals using donated ingredients. Perfect for families and individuals.',
    location: 'Community Kitchen',
    startDate: '2024-04-25T14:00:00',
    endDate: '2024-04-25T17:00:00',
    communityId: '3',
    communityName: 'Eastside Community',
    creatorId: '3',
    creatorName: 'Maria Garcia',
    image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&auto=format&fit=crop',
    type: 'Workshop',
    likes: 156,
    participants: [
      { id: '6', userId: '6', userName: 'Lisa Chen', role: 'VOLUNTEER', status: 'ATTENDING' },
      { id: '7', userId: '7', userName: 'Robert Kim', role: 'RECIPIENT', status: 'ATTENDING' },
    ],
  },
];

export default function EventsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [likedEvents, setLikedEvents] = useState<string[]>([]);

  const filteredEvents = dummyEvents.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLike = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleEventClick = (eventId: string) => {
    router.push(`/events/${eventId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with gradient background */}
      <div className="relative bg-gradient-to-b from-green-600 to-green-500 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-1">Events</h1>
              <p className="text-white/80 text-sm">Discover and join community events</p>
            </div>
            <Button 
              onClick={() => router.push('/events/create')}
              size="sm"
              className="bg-white text-green-600 hover:bg-white/90 shadow-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Event
            </Button>
          </div>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
            />
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvents.map((event) => (
            <Card 
              key={event.id} 
              className="group overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200"
              onClick={() => handleEventClick(event.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-600 text-white">
                    {event.type}
                  </Badge>
                  <Badge variant="outline" className="text-muted-foreground">
                    <Calendar className="w-3 h-3 mr-1" />
                    {format(new Date(event.startDate), 'MMM d')}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {event.description}
                </p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {format(new Date(event.startDate), 'h:mm a')}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {event.participants.length} attending
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-green-600 border-green-600 hover:bg-green-50"
                  >
                    View Details
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`h-8 w-8 p-0 transition-colors duration-200 ${
                        likedEvents.includes(event.id) ? 'text-red-500 hover:text-red-600' : ''
                      }`}
                      onClick={(e) => handleLike(event.id, e)}
                    >
                      <Heart className={`w-4 h-4 ${likedEvents.includes(event.id) ? 'fill-current' : ''}`} />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No events found</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
} 