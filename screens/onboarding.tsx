"use client"

import { useState, useRef } from "react"
import { useTheme } from "../context/theme-context"
import { useNavigation } from "../context/navigation-context"

interface OnboardingItem {
  id: string
  title: string
  description: string
  image: string
}

const onboardingData: OnboardingItem[] = [
  {
    id: "1",
    title: "Reduce Food Waste",
    description: "Share your surplus food with those who need it instead of throwing it away.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Connect With Community",
    description: "Build stronger neighborhood bonds through food sharing and cultural exchange.",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Track Your Impact",
    description: "See how your contributions help reduce waste and support your community.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop",
  },
]

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const navigation = useNavigation()
  const { colors } = useTheme()

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1)
      if (carouselRef.current) {
        carouselRef.current.scrollTo({
          left: (currentIndex + 1) * window.innerWidth,
          behavior: "smooth"
        })
      }
    } else {
      navigation.navigate("/login")
    }
  }

  const handleSkip = () => {
    navigation.navigate("/login")
  }

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      height: "100vh",
      backgroundColor: colors.background
    }}>
      <div 
        ref={carouselRef}
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "hidden",
          scrollSnapType: "x mandatory",
          flex: 1
        }}
        onScroll={(e) => {
          const index = Math.round(e.currentTarget.scrollLeft / window.innerWidth)
          setCurrentIndex(index)
        }}
      >
        {onboardingData.map((item) => (
          <div
            key={item.id}
            style={{
              flex: "0 0 100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              scrollSnapAlign: "start"
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "80%",
                maxWidth: "400px",
                height: "auto",
                objectFit: "contain",
                marginBottom: "40px"
              }}
            />
            <h1 style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "16px",
              textAlign: "center",
              color: colors.text
            }}>
              {item.title}
            </h1>
            <p style={{
              fontSize: "16px",
              textAlign: "center",
              padding: "0 20px",
              color: colors.text
            }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: "20px"
      }}>
        {onboardingData.map((_, index) => (
          <div
            key={index}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "5px",
              margin: "0 5px",
              backgroundColor: index === currentIndex ? colors.primary : colors.border
            }}
          />
        ))}
      </div>

      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px 40px"
      }}>
        <button
          onClick={handleSkip}
          style={{
            background: "none",
            border: "none",
            fontSize: "16px",
            fontWeight: "500",
            color: colors.text,
            cursor: "pointer",
            padding: "8px 16px"
          }}
        >
          Skip
        </button>

        <button
          onClick={handleNext}
          style={{
            padding: "12px 32px",
            borderRadius: "24px",
            backgroundColor: colors.primary,
            border: "none",
            cursor: "pointer"
          }}
        >
          <span style={{
            color: "#FFFFFF",
            fontSize: "16px",
            fontWeight: "600"
          }}>
            {currentIndex === onboardingData.length - 1 ? "Get Started" : "Next"}
          </span>
        </button>
      </div>
    </div>
  )
}

export default Onboarding
