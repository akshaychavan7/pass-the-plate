'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Upload, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface FoodAnalysis {
  food_name: string
  refrigeration_time: string
  nutritional_factors: string
  health_considerations: string
  benefits: string
  additional_info: string
}

interface FoodImageAnalyzerProps {
  onAnalysisComplete: (analysis: FoodAnalysis) => void
}

export function FoodImageAnalyzer({ onAnalysisComplete }: FoodImageAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { toast } = useToast()

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'File size must be less than 5MB',
        variant: 'destructive',
      })
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please upload an image file',
        variant: 'destructive',
      })
      return
    }

    // Preview the image
    const reader = new FileReader()
    reader.onloadend = () => {
      setSelectedImage(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Analyze the image
    setIsAnalyzing(true)
    const formData = new FormData()
    
    // Convert image to JPEG if needed
    try {
      const image = await createImageBitmap(file)
      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Could not get canvas context')
      
      ctx.drawImage(image, 0, 0)
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob)
          else throw new Error('Could not convert image to blob')
        }, 'image/jpeg', 0.9)
      })
      
      formData.append('file', blob, 'image.jpg')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process image. Please try again.',
        variant: 'destructive',
      })
      setIsAnalyzing(false)
      return
    }

    try {
      const response = await fetch('http://localhost:8000/analyze-food-image/', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to analyze image')
      }

      const analysis = await response.json()
      onAnalysisComplete(analysis)
      toast({
        title: 'Analysis Complete',
        description: 'Food image has been analyzed successfully.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to analyze image. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-4">
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
            <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isAnalyzing}
          />
        </label>
      </div>

      {selectedImage && (
        <div className="relative w-full h-48 rounded-lg overflow-hidden">
          <Image
            src={selectedImage}
            alt="Selected food"
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  )
} 