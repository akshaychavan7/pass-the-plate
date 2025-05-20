'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

interface FoodItem {
  id: number
  title: string
  location: string
  distance: string
  image: string
  expiresIn: string
  coordinates: [number, number]
}

interface MapProps {
  initialCenter?: [number, number]
  initialZoom?: number
  foodItems?: FoodItem[]
}

export default function Map({ 
  initialCenter = [-74.5, 40], 
  initialZoom = 9,
  foodItems = []
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token) {
      setError('Mapbox token is missing. Please add NEXT_PUBLIC_MAPBOX_TOKEN to your .env.local file')
      return
    }

    try {
      mapboxgl.accessToken = token

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: initialCenter,
        zoom: initialZoom
      })

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

      // Add geolocation control
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        }),
        'top-right'
      )

      return () => {
        map.current?.remove()
      }
    } catch (err) {
      setError('Failed to initialize map. Please check your Mapbox token.')
      console.error('Map initialization error:', err)
    }
  }, [initialCenter, initialZoom])

  // Update markers when food items change
  useEffect(() => {
    if (!map.current) return

    // Remove existing markers
    markers.current.forEach(marker => marker.remove())
    markers.current = []

    // Add new markers
    foodItems.forEach(item => {
      // Create custom marker element
      const el = document.createElement('div')
      el.className = 'food-marker'
      el.innerHTML = `
        <div class="w-8 h-8 bg-green-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      `

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h3 class="font-semibold">${item.title}</h3>
          <p class="text-sm text-gray-600">${item.location}</p>
          <p class="text-sm text-green-600">${item.distance} away</p>
        </div>
      `)

      // Create and add marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat(item.coordinates)
        .setPopup(popup)
        .addTo(map.current!)

      // Add click handler
      el.addEventListener('click', () => {
        setSelectedItem(item)
      })

      markers.current.push(marker)
    })
  }, [foodItems])

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)] bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm max-w-md">
          <h3 className="text-lg font-semibold text-red-600 mb-2">Map Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            To fix this:
            <ol className="list-decimal list-inside mt-2 text-left">
              <li>Sign up at https://account.mapbox.com/access-tokens/</li>
              <li>Create a new access token</li>
              <li>Add NEXT_PUBLIC_MAPBOX_TOKEN to your .env.local file</li>
              <li>Restart your development server</li>
            </ol>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-full min-h-[calc(100vh-64px)]"
    />
  )
} 