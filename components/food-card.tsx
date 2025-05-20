"use client"

import { MapPin, Clock } from "lucide-react"
import { useTheme } from "../context/theme-context"

interface FoodCardProps {
  item: {
    id: string
    title: string
    description: string
    distance: string
    image: any
    tags: string[]
    expiresIn: string
    isFree: boolean
    price?: string
    originalPrice?: string
  }
  onPress: () => void
}

const FoodCard = ({ item, onPress }: FoodCardProps) => {
  const { colors } = useTheme()

  return (
    <div
      onClick={onPress}
      style={{
        backgroundColor: colors.card,
        borderRadius: "16px",
        overflow: "hidden",
        marginBottom: "16px",
        cursor: "pointer",
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={item.image}
          alt={item.title}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
          }}
        />
        {!item.isFree && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              backgroundColor: colors.background + "E6",
              padding: "8px 12px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <span style={{ color: colors.text, fontWeight: "bold" }}>
              {item.price}
            </span>
            {item.originalPrice && (
              <span
                style={{
                  color: colors.text + "80",
                  textDecoration: "line-through",
                  fontSize: "0.875rem",
                }}
              >
                {item.originalPrice}
              </span>
            )}
          </div>
        )}
      </div>

      <div style={{ padding: "16px" }}>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: colors.text,
            marginBottom: "8px",
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            color: colors.text + "CC",
            marginBottom: "12px",
            fontSize: "14px",
          }}
        >
          {item.description}
        </p>

        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          {item.tags.map((tag) => (
            <span
              key={tag}
              style={{
                backgroundColor: colors.background,
                color: colors.text,
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <MapPin size={16} stroke={colors.text + "80"} />
            <span style={{ color: colors.text + "80", fontSize: "14px" }}>
              {item.distance} km
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Clock size={16} stroke={colors.text + "80"} />
            <span style={{ color: colors.text + "80", fontSize: "14px" }}>
              {item.expiresIn}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodCard
