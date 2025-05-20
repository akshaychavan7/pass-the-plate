import { Metadata } from 'next'
import { MapView } from '@/components/map-view'

export const metadata: Metadata = {
  title: 'Map View | Pass the Plate',
  description: 'Find food sharing locations near you',
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