'use client'

import { Home, MapPin, Plus, Search, Users, Clock, Leaf, Heart, Trophy, Calculator, Globe, Utensils, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useState } from "react"
import { dummyFoods } from '@/lib/data'
import { FoodCard } from '@/components/FoodCard'
import { Input } from '@/components/ui/input'
import { Filter } from 'lucide-react'
import Image from 'next/image'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { MessageSquare } from 'lucide-react'

const impactStats = [
  { label: 'Meals Shared', value: '15M+' },
  { label: 'Food Saved', value: '60K tons' },
  { label: 'Community Savings', value: '$25M' },
  { label: 'Active Users', value: '100K+' },
]

const features = [
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Smart Pantry & Expiry Alerts',
    description: 'Get notifications as food approaches expiration, helping reduce waste and encourage timely sharing.',
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: 'Hyperlocal Food Listings',
    description: 'Find food near you with our location-based system, making it easy to connect with local resources.',
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'Inclusive Community Sharing',
    description: 'Everyone can participate—from students and families to local vendors and food banks.',
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: 'Cultural Relevance',
    description: 'Tag food by cultural significance, helping maintain dietary identity and cultural connection.',
  },
]

const featuredItems = [
  {
    id: 1,
    title: 'Fresh Organic Vegetables',
    location: 'Downtown',
    distance: '0.5 miles',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format',
    expiresIn: '2 days',
    culturalTags: ['Vegetarian', 'Vegan'],
  },
  {
    id: 2,
    title: 'Halal Bakery Items',
    location: 'Westside',
    distance: '1.2 miles',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format',
    expiresIn: '1 day',
    culturalTags: ['Halal', 'Kosher'],
  },
  {
    id: 3,
    title: 'Canned Goods',
    location: 'Eastside',
    distance: '0.8 miles',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=500&auto=format',
    expiresIn: '30 days',
    culturalTags: ['Non-perishable'],
  },
]

const recentActivities = [
  {
    id: 1,
    user: 'Sarah M.',
    action: 'shared',
    item: 'Fresh Fruits',
    time: '2 hours ago',
  },
  {
    id: 2,
    user: 'John D.',
    action: 'requested',
    item: 'Bread',
    time: '3 hours ago',
  },
  {
    id: 3,
    user: 'Community Center',
    action: 'donated',
    item: 'Non-perishable items',
    time: '5 hours ago',
  },
]

const culturalTags = [
  "Italian", "Indian", "Mexican", "Chinese", "Japanese", "Thai", "Mediterranean", "African", "Middle Eastern", "Caribbean"
]

const dietaryTags = [
  "Vegetarian", "Vegan", "Gluten-Free", "Halal", "Kosher", "Dairy-Free", "Nut-Free", "Low-Carb", "Keto", "Paleo"
]

