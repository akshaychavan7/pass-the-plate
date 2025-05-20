"use client"

import type React from "react"
import { Settings, Edit, Award, Heart, Package, MessageSquare, Moon, LogOut } from "lucide-react"
import { useTheme } from "../context/theme-context"

const Profile = () => {
  const { colors, theme, toggleTheme } = useTheme()

  const impactStats = [
    { id: "1", title: "Meals Shared", value: "24", icon: "plate" },
    { id: "2", title: "Food Saved (lbs)", value: "36", icon: "weight" },
    { id: "3", title: "CO₂ Prevented", value: "18", icon: "leaf" },
  ]

  const renderMenuItem = (icon: React.ReactNode, title: string, onClick: () => void) => (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 0",
        borderBottom: `1px solid ${colors.border}`,
        width: "100%",
        background: "none",
        border: "none",
        cursor: "pointer"
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        {icon}
        <span style={{ 
          fontSize: "16px", 
          color: colors.text,
          marginLeft: "16px"
        }}>
          {title}
        </span>
      </div>
      <div style={{
        width: "8px",
        height: "8px",
        borderTop: `2px solid ${colors.text}`,
        borderRight: `2px solid ${colors.text}`,
        transform: "rotate(45deg)"
      }} />
    </button>
  )

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      minHeight: "100vh",
      backgroundColor: colors.background
    }}>
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px"
      }}>
        <h1 style={{ 
          fontSize: "24px", 
          fontWeight: "bold",
          color: colors.text,
          margin: 0
        }}>
          Profile
        </h1>
        <button style={{
          width: "40px",
          height: "40px",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.card,
          border: "none",
          cursor: "pointer"
        }}>
          <Settings stroke={colors.text} width={20} height={20} />
        </button>
      </div>

      <div style={{ overflowY: "auto", flex: 1 }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px",
          marginBottom: "24px"
        }}>
          <div style={{ position: "relative", marginBottom: "16px" }}>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop"
              alt="Profile"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50px",
                objectFit: "cover"
              }}
            />
            <button style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "32px",
              height: "32px",
              borderRadius: "16px",
              backgroundColor: colors.primary,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "none",
              cursor: "pointer"
            }}>
              <Edit stroke="#FFFFFF" width={16} height={16} />
            </button>
          </div>

          <h2 style={{ 
            fontSize: "20px", 
            fontWeight: "bold",
            color: colors.text,
            margin: "0 0 4px 0"
          }}>
            Akshay Chavan
          </h2>
          <p style={{ 
            fontSize: "16px", 
            color: colors.text + "80",
            margin: "0 0 16px 0"
          }}>
            Brooklyn, NY
          </p>

          <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
            <div style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "6px 12px",
              borderRadius: "16px",
              backgroundColor: colors.primary + "20",
              gap: "4px"
            }}>
              <Award stroke={colors.primary} width={14} height={14} />
              <span style={{ 
                fontSize: "12px", 
                fontWeight: "500",
                color: colors.primary
              }}>
                Food Hero
              </span>
            </div>
            <div style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "6px 12px",
              borderRadius: "16px",
              backgroundColor: colors.primary + "20",
              gap: "4px"
            }}>
              <Award stroke={colors.primary} width={14} height={14} />
              <span style={{ 
                fontSize: "12px", 
                fontWeight: "500",
                color: colors.primary
              }}>
                Eco Warrior
              </span>
            </div>
          </div>
        </div>

        <div style={{
          padding: "16px",
          borderRadius: "16px",
          margin: "0 16px 24px",
          backgroundColor: colors.card
        }}>
          <h3 style={{ 
            fontSize: "18px", 
            fontWeight: "bold",
            color: colors.text,
            margin: "0 0 16px 0"
          }}>
            Your Impact
          </h3>

          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            {impactStats.map((stat) => (
              <div key={stat.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "24px",
                  backgroundColor: colors.primary + "20",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "8px"
                }}>
                  <span style={{ fontSize: "24px" }}>
                    {stat.icon === "plate" ? "🍽️" : stat.icon === "weight" ? "⚖️" : "🌱"}
                  </span>
                </div>
                <span style={{ 
                  fontSize: "20px", 
                  fontWeight: "bold",
                  color: colors.text,
                  marginBottom: "4px"
                }}>
                  {stat.value}
                </span>
                <span style={{ 
                  fontSize: "12px", 
                  color: colors.text + "80",
                  textAlign: "center"
                }}>
                  {stat.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ margin: "0 16px 40px" }}>
          {renderMenuItem(
            <Heart stroke={colors.primary} width={20} height={20} />,
            "My Favorites",
            () => {},
          )}

          {renderMenuItem(
            <Package stroke={colors.primary} width={20} height={20} />,
            "My Listings",
            () => {},
          )}

          {renderMenuItem(
            <MessageSquare stroke={colors.primary} width={20} height={20} />,
            "Messages",
            () => {},
          )}

          {renderMenuItem(
            <Moon stroke={colors.primary} width={20} height={20} />,
            theme === "dark" ? "Light Mode" : "Dark Mode",
            toggleTheme,
          )}

          {renderMenuItem(
            <LogOut stroke={colors.danger} width={20} height={20} />,
            "Log Out",
            () => {},
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
