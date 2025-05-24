"use client"

import { useState } from "react"
import { List, MapPin } from "lucide-react"
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
    coordinate: {
      latitude: 40.712776,
      longitude: -74.005974,
    },
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
    coordinate: {
      latitude: 40.713776,
      longitude: -74.006974,
    },
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
    coordinate: {
      latitude: 40.714776,
      longitude: -74.007974,
    },
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
    coordinate: {
      latitude: 40.715776,
      longitude: -74.008974,
    },
  },
]

const MapScreen = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [showList, setShowList] = useState(false)
  const navigation = useNavigation()
  const { colors } = useTheme()

  const handleMarkerPress = (item: any) => {
    setSelectedItem(item)
  }

  const handleFoodPress = (item: any) => {
    navigation.navigate("/food-detail", { item: JSON.stringify(item) })
  }

  const toggleView = () => {
    setShowList(!showList)
  }

  console.log("key==>", process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <header style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        padding: "12px 16px",
        borderBottom: `1px solid ${colors.border}`
      }}>
        <h1 style={{ 
          fontSize: "20px", 
          fontWeight: "bold",
          color: colors.text,
          margin: 0
        }}>Food Near You</h1>
        <button 
          onClick={toggleView}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.card,
            border: "none",
            cursor: "pointer"
          }}
        >
          {showList ? (
            <MapPin stroke={colors.text} width={20} height={20} />
          ) : (
            <List stroke={colors.text} width={20} height={20} />
          )}
        </button>
      </header>

      {!showList ? (
        <div style={{ flex: 1, position: "relative" }}>
          <iframe
            src={`https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&center=40.712776,-74.005974&zoom=14`}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {selectedItem && (
            <div style={{
              position: "absolute",
              bottom: "20px",
              left: "16px",
              right: "16px",
              padding: "16px",
              borderRadius: "16px",
              backgroundColor: colors.background + "E6"
            }}>
              <FoodCard item={selectedItem} onPress={() => handleFoodPress(selectedItem)} />
            </div>
          )}
        </div>
      ) : (
        <div style={{ 
          flex: 1, 
          overflowY: "auto",
          padding: "16px",
          paddingBottom: "100px"
        }}>
          {foodListings.map((item) => (
            <FoodCard key={item.id} item={item} onPress={() => handleFoodPress(item)} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MapScreen