const dummyRecipes = [
  {
    id: "1",
    title: "Homemade Pasta Carbonara",
    description: "A traditional Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
    author: {
      name: "Maria Rossi",
      avatar: "/images/avatars/maria.jpg",
      location: "Brooklyn, NY"
    },
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=1000&auto=format&fit=crop",
    culturalTags: ["Italian"],
    dietaryTags: ["Vegetarian"],
    likes: 245,
    comments: 32,
    cookingTime: "30 mins",
    difficulty: "Medium",
    servings: 4,
    recipe: {
      ingredients: [
        "400g spaghetti",
        "200g pancetta",
        "4 large eggs",
        "100g Pecorino Romano cheese",
        "100g Parmigiano-Reggiano",
        "Black pepper",
        "Salt"
      ],
      instructions: [
        "Bring a large pot of salted water to boil",
        "Cut pancetta into small cubes",
        "Mix eggs, grated cheeses, and pepper in a bowl",
        "Cook pasta until al dente",
        "Fry pancetta until crispy",
        "Combine pasta with pancetta and egg mixture",
        "Serve immediately with extra cheese and pepper"
      ]
    }
  },
  {
    id: "2",
    title: "Butter Chicken",
    description: "Classic Indian curry with tender chicken in a spiced tomato, butter, and cream sauce.",
    author: {
      name: "Akshay Chavan",
      avatar: "/images/akshay.jpg",
      location: "Boston, MA"
    },
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1000&auto=format&fit=crop",
    culturalTags: ["Indian"],
    dietaryTags: ["Gluten-Free"],
    likes: 189,
    comments: 24,
    cookingTime: "45 mins",
    difficulty: "Medium",
    servings: 6,
    recipe: {
      ingredients: [
        "1kg chicken thighs",
        "2 cups tomato puree",
        "1 cup heavy cream",
        "4 tbsp butter",
        "2 tbsp ginger-garlic paste",
        "2 tbsp garam masala",
        "1 tbsp turmeric",
        "Salt to taste"
      ],
      instructions: [
        "Marinate chicken with spices",
        "Cook chicken until golden",
        "Prepare tomato-based sauce",
        "Add cream and butter",
        "Simmer until thick",
        "Garnish with fresh coriander"
      ]
    }
  },
  {
    id: "3",
    title: "Vegetarian Tacos",
    description: "Authentic Mexican street tacos with black beans, roasted vegetables, and homemade salsa.",
    author: {
      name: "Carlos Mendez",
      avatar: "/images/avatars/carlos.jpg",
      location: "Bronx, NY"
    },
    image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=1000&auto=format&fit=crop",
    culturalTags: ["Mexican"],
    dietaryTags: ["Vegetarian", "Vegan"],
    likes: 156,
    comments: 18,
    cookingTime: "25 mins",
    difficulty: "Easy",
    servings: 4,
    recipe: {
      ingredients: [
        "8 corn tortillas",
        "2 cups black beans",
        "2 bell peppers",
        "1 onion",
        "2 tomatoes",
        "1 lime",
        "Fresh cilantro",
        "Taco seasoning"
      ],
      instructions: [
        "Roast vegetables with seasoning",
        "Warm black beans",
        "Heat tortillas",
        "Assemble tacos",
        "Top with fresh salsa",
        "Garnish with lime and cilantro"
      ]
    }
  },
  {
    id: "4",
    title: "Pad Thai",
    description: "Classic Thai stir-fried rice noodles with tofu, peanuts, and tamarind sauce.",
    author: {
      name: "Sakura Tanaka",
      avatar: "/images/avatars/sakura.jpg",
      location: "Manhattan, NY"
    },
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1000&auto=format&fit=crop",
    culturalTags: ["Thai"],
    dietaryTags: ["Vegetarian"],
    likes: 203,
    comments: 27,
    cookingTime: "35 mins",
    difficulty: "Medium",
    servings: 4,
    recipe: {
      ingredients: [
        "400g rice noodles",
        "200g firm tofu",
        "2 eggs",
        "Bean sprouts",
        "Peanuts",
        "Tamarind paste",
        "Palm sugar",
        "Fish sauce"
      ],
      instructions: [
        "Soak rice noodles",
        "Prepare tamarind sauce",
        "Stir-fry tofu and vegetables",
        "Add noodles and sauce",
        "Top with peanuts and lime"
      ]
    }
  },
  {
    id: "5",
    title: "Shakshuka",
    description: "Middle Eastern breakfast dish with poached eggs in spicy tomato sauce.",
    author: {
      name: "Yasmine Hassan",
      avatar: "/images/avatars/yasmine.jpg",
      location: "Brooklyn, NY"
    },
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=1000&auto=format&fit=crop",
    culturalTags: ["Middle Eastern"],
    dietaryTags: ["Vegetarian", "Gluten-Free"],
    likes: 178,
    comments: 21,
    cookingTime: "30 mins",
    difficulty: "Easy",
    servings: 4,
    recipe: {
      ingredients: [
        "6 eggs",
        "4 tomatoes",
        "2 bell peppers",
        "1 onion",
        "Garlic",
        "Cumin",
        "Paprika",
        "Fresh parsley"
      ],
      instructions: [
        "Sauté vegetables",
        "Add spices and tomatoes",
        "Create wells for eggs",
        "Poach eggs in sauce",
        "Garnish with herbs"
      ]
    }
  },
  {
    id: "6",
    title: "Jerk Chicken",
    description: "Traditional Jamaican spicy grilled chicken with allspice and scotch bonnet peppers.",
    author: {
      name: "Marcus Johnson",
      avatar: "/images/avatars/marcus.jpg",
      location: "Queens, NY"
    },
    image: "https://images.unsplash.com/photo-1658833621083-01fd8a4acf19?q=80&w=2918&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    culturalTags: ["Caribbean"],
    dietaryTags: ["Gluten-Free"],
    likes: 167,
    comments: 19,
    cookingTime: "50 mins",
    difficulty: "Medium",
    servings: 6,
    recipe: {
      ingredients: [
        "1 whole chicken",
        "Scotch bonnet peppers",
        "Allspice",
        "Thyme",
        "Garlic",
        "Ginger",
        "Brown sugar",
        "Lime juice"
      ],
      instructions: [
        "Prepare jerk marinade",
        "Marinate chicken overnight",
        "Grill over pimento wood",
        "Serve with rice and peas"
      ]
    }
  },
  {
    id: "7",
    title: "Sushi Roll",
    description: "Fresh California roll with crab, avocado, and cucumber.",
    author: {
      name: "Kenji Yamamoto",
      avatar: "/images/avatars/kenji.jpg",
      location: "Manhattan, NY"
    },
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop",
    culturalTags: ["Japanese"],
    dietaryTags: ["Gluten-Free"],
    likes: 234,
    comments: 31,
    cookingTime: "40 mins",
    difficulty: "Hard",
    servings: 4,
    recipe: {
      ingredients: [
        "Sushi rice",
        "Nori sheets",
        "Crab meat",
        "Avocado",
        "Cucumber",
        "Rice vinegar",
        "Wasabi",
        "Soy sauce"
      ],
      instructions: [
        "Prepare sushi rice",
        "Slice vegetables",
        "Roll with bamboo mat",
        "Cut into pieces",
        "Serve with wasabi and soy sauce"
      ]
    }
  },
  {
    id: "8",
    title: "Moussaka",
    description: "Greek layered eggplant casserole with spiced meat and béchamel sauce.",
    author: {
      name: "Elena Papadopoulos",
      avatar: "/images/avatars/elena.jpg",
      location: "Brooklyn, NY"
    },
    image: "https://www.recipetineats.com/tachyon/2020/11/Greek-Moussaka_3-re-edited.jpg?resize=900%2C1125&zoom=1",
    culturalTags: ["Mediterranean"],
    dietaryTags: ["Vegetarian"],
    likes: 145,
    comments: 16,
    cookingTime: "90 mins",
    difficulty: "Hard",
    servings: 8,
    recipe: {
      ingredients: [
        "3 eggplants",
        "500g ground lamb",
        "Béchamel sauce",
        "Cinnamon",
        "Nutmeg",
        "Parmesan",
        "Tomato sauce",
        "Herbs"
      ],
      instructions: [
        "Slice and salt eggplants",
        "Prepare meat sauce",
        "Make béchamel",
        "Layer ingredients",
        "Bake until golden"
      ]
    }
  },
  {
    id: "9",
    title: "Bibimbap",
    description: "Korean rice bowl with vegetables, meat, and gochujang sauce.",
    author: {
      name: "Min-ji Park",
      avatar: "/images/avatars/minji.jpg",
      location: "Queens, NY"
    },
    image: "https://images.unsplash.com/photo-1713047203705-44dd7d762d0c?q=80&w=3105&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    culturalTags: ["Korean"],
    dietaryTags: ["Gluten-Free"],
    likes: 198,
    comments: 23,
    cookingTime: "45 mins",
    difficulty: "Medium",
    servings: 4,
    recipe: {
      ingredients: [
        "Rice",
        "Beef",
        "Vegetables",
        "Gochujang",
        "Sesame oil",
        "Eggs",
        "Kimchi",
        "Sesame seeds"
      ],
      instructions: [
        "Cook rice",
        "Prepare vegetables",
        "Cook beef",
        "Fry eggs",
        "Assemble bowl",
        "Add sauce"
      ]
    }
  },
  {
    id: "10",
    title: "Pho",
    description: "Vietnamese noodle soup with beef, herbs, and rice noodles.",
    author: {
      name: "Linh Nguyen",
      avatar: "/images/avatars/linh.jpg",
      location: "Bronx, NY"
    },
    image: "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    culturalTags: ["Vietnamese"],
    dietaryTags: ["Gluten-Free"],
    likes: 212,
    comments: 28,
    cookingTime: "180 mins",
    difficulty: "Hard",
    servings: 6,
    recipe: {
      ingredients: [
        "Beef bones",
        "Rice noodles",
        "Beef slices",
        "Herbs",
        "Bean sprouts",
        "Fish sauce",
        "Star anise",
        "Cinnamon"
      ],
      instructions: [
        "Prepare broth",
        "Cook noodles",
        "Slice beef",
        "Prepare herbs",
        "Assemble bowl",
        "Add condiments"
      ]
    }
  }
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCulturalTag, setSelectedCulturalTag] = useState<string | null>(null)
  const [selectedDietaryTag, setSelectedDietaryTag] = useState<string | null>(null)
  const [likedRecipes, setLikedRecipes] = useState<Set<string>>(new Set())
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null)
  const [showComments, setShowComments] = useState<string | null>(null)
  const [showAddRecipe, setShowAddRecipe] = useState(false)
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    description: "",
    culturalTags: [] as string[],
    dietaryTags: [] as string[],
    cookingTime: "",
    difficulty: "Easy",
    servings: 2,
    ingredients: [""],
    instructions: [""]
  })

  const handleLike = (recipeId: string) => {
    setLikedRecipes(prev => {
      const newLiked = new Set(prev)
      if (newLiked.has(recipeId)) {
        newLiked.delete(recipeId)
      } else {
        newLiked.add(recipeId)
      }
      return newLiked
    })
  }

  const handleViewRecipe = (recipeId: string) => {
    setSelectedRecipe(recipeId)
  }

  const handleShowComments = (recipeId: string) => {
    setShowComments(showComments === recipeId ? null : recipeId)
  }

  const handleAddIngredient = () => {
    setNewRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, ""]
    }))
  }

  const handleAddInstruction = () => {
    setNewRecipe(prev => ({
      ...prev,
      instructions: [...prev.instructions, ""]
    }))
  }

  const handleSubmitRecipe = () => {
    // Here you would typically send the recipe to your backend
    console.log("New recipe:", newRecipe)
    setShowAddRecipe(false)
    // Reset form
    setNewRecipe({
      title: "",
      description: "",
      culturalTags: [],
      dietaryTags: [],
      cookingTime: "",
      difficulty: "Easy",
      servings: 2,
      ingredients: [""],
      instructions: [""]
    })
  }

  const filteredRecipes = dummyRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCulturalTag = selectedCulturalTag === null || recipe.culturalTags.includes(selectedCulturalTag)
    const matchesDietaryTag = selectedDietaryTag === null || recipe.dietaryTags.includes(selectedDietaryTag)
    return matchesSearch && matchesCulturalTag && matchesDietaryTag
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image
          src="/images/karolina-kolodziejczak-1DNMBNQaQZE-unsplash.jpg"
          alt="Community Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Share Food, Share Joy
          </h1>
          <p className="text-lg md:text-xl text-green-50 max-w-2xl mb-12">
            Join our community to reduce food waste and help those in need. Every contribution makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl justify-center items-center">
            <Button 
              size="lg" 
              className="w-[250px] h-12 text-lg font-bold bg-white/15 hover:bg-white/25 text-white shadow-[0_8px_16px_rgb(0_0_0/0.1)] hover:shadow-[0_8px_16px_rgb(0_0_0/0.2)] transition-all duration-300 rounded-2xl px-6 border-2 border-white/30 hover:border-white/40 backdrop-blur-sm flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Start Sharing
            </Button>
            <Link href="/leaderboard" className="flex items-center justify-center">
              <Button 
                size="lg" 
                className="w-[250px] h-12 text-lg font-bold bg-white/15 hover:bg-white/25 text-white shadow-[0_8px_16px_rgb(0_0_0/0.1)] hover:shadow-[0_8px_16px_rgb(0_0_0/0.2)] transition-all duration-300 rounded-2xl px-6 border-2 border-white/30 hover:border-white/40 backdrop-blur-sm flex items-center justify-center"
              >
                <Trophy className="w-5 h-5 mr-2" />
                View Leaderboard
              </Button>
            </Link>
            <Link href="/impact-calculator" className="flex items-center justify-center">
              <Button 
                size="lg" 
                className="w-[250px] h-12 text-lg font-bold bg-white/15 hover:bg-white/25 text-white shadow-[0_8px_16px_rgb(0_0_0/0.1)] hover:shadow-[0_8px_16px_rgb(0_0_0/0.2)] transition-all duration-300 rounded-2xl px-6 border-2 border-white/30 hover:border-white/40 backdrop-blur-sm flex items-center justify-center"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Impact
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions Bar */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-bold text-green-800">Community Recipes</h2>
          </div>
          <Button 
            onClick={() => setShowAddRecipe(true)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Share Recipe
          </Button>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-4 w-4" />
            <Input
              placeholder="Search for recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Cultural Tags */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Globe className="w-5 h-5 text-green-600" />
            Cultural Tags
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {culturalTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedCulturalTag === tag ? "default" : "outline"}
                onClick={() => setSelectedCulturalTag(selectedCulturalTag === tag ? null : tag)}
                className={`whitespace-nowrap ${
                  selectedCulturalTag === tag 
                    ? "bg-green-600 hover:bg-green-700 text-white" 
                    : "border-green-200 text-green-700 hover:bg-green-50"
                }`}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Dietary Tags */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-green-600" />
            Dietary Preferences
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {dietaryTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedDietaryTag === tag ? "default" : "outline"}
                onClick={() => setSelectedDietaryTag(selectedDietaryTag === tag ? null : tag)}
                className={`whitespace-nowrap ${
                  selectedDietaryTag === tag 
                    ? "bg-green-600 hover:bg-green-700 text-white" 
                    : "border-green-200 text-green-700 hover:bg-green-50"
                }`}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={recipe.author.avatar} />
                    <AvatarFallback>{recipe.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{recipe.author.name}</p>
                    <p className="text-xs text-gray-500">{recipe.author.location}</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{recipe.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {recipe.culturalTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-green-100 text-green-800">
                      {tag}
                    </Badge>
                  ))}
                  {recipe.dietaryTags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-green-200 text-green-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {recipe.cookingTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {recipe.servings} servings
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => handleLike(recipe.id)}
                      className={`flex items-center gap-1 transition-colors ${
                        likedRecipes.has(recipe.id) ? 'text-red-500' : 'hover:text-green-600'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedRecipes.has(recipe.id) ? 'fill-current' : ''}`} />
                      {likedRecipes.has(recipe.id) ? recipe.likes + 1 : recipe.likes}
                    </button>
                    <button 
                      onClick={() => handleShowComments(recipe.id)}
                      className="flex items-center gap-1 hover:text-green-600 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      {recipe.comments}
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full border-green-200 text-green-700 hover:bg-green-50"
                    onClick={() => handleViewRecipe(recipe.id)}
                  >
                    View Recipe
                  </Button>
                </div>
                {showComments === recipe.id && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Comments</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Comments feature coming soon!</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Recipe Modal */}
        {selectedRecipe && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold">
                    {dummyRecipes.find(r => r.id === selectedRecipe)?.title}
                  </h2>
                  <button 
                    onClick={() => setSelectedRecipe(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Ingredients</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {dummyRecipes.find(r => r.id === selectedRecipe)?.recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="text-gray-600">{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Instructions</h3>
                    <ol className="list-decimal list-inside space-y-2">
                      {dummyRecipes.find(r => r.id === selectedRecipe)?.recipe.instructions.map((instruction, index) => (
                        <li key={index} className="text-gray-600">{instruction}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Recipe Modal */}
        {showAddRecipe && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 z-[100] overflow-y-auto">
            <div className="bg-white rounded-xl max-w-2xl w-full my-8 shadow-2xl flex flex-col relative z-[101]">
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6 sticky top-0 bg-white pb-4 border-b z-[102]">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Share Your Recipe</h2>
                    <p className="text-sm text-gray-500 mt-1">Share your favorite recipe with the community</p>
                  </div>
                  <button 
                    onClick={() => setShowAddRecipe(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-6 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent flex-1">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Title</label>
                    <Input
                      value={newRecipe.title}
                      onChange={(e) => setNewRecipe(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter recipe title"
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={newRecipe.description}
                      onChange={(e) => setNewRecipe(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your recipe"
                      className="w-full p-2 border border-gray-200 rounded-md focus:border-green-500 focus:ring-green-500"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cultural Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {culturalTags.map((tag) => (
                        <Button
                          key={tag}
                          variant={newRecipe.culturalTags.includes(tag) ? "default" : "outline"}
                          onClick={() => setNewRecipe(prev => ({
                            ...prev,
                            culturalTags: prev.culturalTags.includes(tag)
                              ? prev.culturalTags.filter(t => t !== tag)
                              : [...prev.culturalTags, tag]
                          }))}
                          className={`text-sm ${
                            newRecipe.culturalTags.includes(tag)
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "border-gray-200 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {dietaryTags.map((tag) => (
                        <Button
                          key={tag}
                          variant={newRecipe.dietaryTags.includes(tag) ? "default" : "outline"}
                          onClick={() => setNewRecipe(prev => ({
                            ...prev,
                            dietaryTags: prev.dietaryTags.includes(tag)
                              ? prev.dietaryTags.filter(t => t !== tag)
                              : [...prev.dietaryTags, tag]
                          }))}
                          className={`text-sm ${
                            newRecipe.dietaryTags.includes(tag)
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "border-gray-200 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cooking Time</label>
                      <Input
                        value={newRecipe.cookingTime}
                        onChange={(e) => setNewRecipe(prev => ({ ...prev, cookingTime: e.target.value }))}
                        placeholder="e.g., 30 mins"
                        className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                      <select
                        value={newRecipe.difficulty}
                        onChange={(e) => setNewRecipe(prev => ({ ...prev, difficulty: e.target.value }))}
                        className="w-full p-2 border border-gray-200 rounded-md focus:border-green-500 focus:ring-green-500"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
                      <Input
                        type="number"
                        value={newRecipe.servings}
                        onChange={(e) => setNewRecipe(prev => ({ ...prev, servings: parseInt(e.target.value) }))}
                        min="1"
                        className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients</label>
                    {newRecipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          value={ingredient}
                          onChange={(e) => {
                            const newIngredients = [...newRecipe.ingredients]
                            newIngredients[index] = e.target.value
                            setNewRecipe(prev => ({ ...prev, ingredients: newIngredients }))
                          }}
                          placeholder={`Ingredient ${index + 1}`}
                          className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                        />
                        {index > 0 && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              const newIngredients = newRecipe.ingredients.filter((_, i) => i !== index)
                              setNewRecipe(prev => ({ ...prev, ingredients: newIngredients }))
                            }}
                            className="border-gray-200 hover:bg-gray-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={handleAddIngredient}
                      className="mt-2 border-gray-200 hover:bg-gray-50"
                    >
                      Add Ingredient
                    </Button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                    {newRecipe.instructions.map((instruction, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-700">Step {index + 1}</span>
                          </div>
                          <textarea
                            value={instruction}
                            onChange={(e) => {
                              const newInstructions = [...newRecipe.instructions]
                              newInstructions[index] = e.target.value
                              setNewRecipe(prev => ({ ...prev, instructions: newInstructions }))
                            }}
                            placeholder={`Step ${index + 1}`}
                            className="w-full p-2 border border-gray-200 rounded-md focus:border-green-500 focus:ring-green-500"
                            rows={2}
                          />
                        </div>
                        {index > 0 && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              const newInstructions = newRecipe.instructions.filter((_, i) => i !== index)
                              setNewRecipe(prev => ({ ...prev, instructions: newInstructions }))
                            }}
                            className="border-gray-200 hover:bg-gray-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={handleAddInstruction}
                      className="mt-2 border-gray-200 hover:bg-gray-50"
                    >
                      Add Step
                    </Button>
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6 pt-4 border-t bg-white sticky bottom-0 z-[102]">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddRecipe(false)}
                    className="border-gray-200 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmitRecipe}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Share Recipe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
