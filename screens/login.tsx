"use client"

import { useState } from "react"
import { useTheme } from "../context/theme-context"
import { useNavigation } from "../context/navigation-context"

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const { navigate } = useNavigation()
  const { colors } = useTheme()

  const handleSubmit = () => {
    // In a real app, implement authentication logic here
    navigate("/")
  }

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div style={{ 
      minHeight: "100vh",
      background: colors.background,
      padding: 20,
      display: "flex",
      flexDirection: "column",
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 40,
        marginBottom: 40,
      }}>
        <img 
          src="https://placehold.co/100x100" 
          alt="Logo" 
          style={{ 
            width: 100, 
            height: 100, 
            objectFit: "contain" 
          }} 
        />
        <h1 style={{ 
          fontSize: 28, 
          fontWeight: "bold", 
          marginTop: 16,
          color: colors.text,
          margin: 0,
        }}>Pass The Plate</h1>
        <p style={{ 
          fontSize: 16, 
          textAlign: "center", 
          marginTop: 8,
          color: colors.text,
        }}>Share food. Build community. Reduce waste.</p>
      </div>

      <div style={{ width: "100%" }}>
        <h2 style={{ 
          fontSize: 24, 
          fontWeight: "bold", 
          marginBottom: 24,
          color: colors.text,
        }}>
          {isLogin ? "Welcome Back!" : "Join Our Community"}
        </h2>

        {!isLogin && (
          <div style={{ marginBottom: 16 }}>
            <label style={{ 
              fontSize: 16, 
              marginBottom: 8, 
              fontWeight: 500,
              color: colors.text,
              display: "block",
            }}>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                height: 50,
                border: `1px solid ${colors.border}`,
                borderRadius: 8,
                padding: "0 16px",
                fontSize: 16,
                background: colors.card,
                color: colors.text,
              }}
            />
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <label style={{ 
            fontSize: 16, 
            marginBottom: 8, 
            fontWeight: 500,
            color: colors.text,
            display: "block",
          }}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              height: 50,
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              padding: "0 16px",
              fontSize: 16,
              background: colors.card,
              color: colors.text,
            }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ 
            fontSize: 16, 
            marginBottom: 8, 
            fontWeight: 500,
            color: colors.text,
            display: "block",
          }}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              height: 50,
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              padding: "0 16px",
              fontSize: 16,
              background: colors.card,
              color: colors.text,
            }}
          />
        </div>

        {isLogin && (
          <button
            onClick={() => {}}
            style={{
              background: "none",
              border: "none",
              color: colors.primary,
              fontSize: 14,
              fontWeight: 500,
              padding: 0,
              marginBottom: 24,
              cursor: "pointer",
              alignSelf: "flex-end",
            }}
          >
            Forgot Password?
          </button>
        )}

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            height: 56,
            borderRadius: 28,
            background: colors.primary,
            border: "none",
            color: "#FFFFFF",
            fontSize: 18,
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: 24,
          }}
        >
          {isLogin ? "Sign In" : "Create Account"}
        </button>

        <div style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 24,
        }}>
          <div style={{ 
            flex: 1, 
            height: 1, 
            background: colors.border 
          }} />
          <span style={{ 
            margin: "0 16px", 
            fontSize: 14, 
            fontWeight: 500,
            color: colors.text,
          }}>OR</span>
          <div style={{ 
            flex: 1, 
            height: 1, 
            background: colors.border 
          }} />
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginBottom: 24,
        }}>
          <button
            style={{
              width: "100%",
              height: 56,
              borderRadius: 28,
              border: `1px solid ${colors.border}`,
              background: colors.card,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              cursor: "pointer",
            }}
          >
            <img 
              src="https://placehold.co/24x24" 
              alt="Google" 
              style={{ width: 24, height: 24 }} 
            />
            <span style={{ 
              fontSize: 16, 
              fontWeight: 500,
              color: colors.text,
            }}>Continue with Google</span>
          </button>

          <button
            style={{
              width: "100%",
              height: 56,
              borderRadius: 28,
              border: `1px solid ${colors.border}`,
              background: colors.card,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              cursor: "pointer",
            }}
          >
            <img 
              src="https://placehold.co/24x24" 
              alt="Apple" 
              style={{ width: 24, height: 24 }} 
            />
            <span style={{ 
              fontSize: 16, 
              fontWeight: 500,
              color: colors.text,
            }}>Continue with Apple</span>
          </button>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}>
          <span style={{ 
            fontSize: 14,
            color: colors.text,
          }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            onClick={toggleAuthMode}
            style={{
              background: "none",
              border: "none",
              color: colors.primary,
              fontSize: 14,
              fontWeight: 500,
              padding: 0,
              cursor: "pointer",
            }}
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
