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
        // For PDFs, we'll show a placeholder with the PDF icon
        setSelectedImage('/pdf-icon.png') // You'll need to add this icon to your public folder
      } else {
        setSelectedImage(reader.result as string)
      }
    }
    reader.readAsDataURL(file)

    setIsAnalyzing(true)
    const formData = new FormData()

    try {
      if (file.type === 'application/pdf') {
        // For PDFs, read as ArrayBuffer and create a new File
        const arrayBuffer = await file.arrayBuffer()
        const pdfBlob = new Blob([arrayBuffer], { type: 'application/pdf' })
        formData.append("file", pdfBlob, file.name)
      } else {
        // For images, convert to JPEG
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
        throw new Error(errorData.detail || "Failed to parse bill")
      }

      const data = await response.json()
      setParsedItems(data)
      toast({
        title: "Bill Parsed",
        description: "Receipt data extracted successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to analyze bill.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
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
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isAnalyzing ? (
              <Loader2 className="w-8 h-8 mb-2 text-gray-500 animate-spin" />
            ) : (
              <Upload className="w-8 h-8 mb-2 text-gray-500" />
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

      {/* Image preview */}
      {selectedImage && (
        <div className="relative w-full h-48 rounded-lg overflow-hidden">
          {currentFile?.type === 'application/pdf' ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50">
              <div className="text-4xl mb-2">📄</div>
              <p className="text-sm text-gray-500">{currentFile.name}</p>
            </div>
          ) : (
            <Image src={selectedImage} alt="Uploaded bill" fill className="object-cover" />
          )}
        </div>
      )}

      {/* Editable table section */}
      {parsedItems.length > 0 && (
        <div className="mt-6 space-y-4">
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
          >
            + Add New Item
          </Button>

          {parsedItems.map((item, index) => (
            <div key={index} className="border rounded-md p-4 space-y-3">
              {/* Product Name */}
              <div className="flex justify-between items-center">
                <Input
                  placeholder="Product Name"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, "name", e.target.value)}
                  className="w-full"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 text-red-500"
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
          <Button
      className="w-full bg-green-600 hover:bg-green-700 text-white"
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
