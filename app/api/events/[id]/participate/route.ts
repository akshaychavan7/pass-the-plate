import { NextResponse } from 'next/server';
import { updateParticipation } from '@/lib/events';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { userId, userName, role, status } = body;

    if (!userId || !userName || !role || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const updatedEvent = updateParticipation(
      params.id,
      userId,
      userName,
      role,
      status
    );

    if (!updatedEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error('Error updating participation:', error);
    return NextResponse.json(
      { error: 'Failed to update participation' },
      { status: 500 }
    );
  }
} 