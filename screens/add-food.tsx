"use client"

import { useState } from "react"
import { Camera, Calendar, MapPin, DollarSign } from "lucide-react"
import { useTheme } from "../context/theme-context"

const AddFood = () => {
  const { colors } = useTheme()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [expiresIn, setExpiresIn] = useState("")
  const [isFree, setIsFree] = useState(true)
  const [price, setPrice] = useState("")
  const [location, setLocation] = useState("")
  const [image, setImage] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle the form submission, e.g., send to API
    window.alert("Food listing added! (This is a demo)")
  }

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: 24 }}>
      <h2 style={{ fontSize: 24, fontWeight: "bold", color: colors.text, marginBottom: 16 }}>Add Food Listing</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ color: colors.text }}>Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ padding: 8, borderRadius: 8, border: `1px solid ${colors.border}` }}
            required
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ color: colors.text }}>Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            style={{ padding: 8, borderRadius: 8, border: `1px solid ${colors.border}` }}
            required
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ color: colors.text }}>Tags (comma separated)</label>
          <input
            type="text"
            value={tags}
            onChange={e => setTags(e.target.value)}
            style={{ padding: 8, borderRadius: 8, border: `1px solid ${colors.border}` }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ color: colors.text }}>Expires In</label>
          <input
            type="text"
            value={expiresIn}
            onChange={e => setExpiresIn(e.target.value)}
            placeholder="e.g. 2 days"
            style={{ padding: 8, borderRadius: 8, border: `1px solid ${colors.border}` }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={isFree}
            onChange={e => setIsFree(e.target.checked)}
            id="isFree"
          />
          <label htmlFor="isFree" style={{ color: colors.text }}>Free</label>
        </div>
        {!isFree && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ color: colors.text }}>Price</label>
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              style={{ padding: 8, borderRadius: 8, border: `1px solid ${colors.border}` }}
              min="0"
              step="0.01"
            />
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ color: colors.text }}>Location</label>
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            style={{ padding: 8, borderRadius: 8, border: `1px solid ${colors.border}` }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ color: colors.text }}>Image (URL)</label>
          <input
            type="text"
            value={image || ""}
            onChange={e => setImage(e.target.value)}
            style={{ padding: 8, borderRadius: 8, border: `1px solid ${colors.border}` }}
            placeholder="Paste image URL here"
          />
        </div>
        <button
          type="submit"
          style={{
            background: colors.primary,
            color: "#fff",
            padding: "12px 0",
            border: "none",
            borderRadius: 8,
            fontWeight: "bold",
            fontSize: 16,
            cursor: "pointer"
          }}
        >
          Add Listing
        </button>
      </form>
    </div>
  )
}

export default AddFood
