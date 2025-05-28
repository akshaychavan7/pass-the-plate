"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Upload, Loader2 } from "lucide-react"
import Image from "next/image"
import { format, parseISO } from "date-fns"
import { DatePicker } from "@/components/ui/DatePicker"

interface BillItem {
  name: string
  quantity: string
  date_bought: string
  estimated_expiry: string
}

export function BillImageAnalyzer() {
  const { toast } = useToast()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [parsedItems, setParsedItems] = useState<BillItem[]>([])
  const [currentFile, setCurrentFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setCurrentFile(file)
    setParsedItems([])

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size must be less than 5MB",
        variant: "destructive",
      })
      return
    }

    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      toast({
        title: 'Error',
        description: 'Please upload an image or PDF file',
        variant: 'destructive',
      })
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      if (file.type === 'application/pdf') {
        setSelectedImage('/pdf-icon.png')
      } else {
        setSelectedImage(reader.result as string)
      }
    }
    reader.readAsDataURL(file)

    setIsAnalyzing(true)
    const formData = new FormData()

    try {
      if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer()
        const pdfBlob = new Blob([arrayBuffer], { type: 'application/pdf' })
        formData.append("file", pdfBlob, file.name)
      } else {
        const image = await createImageBitmap(file)
        const canvas = document.createElement("canvas")
        canvas.width = image.width
        canvas.height = image.height
        const ctx = canvas.getContext("2d")
        if (!ctx) throw new Error("Could not get canvas context")

        ctx.drawImage(image, 0, 0)
        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob((blob) => {
            if (blob) resolve(blob)
            else reject("Could not convert image to blob")
          }, "image/jpeg", 0.9)
        })

        formData.append("file", blob, "bill.jpg")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process file. Please try again.",
        variant: "destructive",
      })
      setIsAnalyzing(false)
      return
    }

    try {
      const response = await fetch("http://localhost:8000/parse-bill-llm/", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Backend error:", errorData)
        throw new Error(errorData.detail || "Failed to parse bill")
      }

      const data = await response.json()
      if (!Array.isArray(data)) {
        console.error("Invalid response format:", data)
        throw new Error("Invalid response format from server")
      }

      setParsedItems(data)
      toast({
        title: "Bill Parsed",
        description: "Receipt data extracted successfully!",
      })
    } catch (error) {
      console.error("Error parsing bill:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to analyze bill.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      const event = { target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>
      handleImageUpload(event)
    }
  }

  const handleItemChange = (index: number, field: keyof BillItem, value: string) => {
    const updated = [...parsedItems]
    updated[index][field] = value
    setParsedItems(updated)
  }

  return (
    <div className="space-y-6">
      {/* Upload area */}
      <div 
        className={`flex items-center justify-center w-full transition-all duration-300 ${
          isDragging ? 'scale-105' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label className={`
          flex flex-col items-center justify-center w-full h-48 
          border-2 border-dashed rounded-lg cursor-pointer 
          transition-all duration-300
          ${isDragging 
            ? 'border-green-500 bg-green-50' 
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
          }
        `}>
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isAnalyzing ? (
              <div className="relative">
                <Loader2 className="w-8 h-8 mb-2 text-green-600 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-ping" />
                </div>
              </div>
            ) : (
              <Upload className={`w-8 h-8 mb-2 ${isDragging ? 'text-green-600' : 'text-gray-500'}`} />
            )}
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, JPEG or PDF (MAX. 5MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*,.pdf"
            onChange={handleImageUpload}
            disabled={isAnalyzing}
          />
        </label>
      </div>

      {/* File preview */}
      {selectedImage && (
        <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
          {currentFile?.type === 'application/pdf' ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="text-5xl mb-2 transform transition-transform duration-300 hover:scale-110">📄</div>
              <p className="text-sm text-gray-600 font-medium">{currentFile.name}</p>
              <p className="text-xs text-gray-500 mt-1">
                {(currentFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <Image 
              src={selectedImage} 
              alt="Uploaded bill" 
              fill 
              className="object-cover transition-transform duration-300 hover:scale-105" 
            />
          )}
        </div>
      )}

      {/* Parsed items section */}
      {parsedItems.length > 0 && (
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Parsed Items</h3>
            <Button
              variant="outline"
              onClick={() =>
                setParsedItems((prev) => [
                  ...prev,
                  {
                    name: "",
                    quantity: "",
                    date_bought: format(new Date(), "yyyy-MM-dd"),
                    estimated_expiry: format(new Date(), "yyyy-MM-dd"),
                  },
                ])
              }
              className="flex items-center gap-2 hover:bg-green-50 hover:text-green-600 transition-colors"
            >
              <span className="text-lg">+</span> Add New Item
            </Button>
          </div>

          <div className="space-y-4">
            {parsedItems.map((item, index) => (
              <div 
                key={index} 
                className="border rounded-lg p-4 space-y-3 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Product Name */}
                <div className="flex justify-between items-center">
                  <Input
                    placeholder="Product Name"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, "name", e.target.value)}
                    className="w-full focus:ring-2 focus:ring-green-500"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={() => {
                      const updated = [...parsedItems]
                      updated.splice(index, 1)
                      setParsedItems(updated)
                    }}
                  >
                    🗑️
                  </Button>
                </div>

                {/* Quantity, Date Bought, Expiry */}
                <div className="grid grid-cols-3 gap-4">
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                    className="focus:ring-2 focus:ring-green-500"
                  />
                  <DatePicker
                    date={parseISO(item.date_bought)}
                    onChange={(date) => {
                      if (date) handleItemChange(index, "date_bought", format(date, "yyyy-MM-dd"))
                    }}
                  />
                  <DatePicker
                    date={parseISO(item.estimated_expiry)}
                    onChange={(date) => {
                      if (date) handleItemChange(index, "estimated_expiry", format(date, "yyyy-MM-dd"))
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => {
              console.log("Add to pantry:", parsedItems)
              // TODO: Add to backend/API/localStorage
            }}
          >
            Add to Pantry
          </Button>
        </div>
      )}
    </div>
  )
}
