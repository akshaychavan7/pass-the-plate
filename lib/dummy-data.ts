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
  {
    id: 'f4',
    title: 'Fresh Sushi Platter',
    description: 'Assorted sushi rolls and nigiri, made fresh today. Includes salmon, tuna, and vegetarian options.',
    quantity: 1,
    unit: 'platter',
    expiryDate: '2024-03-21',
    location: 'Downtown',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format',
    price: 24.99,
    isFree: false,
    status: 'available',
    createdAt: '2024-03-20T11:00:00Z',
    updatedAt: '2024-03-20T11:00:00Z',
    userId: 'u2',
    culturalTags: ['Japanese'],
    dietaryTags: ['Gluten-Free'],
    allergens: ['fish', 'soy'],
    distance: '0.3 miles',
  },
  {
    id: 'f5',
    title: 'Indian Curry Feast',
    description: 'Homemade Indian curry with rice and naan bread. Includes vegetarian and non-vegetarian options.',
    quantity: 4,
    unit: 'servings',
    expiryDate: '2024-03-22',
    location: 'Westside',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format',
    price: 18.99,
    isFree: false,
    status: 'available',
    createdAt: '2024-03-20T12:30:00Z',
    updatedAt: '2024-03-20T12:30:00Z',
    userId: 'u1',
    culturalTags: ['Indian'],
    dietaryTags: ['Vegetarian', 'Gluten-Free'],
    allergens: ['dairy'],
    distance: '0.7 miles',
  },
  {
    id: 'f6',
    title: 'Fresh Fruit Basket',
    description: 'Assorted seasonal fruits including apples, oranges, and berries. All organic and locally sourced.',
    quantity: 1,
    unit: 'basket',
    expiryDate: '2024-03-23',
    location: 'Eastside',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format',
    isFree: true,
    status: 'available',
    createdAt: '2024-03-20T13:15:00Z',
    updatedAt: '2024-03-20T13:15:00Z',
    userId: 'u3',
    culturalTags: ['Vegan'],
    dietaryTags: ['Organic', 'Gluten-Free'],
    distance: '1.0 miles',
  },
  {
    id: 'f7',
    title: 'Mediterranean Mezze Platter',
    description: 'Assortment of Mediterranean appetizers including hummus, falafel, and tabbouleh.',
    quantity: 1,
    unit: 'platter',
    expiryDate: '2024-03-21',
    location: 'Downtown',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format',
    price: 22.99,
    isFree: false,
    status: 'available',
    createdAt: '2024-03-20T14:00:00Z',
    updatedAt: '2024-03-20T14:00:00Z',
    userId: 'u2',
    culturalTags: ['Mediterranean'],
    dietaryTags: ['Vegetarian', 'Vegan'],
    allergens: ['sesame', 'nuts'],
    distance: '0.4 miles',
  },
  {
    id: 'f8',
    title: 'Fresh Baked Bread',
    description: 'Artisanal sourdough bread, baked fresh this morning. Perfect for sandwiches or toast.',
    quantity: 2,
    unit: 'loaves',
    expiryDate: '2024-03-22',
    location: 'Westside',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format',
    price: 8.99,
    isFree: false,
    status: 'available',
    createdAt: '2024-03-20T15:30:00Z',
    updatedAt: '2024-03-20T15:30:00Z',
    userId: 'u1',
    culturalTags: ['Bakery'],
    dietaryTags: ['Vegetarian'],
    allergens: ['wheat'],
    distance: '0.6 miles',
  },
  {
    id: 'f9',
    title: 'Thai Curry Kit',
    description: 'Complete Thai curry kit with fresh vegetables, coconut milk, and curry paste. Just add protein.',
    quantity: 1,
    unit: 'kit',
    expiryDate: '2024-03-23',
    location: 'Eastside',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format',
    price: 12.99,
    isFree: false,
    status: 'available',
    createdAt: '2024-03-20T16:45:00Z',
    updatedAt: '2024-03-20T16:45:00Z',
    userId: 'u3',
    culturalTags: ['Thai'],
    dietaryTags: ['Vegetarian', 'Gluten-Free'],
    allergens: ['coconut'],
    distance: '0.9 miles',
  },
  {
    id: 'f10',
    title: 'Fresh Pasta Bundle',
    description: 'Homemade pasta with sauce. Includes fettuccine, marinara sauce, and parmesan cheese.',
    quantity: 2,
    unit: 'servings',
    expiryDate: '2024-03-21',
    location: 'Downtown',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&auto=format',
    price: 16.99,
    isFree: false,
    status: 'available',
    createdAt: '2024-03-20T17:30:00Z',
    updatedAt: '2024-03-20T17:30:00Z',
    userId: 'u2',
    culturalTags: ['Italian'],
    dietaryTags: ['Vegetarian'],
    allergens: ['wheat', 'dairy'],
    distance: '0.2 miles',
  },
  {
    id: 'f11',
    title: 'Mexican Fiesta Pack',
    description: 'Complete Mexican meal kit with tortillas, salsa, beans, and rice. Just add your protein.',
    quantity: 1,
    unit: 'kit',
    expiryDate: '2024-03-22',
    location: 'Westside',
    image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=500&auto=format',
    price: 19.99,
    isFree: false,
    status: 'available',
    createdAt: '2024-03-20T18:15:00Z',
    updatedAt: '2024-03-20T18:15:00Z',
    userId: 'u1',
    culturalTags: ['Mexican'],
    dietaryTags: ['Vegetarian', 'Gluten-Free'],
    allergens: ['corn'],
    distance: '0.8 miles',
  },
  {
    id: 'f12',
    title: 'Fresh Salad Bowl',
    description: 'Large salad bowl with mixed greens, cherry tomatoes, avocado, and balsamic dressing.',
    quantity: 1,
    unit: 'bowl',
    expiryDate: '2024-03-21',
    location: 'Eastside',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format',
    isFree: true,
    status: 'available',
    createdAt: '2024-03-20T19:00:00Z',
    updatedAt: '2024-03-20T19:00:00Z',
    userId: 'u3',
    culturalTags: ['Vegan'],
    dietaryTags: ['Vegetarian', 'Gluten-Free'],
    distance: '0.5 miles',
  }
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