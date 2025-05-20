export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  location: string
  rating: number
  joinDate: string
  bio?: string
  dietaryPreferences: string[]
  culturalPreferences: string[]
  totalShared: number
  totalReceived: number
}

export interface FoodItem {
  id: string
  title: string
  description: string
  quantity: number
  unit: string
  expiryDate: string
  location: string
  image?: string
  price?: number
  isFree: boolean
  status: 'available' | 'reserved' | 'claimed'
  createdAt: string
  updatedAt: string
  userId: string
  culturalTags: string[]
  dietaryTags: string[]
  allergens?: string[]
  pickupInstructions?: string
  distance?: string
}

export interface Activity {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  action: 'shared' | 'requested' | 'donated' | 'received'
  itemId: string
  itemTitle: string
  timestamp: string
}

export interface CommunityEvent {
  id: string
  title: string
  description: string
  date: string
  location: string
  organizer: string
  image?: string
  participants: number
  maxParticipants?: number
  type: 'food-drive' | 'cooking-class' | 'community-meal' | 'workshop'
}

// Dummy Users
export const users: User[] = [
  {
    id: 'u1',
    name: 'Sarah Martinez',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format',
    location: 'Downtown',
    rating: 4.8,
    joinDate: '2023-01-15',
    bio: 'Passionate about reducing food waste and helping my community.',
    dietaryPreferences: ['Vegetarian', 'Gluten-Free'],
    culturalPreferences: ['Mediterranean', 'Latin'],
    totalShared: 45,
    totalReceived: 12,
  },
  {
    id: 'u2',
    name: 'John Chen',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format',
    location: 'Westside',
    rating: 4.9,
    joinDate: '2023-02-20',
    bio: 'Local restaurant owner committed to food sustainability.',
    dietaryPreferences: ['Halal'],
    culturalPreferences: ['Asian', 'Middle Eastern'],
    totalShared: 120,
    totalReceived: 5,
  },
  {
    id: 'u3',
    name: 'Maria Rodriguez',
    email: 'maria@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format',
    location: 'Eastside',
    rating: 4.7,
    joinDate: '2023-03-10',
    bio: 'Community organizer and food justice advocate.',
    dietaryPreferences: ['Vegan'],
    culturalPreferences: ['Latin', 'Mediterranean'],
    totalShared: 78,
    totalReceived: 23,
  },
]

// Dummy Food Items
export const foodItems: FoodItem[] = [
  {
    id: 'f1',
    title: 'Fresh Organic Vegetables',
    description: 'Assorted organic vegetables from local farm. Includes tomatoes, cucumbers, and bell peppers.',
    quantity: 5,
    unit: 'kg',
    expiryDate: '2024-03-25',
    location: 'Downtown',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format',
    isFree: true,
    status: 'available',
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2024-03-20T10:00:00Z',
    userId: 'u1',
    culturalTags: ['Vegetarian', 'Vegan'],
    dietaryTags: ['Organic', 'Non-GMO'],
    distance: '0.5 miles',
  },
  {
    id: 'f2',
    title: 'Halal Bakery Items',
    description: 'Freshly baked bread and pastries from local halal bakery. Includes pita bread and baklava.',
    quantity: 20,
    unit: 'pieces',
    expiryDate: '2024-03-24',
    location: 'Westside',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format',
    price: 15.99,
    isFree: false,
    status: 'available',
    createdAt: '2024-03-20T09:30:00Z',
    updatedAt: '2024-03-20T09:30:00Z',
    userId: 'u2',
    culturalTags: ['Halal', 'Middle Eastern'],
    dietaryTags: ['Vegetarian'],
    allergens: ['wheat', 'nuts'],
    distance: '1.2 miles',
  },
  {
    id: 'f3',
    title: 'Canned Goods Collection',
    description: 'Various canned goods including beans, vegetables, and soups. All within expiry date.',
    quantity: 30,
    unit: 'cans',
    expiryDate: '2024-12-31',
    location: 'Eastside',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=500&auto=format',
    isFree: true,
    status: 'available',
    createdAt: '2024-03-19T15:45:00Z',
    updatedAt: '2024-03-19T15:45:00Z',
    userId: 'u3',
    culturalTags: ['Non-perishable'],
    dietaryTags: ['Low-Sodium'],
    distance: '0.8 miles',
  },
]

// Dummy Activities
export const activities: Activity[] = [
  {
    id: 'a1',
    userId: 'u1',
    userName: 'Sarah M.',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format',
    action: 'shared',
    itemId: 'f1',
    itemTitle: 'Fresh Organic Vegetables',
    timestamp: '2024-03-20T10:00:00Z',
  },
  {
    id: 'a2',
    userId: 'u2',
    userName: 'John C.',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format',
    action: 'requested',
    itemId: 'f2',
    itemTitle: 'Halal Bakery Items',
    timestamp: '2024-03-20T09:30:00Z',
  },
  {
    id: 'a3',
    userId: 'u3',
    userName: 'Maria R.',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format',
    action: 'donated',
    itemId: 'f3',
    itemTitle: 'Canned Goods Collection',
    timestamp: '2024-03-19T15:45:00Z',
  },
]

// Dummy Community Events
export const communityEvents: CommunityEvent[] = [
  {
    id: 'e1',
    title: 'Community Food Drive',
    description: 'Join us for our monthly food drive to support local families in need.',
    date: '2024-04-01',
    location: 'Downtown Community Center',
    organizer: 'Sarah Martinez',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=500&auto=format',
    participants: 45,
    maxParticipants: 100,
    type: 'food-drive',
  },
  {
    id: 'e2',
    title: 'Cultural Cooking Workshop',
    description: 'Learn to cook traditional dishes from different cultures while reducing food waste.',
    date: '2024-04-15',
    location: 'Westside Community Kitchen',
    organizer: 'John Chen',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&auto=format',
    participants: 20,
    maxParticipants: 30,
    type: 'cooking-class',
  },
  {
    id: 'e3',
    title: 'Community Meal Sharing',
    description: 'Monthly community potluck featuring dishes made from rescued food.',
    date: '2024-04-20',
    location: 'Eastside Park',
    organizer: 'Maria Rodriguez',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format',
    participants: 60,
    maxParticipants: 80,
    type: 'community-meal',
  },
]

// Helper functions
export const getFoodItemsByUser = (userId: string): FoodItem[] => {
  return foodItems.filter(item => item.userId === userId)
}

export const getActivitiesByUser = (userId: string): Activity[] => {
  return activities.filter(activity => activity.userId === userId)
}

export const getFoodItemsByTags = (tags: string[]): FoodItem[] => {
  return foodItems.filter(item => 
    tags.some(tag => 
      item.culturalTags.includes(tag) || item.dietaryTags.includes(tag)
    )
  )
}

export const getUpcomingEvents = (): CommunityEvent[] => {
  const now = new Date()
  return communityEvents
    .filter(event => new Date(event.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export const getRecentActivities = (limit: number = 5): Activity[] => {
  return activities
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit)
} 