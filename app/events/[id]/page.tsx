'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { MapPin, Users, Calendar, Clock, ArrowLeft, Heart, Share2 } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

// Using the same dummy data for now
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
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop',
    type: 'Food Drive',
    participants: [
      { id: '1', userId: '1', userName: 'John Doe', role: 'DONATOR', status: 'ATTENDING' },
      { id: '2', userId: '2', userName: 'Jane Smith', role: 'VOLUNTEER', status: 'ATTENDING' },
      { id: '3', userId: '3', userName: 'Mike Brown', role: 'RECIPIENT', status: 'INTERESTED' },
    ],
  },
  // ... other events
];

export default function EventDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [event, setEvent] = useState(dummyEvents.find(e => e.id === params.id));
  const [isLiked, setIsLiked] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Event not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>
        </div>
      </div>

      {/* Event Details */}
      <div className="container mx-auto px-4 py-6">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-green-600 text-white">
                {event.type}
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                <Calendar className="w-3 h-3 mr-1" />
                {format(new Date(event.startDate), 'MMM d, yyyy')}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                {format(new Date(event.startDate), 'h:mm a')}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {event.location}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="w-4 h-4" />
                {event.participants.length} attending
              </div>
            </div>
            <p className="text-muted-foreground mb-6">{event.description}</p>
            <div className="flex items-center gap-2">
              <Button 
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => {/* Handle join event */}}
              >
                Join Event
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? 'text-red-500' : ''}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Participants */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Participants</h2>
            <div className="space-y-4">
              {event.participants.map((participant) => (
                <div key={participant.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                      {participant.userName[0]}
                    </div>
                    <div>
                      <p className="font-medium">{participant.userName}</p>
                      <p className="text-sm text-muted-foreground">{participant.role}</p>
                    </div>
                  </div>
                  <Badge variant={participant.status === 'ATTENDING' ? 'default' : 'secondary'}>
                    {participant.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
} 