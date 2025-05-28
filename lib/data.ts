export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  bio: string;
  verified: boolean;
  stats: {
    itemsShared: number;
    itemsReceived: number;
    communityPoints: number;
  };
  preferences: {
    dietaryRestrictions: string[];
    favoriteCategories: string[];
  };
}

export interface PantryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  condition: 'fresh' | 'good' | 'expiring' | 'expired';
  image: string;
  description: string;
  location: string;
  isAvailable: boolean;
}

export const dummyUsers: UserProfile[] = [
  {
    id: '1',
    name: 'Akshay Chavan',
    email: 'akshaychavan.kkwedu@gmail.com',
    avatar: '/akshay.jpeg',
    location: 'Boston, MA',
    bio: 'Passionate about reducing food waste and building community through food sharing.',
    verified: true,
    stats: {
      itemsShared: 45,
      itemsReceived: 12,
      communityPoints: 1250,
    },
    preferences: {
      dietaryRestrictions: ['Vegetarian'],
      favoriteCategories: ['Produce', 'Bakery'],
    },
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'mchen@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    location: 'San Francisco, CA',
    bio: 'Love cooking and sharing surplus ingredients with neighbors.',
    verified: false,
    stats: {
      itemsShared: 28,
      itemsReceived: 15,
      communityPoints: 980,
    },
    preferences: {
      dietaryRestrictions: [],
      favoriteCategories: ['Canned Goods', 'Spices'],
    },
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    email: 'emma.r@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    location: 'San Francisco, CA',
    bio: 'Food enthusiast and community organizer. Always happy to share!',
    verified: true,
    stats: {
      itemsShared: 62,
      itemsReceived: 8,
      communityPoints: 2100,
    },
    preferences: {
      dietaryRestrictions: ['Gluten-Free'],
      favoriteCategories: ['Organic Produce', 'Dairy'],
    },
  },
];

export const dummyPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Organic Bananas',
    category: 'Produce',
    quantity: 6,
    unit: 'pieces',
    expiryDate: '2024-03-25',
    condition: 'fresh',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500',
    description: 'Organic bananas, slightly green. Perfect for smoothies or baking.',
    location: 'Kitchen Counter',
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Whole Grain Bread',
    category: 'Bakery',
    quantity: 1,
    unit: 'loaf',
    expiryDate: '2024-03-23',
    condition: 'expiring',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500',
    description: 'Fresh whole grain bread, needs to be consumed soon.',
    location: 'Pantry',
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Canned Chickpeas',
    category: 'Canned Goods',
    quantity: 4,
    unit: 'cans',
    expiryDate: '2025-06-15',
    condition: 'good',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500',
    description: 'Organic chickpeas in water. Great for salads and curries.',
    location: 'Pantry Shelf',
    isAvailable: true,
  },
  {
    id: '4',
    name: 'Greek Yogurt',
    category: 'Dairy',
    quantity: 2,
    unit: 'containers',
    expiryDate: '2024-03-22',
    condition: 'expiring',
    image: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?w=500',
    description: 'Plain Greek yogurt, high in protein.',
    location: 'Refrigerator',
    isAvailable: true,
  },
  {
    id: '5',
    name: 'Fresh Spinach',
    category: 'Produce',
    quantity: 1,
    unit: 'bag',
    expiryDate: '2024-03-21',
    condition: 'expiring',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500',
    description: 'Organic baby spinach, needs to be used soon.',
    location: 'Refrigerator',
    isAvailable: true,
  },
];

export const dummyFoods = [
  {
    id: "1",
    name: "Organic Bananas",
    description: "Fresh organic bananas, slightly ripe. Perfect for smoothies or baking.",
    category: "Fruits",
    quantity: "2 bunches",
    expiryDate: "2024-03-20",
    location: "San Francisco, CA",
    donor: {
      id: "1",
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
    },
    image: "/images/fruits.jpg"
  },
  {
    id: "2",
    name: "Fresh Bread",
    description: "Artisanal sourdough bread, baked today. Still warm!",
    category: "Bakery",
    quantity: "1 loaf",
    expiryDate: "2024-03-18",
    location: "San Francisco, CA",
    donor: {
      id: "1",
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
    },
    image: "/images/bowl.jpg"
  },
  {
    id: "3",
    name: "Mixed Vegetables",
    description: "Assorted fresh vegetables including carrots, broccoli, and bell peppers.",
    category: "Vegetables",
    quantity: "1 bag",
    expiryDate: "2024-03-19",
    location: "San Francisco, CA",
    donor: {
      id: "1",
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
    },
    image: "/images/all vegetables.jpg"
  }
] 