'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Upload, Tag } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().min(1, 'Description is required').max(500, 'Description is too long'),
  quantity: z.string().min(1, 'Quantity is required'),
  unit: z.string().min(1, 'Unit is required'),
  expiryDate: z.date({
    required_error: 'Expiry date is required',
  }),
  location: z.string().min(1, 'Location is required'),
  dietaryInfo: z.string().optional(),
  allergens: z.string().optional(),
  pickupInstructions: z.string().optional(),
  image: z.string().optional(),
  culturalTags: z.array(z.string()).optional(),
  dietaryTags: z.array(z.string()).optional(),
  price: z.string().optional(),
  isFree: z.boolean().default(true),
})

type FormData = z.infer<typeof formSchema>

const units = [
  'kg',
  'g',
  'lb',
  'oz',
  'pieces',
  'boxes',
  'containers',
  'other',
]

const culturalTags = [
  'Halal',
  'Kosher',
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Nut-Free',
  'Asian',
  'African',
  'Latin',
  'Mediterranean',
  'Middle Eastern',
  'European',
  'American',
]

const dietaryTags = [
  'Low-Sodium',
  'Low-Sugar',
  'High-Protein',
  'Low-Carb',
  'Keto',
  'Paleo',
  'Raw',
  'Organic',
  'Non-GMO',
]

export function AddFoodForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      unit: 'kg',
      isFree: true,
      culturalTags: [],
      dietaryTags: [],
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true)
      // TODO: Implement API call to save food item
      console.log('Form data:', data)
      toast({
        title: 'Success!',
        description: 'Your food item has been shared.',
      })
      reset()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to share food item. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleTag = (tag: string, type: 'culturalTags' | 'dietaryTags') => {
    const currentTags = watch(type) || []
    if (currentTags.includes(tag)) {
      setValue(type, currentTags.filter(t => t !== tag))
    } else {
      setValue(type, [...currentTags, tag])
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <Input
            id="title"
            {...register('title')}
            placeholder="What food are you sharing?"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="quantity" className="text-sm font-medium">
            Quantity
          </label>
          <div className="flex gap-2">
            <Input
              id="quantity"
              type="number"
              step="0.1"
              {...register('quantity')}
              placeholder="Amount"
              className="flex-1"
            />
            <select
              {...register('unit')}
              className="w-24 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
          {errors.quantity && (
            <p className="text-sm text-red-500">{errors.quantity.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Describe the food item, its condition, and any other relevant details..."
          className="min-h-[100px]"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="expiryDate" className="text-sm font-medium">
            Expiry Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !watch('expiryDate') && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {watch('expiryDate') ? (
                  format(watch('expiryDate'), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={watch('expiryDate')}
                onSelect={(date) => setValue('expiryDate', date as Date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.expiryDate && (
            <p className="text-sm text-red-500">{errors.expiryDate.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium">
            Location
          </label>
          <Input
            id="location"
            {...register('location')}
            placeholder="Where can people pick up the food?"
          />
          {errors.location && (
            <p className="text-sm text-red-500">{errors.location.message}</p>
          )}
        </div>
      </div>

      {/* Cultural and Dietary Tags */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Cultural & Dietary Tags</label>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Cultural Relevance</h4>
              <div className="flex flex-wrap gap-2">
                {culturalTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag, 'culturalTags')}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm transition",
                      watch('culturalTags')?.includes(tag)
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Dietary Preferences</h4>
              <div className="flex flex-wrap gap-2">
                {dietaryTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag, 'dietaryTags')}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm transition",
                      watch('dietaryTags')?.includes(tag)
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              {...register('isFree')}
              value="true"
              className="form-radio"
            />
            <span>Free</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              {...register('isFree')}
              value="false"
              className="form-radio"
            />
            <span>Discounted Price</span>
          </label>
        </div>
        {!watch('isFree') && (
          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">
              Price
            </label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register('price')}
              placeholder="Enter discounted price"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="allergens" className="text-sm font-medium">
          Allergens
        </label>
        <Input
          id="allergens"
          {...register('allergens')}
          placeholder="e.g., Contains nuts, dairy, etc."
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="pickupInstructions" className="text-sm font-medium">
          Pickup Instructions
        </label>
        <Textarea
          id="pickupInstructions"
          {...register('pickupInstructions')}
          placeholder="Any specific instructions for pickup?"
          className="min-h-[80px]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Food Image
        </label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
            </div>
            <input type="file" className="hidden" accept="image/*" />
          </label>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Sharing...' : 'Share Food'}
      </Button>
    </form>
  )
} 