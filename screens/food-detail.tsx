"use client"

import { MapPin, Clock, Heart, MessageSquare, Share2 } from "lucide-react"
import { useTheme } from "../context/theme-context"

const FoodDetail = () => {
  const { colors } = useTheme()
  const item = {
    title: "Homemade Pasta",
    description: "Fresh homemade pasta, enough for 4 people. Made today.",
    distance: "0.3",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1000&auto=format&fit=crop",
    tags: ["Italian", "Vegetarian"],
    expiresIn: "2 days",
    isFree: true,
  }

  return (
    <div style={{ height: "100vh", background: colors.background, overflowY: "auto" }}>
      <img src={item.image} alt={item.title} style={{ width: "100%", height: "300px", objectFit: "cover" }} />

      <div style={{ padding: 16 }}>
        <h1 style={{ fontSize: 24, fontWeight: "bold", color: colors.text, marginBottom: 8 }}>{item.title}</h1>

        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <MapPin stroke={colors.primary} width={16} height={16} />
          <span style={{ marginLeft: 4, color: colors.text }}>{item.distance} miles away</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <Clock stroke={colors.warning} width={16} height={16} />
          <span style={{ marginLeft: 4, color: colors.warning }}>Expires in {item.expiresIn}</span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {item.tags.map((tag, index) => (
            <div key={index} style={{ background: colors.primary + "20", padding: "4px 8px", borderRadius: 4 }}>
              <span style={{ color: colors.primary }}>{tag}</span>
            </div>
          ))}
        </div>

        <p style={{ color: colors.text, marginBottom: 16 }}>{item.description}</p>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
          <button
            style={{
              background: "none",
              border: "none",
              display: "flex",
              alignItems: "center",
              color: colors.text,
              cursor: "pointer",
            }}
          >
            <Heart stroke={colors.text} width={20} height={20} />
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              display: "flex",
              alignItems: "center",
              color: colors.text,
              cursor: "pointer",
            }}
          >
            <MessageSquare stroke={colors.text} width={20} height={20} />
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              display: "flex",
              alignItems: "center",
              color: colors.text,
              cursor: "pointer",
            }}
          >
            <Share2 stroke={colors.text} width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FoodDetail
