"use client"

import { useState } from "react"
import { Search, Bell, MessageSquare, Filter } from "lucide-react"
import { useTheme } from "../context/theme-context"
import { useNavigation } from "../context/navigation-context"
import FoodCard from "../components/food-card"

// Mock data
const foodListings = [
  {
    id: "1",
    title: "Homemade Pasta",
    description: "Fresh homemade pasta, enough for 4 people. Made today.",
    distance: "0.3",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1000&auto=format&fit=crop",
    tags: ["Italian", "Vegetarian"],
    expiresIn: "2 days",
    isFree: true,
  },
  {
    id: "2",
    title: "Organic Vegetables",
    description: "Surplus from my garden: tomatoes, cucumbers, and bell peppers.",
    distance: "0.5",
    image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=1000&auto=format&fit=crop",
    tags: ["Organic", "Vegan"],
    expiresIn: "3 days",
    isFree: true,
  },
  {
    id: "3",
    title: "Bakery Bread",
    description: "Assorted bread from local bakery. Pickup today only.",
    distance: "1.2",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop",
    tags: ["Bakery", "Vegetarian"],
    expiresIn: "1 day",
    isFree: false,
    price: "$2.50",
    originalPrice: "$5.00",
  },
  {
    id: "4",
    title: "Rice & Curry",
    description: "Homemade Sri Lankan curry with rice. Spicy and delicious!",
    distance: "0.8",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1000&auto=format&fit=crop",
    tags: ["Sri Lankan", "Spicy"],
    expiresIn: "1 day",
    isFree: true,
  },
]

const categories = [
  { id: "1", name: "Nearby", icon: "📍" },
  { id: "2", name: "Free", icon: "🆓" },
  { id: "3", name: "Expiring Soon", icon: "⏱️" },
  { id: "4", name: "Vegetarian", icon: "🥗" },
  { id: "5", name: "Halal", icon: "🍖" },
  { id: "6", name: "Kosher", icon: "✡️" },
]

const Home = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("1")
  const { navigate } = useNavigation()
  const { colors } = useTheme()

  const onRefresh = () => {
    setRefreshing(true)
    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  const handleFoodPress = (item: any) => {
    navigate("/food-detail", { item: JSON.stringify(item) })
  }

  const handleMessagesPress = () => {
    navigate("/messages")
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: colors.background,
      padding: 16,
    }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: 20 
      }}>
        <div>
          <h1 style={{ 
            fontSize: 24, 
            fontWeight: "bold", 
            color: colors.text, 
            margin: 0 
          }}>Hello, Sarah!</h1>
          <p style={{ 
            fontSize: 16, 
            color: colors.text, 
            margin: "4px 0 0 0" 
          }}>📍 Brooklyn, NY</p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={handleMessagesPress}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              background: colors.card,
              border: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <MessageSquare stroke={colors.text} width={20} height={20} />
          </button>
          <button
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              background: colors.card,
              border: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <Bell stroke={colors.text} width={20} height={20} />
            <div style={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 8,
              height: 8,
              borderRadius: 4,
              background: colors.notification,
            }} />
          </button>
        </div>
      </div>

      <div style={{
        display: "flex",
        alignItems: "center",
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        padding: "0 16px",
        height: 50,
        marginBottom: 20,
        background: colors.card,
      }}>
        <Search stroke={colors.text} width={20} height={20} />
        <input
          type="text"
          placeholder="Search for food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            marginLeft: 12,
            fontSize: 16,
            background: "none",
            border: "none",
            color: colors.text,
            outline: "none",
          }}
        />
        <button
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            background: colors.primary,
            border: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Filter stroke="#FFFFFF" width={18} height={18} />
        </button>
      </div>

      <div style={{
        display: "flex",
        gap: 12,
        overflowX: "auto",
        paddingBottom: 16,
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 16px",
              borderRadius: 20,
              border: `1px solid ${colors.border}`,
              background: selectedCategory === category.id ? colors.primary : colors.card,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ marginRight: 6 }}>{category.icon}</span>
            <span style={{
              fontSize: 14,
              fontWeight: 500,
              color: selectedCategory === category.id ? "#FFFFFF" : colors.text,
            }}>
              {category.name}
            </span>
          </button>
        ))}
      </div>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
      }}>
        <h2 style={{
          fontSize: 18,
          fontWeight: "bold",
          color: colors.text,
          margin: 0,
        }}>Available Near You</h2>
        <button
          style={{
            background: "none",
            border: "none",
            color: colors.primary,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          See All
        </button>
      </div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}>
        {foodListings.map((item) => (
          <FoodCard key={item.id} item={item} onPress={() => handleFoodPress(item)} />
        ))}
      </div>
    </div>
  )
}

export default Home
