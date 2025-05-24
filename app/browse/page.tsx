import { Metadata } from 'next'
import { MapView } from '@/components/map-view'

export const metadata: Metadata = {
  title: 'Browse | Pass the Plate',
  description: 'Browse available food items listed for donation and discounted prices',
}

export default function MapViewPage() {
  // In a real app, you would get this from environment variables
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  console.log("googleMapsApiKey", googleMapsApiKey)
  return (
    <main>
      <MapView apiKey={googleMapsApiKey} />
    </main>
  )
} 