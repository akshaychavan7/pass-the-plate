import { NextResponse } from 'next/server';
import { getEvents, createEvent } from '@/lib/events';

export async function GET() {
  try {
    const events = getEvents();
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, location, startDate, endDate, communityId, communityName, creatorId, creatorName } = body;

    // Validate required fields
    if (!title || !description || !location || !startDate || !endDate || !communityId || !communityName || !creatorId || !creatorName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const event = createEvent({
      title,
      description,
      location,
      startDate,
      endDate,
      communityId,
      communityName,
      creatorId,
      creatorName,
      participants: [],
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
} 