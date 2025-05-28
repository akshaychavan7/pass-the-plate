import fs from 'fs';
import path from 'path';

export type EventRole = 'DONATOR' | 'VOLUNTEER' | 'RECIPIENT';
export type EventAttendanceStatus = 'ATTENDING' | 'INTERESTED' | 'NOT_ATTENDING';

export interface EventParticipant {
  id: string;
  userId: string;
  userName: string;
  role: EventRole;
  status: EventAttendanceStatus;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  communityId: string;
  communityName: string;
  creatorId: string;
  creatorName: string;
  participants: EventParticipant[];
  createdAt: string;
  updatedAt: string;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'events.json');

// Ensure the data directory exists
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'));
}

// Initialize the events file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

export function getEvents(): Event[] {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

export function getEventById(id: string): Event | null {
  const events = getEvents();
  return events.find(event => event.id === id) || null;
}

export function createEvent(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Event {
  const events = getEvents();
  const newEvent: Event = {
    ...event,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  events.push(newEvent);
  fs.writeFileSync(DATA_FILE, JSON.stringify(events, null, 2));
  return newEvent;
}

export function updateEvent(id: string, updates: Partial<Event>): Event | null {
  const events = getEvents();
  const index = events.findIndex(event => event.id === id);
  
  if (index === -1) return null;
  
  const updatedEvent = {
    ...events[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  events[index] = updatedEvent;
  fs.writeFileSync(DATA_FILE, JSON.stringify(events, null, 2));
  return updatedEvent;
}

export function deleteEvent(id: string): boolean {
  const events = getEvents();
  const filteredEvents = events.filter(event => event.id !== id);
  
  if (filteredEvents.length === events.length) return false;
  
  fs.writeFileSync(DATA_FILE, JSON.stringify(filteredEvents, null, 2));
  return true;
}

export function updateParticipation(
  eventId: string,
  userId: string,
  userName: string,
  role: EventRole,
  status: EventAttendanceStatus
): Event | null {
  const events = getEvents();
  const index = events.findIndex(event => event.id === eventId);
  
  if (index === -1) return null;
  
  const event = events[index];
  const participantIndex = event.participants.findIndex(p => p.userId === userId);
  
  const participant: EventParticipant = {
    id: Math.random().toString(36).substr(2, 9),
    userId,
    userName,
    role,
    status,
  };
  
  if (participantIndex === -1) {
    event.participants.push(participant);
  } else {
    event.participants[participantIndex] = participant;
  }
  
  event.updatedAt = new Date().toISOString();
  events[index] = event;
  
  fs.writeFileSync(DATA_FILE, JSON.stringify(events, null, 2));
  return event;
} 