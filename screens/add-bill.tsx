"use client"

import React, { useState } from "react"
import { useTheme } from "../context/theme-context"

const BillUpload = () => {
  const { colors } = useTheme()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [parsedData, setParsedData] = useState<
    { name: string; quantity: string; date_bought: string; estimated_expiry: string }[]
  >([])

  const handleUpload = async () => {
    if (!file) return alert("Please upload a file first")

    const formData = new FormData()
    formData.append("file", file)

    try {
      setLoading(true)
      const res = await fetch("http://localhost:3000/parse-bill-llm/", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Upload failed")
      const data = await res.json()
      setParsedData(data)
    } catch (err) {
      console.error(err)
      alert("Failed to parse bill.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h2 style={{ fontSize: 24, fontWeight: "bold", color: colors.text, marginBottom: 16 }}>
        Upload Grocery Bill
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        style={{ marginBottom: 12 }}
      />

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        style={{
          background: colors.primary,
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {loading ? "Parsing..." : "Parse Bill"}
      </button>

      {parsedData.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <h3 style={{ marginBottom: 8, color: colors.text }}>Parsed Items</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Product", "Quantity", "Date Bought", "Expiry"].map((heading) => (
                  <th
                    key={heading}
                    style={{
                      textAlign: "left",
                      padding: 8,
                      borderBottom: `1px solid ${colors.border}`,
                      color: colors.text,
                    }}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parsedData.map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: 8 }}>{item.name}</td>
                  <td style={{ padding: 8 }}>{item.quantity}</td>
                  <td style={{ padding: 8 }}>{item.date_bought}</td>
                  <td style={{ padding: 8 }}>{item.estimated_expiry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default BillUpload
