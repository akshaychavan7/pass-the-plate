'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { foodItems } from '@/lib/dummy-data'
import { MapPin, Info, Search, Filter, List, Map, Navigation, MessageCircle, ChevronDown } from 'lucide-react'
import type { FoodItem } from '@/lib/dummy-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { useNavigation } from '@/context/navigation-context'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface MapViewProps {
  apiKey: string
  mapId?: string
  center?: { lat: number; lng: number }
  zoom?: number
}

export function MapView({ 
  apiKey, 
  mapId = 'pass_the_plate_map',
  center = { lat: 37.7749, lng: -122.4194 }, 
  zoom = 13 
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([])
  const observersRef = useRef<IntersectionObserver | null>(null)
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filteredItems, setFilteredItems] = useState<FoodItem[]>(foodItems)
  const [isMapLoading, setIsMapLoading] = useState(true)
  const [requestedItems, setRequestedItems] = useState<Set<string>>(new Set())
  const { toast } = useToast()
  const navigation = useNavigation()

  // Filter items based on search and tags
  useEffect(() => {
    let filtered = foodItems

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(item =>
        selectedTags.some(tag =>
          item.culturalTags.includes(tag) ||
          item.dietaryTags.includes(tag)
        )
      )
    }

    setFilteredItems(filtered)
  }, [searchQuery, selectedTags])

  // Cleanup function for map resources
  const cleanupMapResources = () => {
    // Clean up markers
    markersRef.current.forEach(marker => {
      marker.map = null
    })
    markersRef.current = []

    // Clean up map instance
    if (mapInstanceRef.current) {
      google.maps.event.clearInstanceListeners(mapInstanceRef.current)
      mapInstanceRef.current = null
    }

    // Clean up intersection observer
    if (observersRef.current) {
      observersRef.current.disconnect()
      observersRef.current = null
    }
  }

  // Initialize map
  useEffect(() => {
    if (!apiKey || viewMode !== 'map') {
      return
    }

    if (!mapRef.current) {
      return
    }

    let loader: Loader | null = null
    let watchId: number | null = null
    let isMounted = true

    const initMap = async () => {
      try {
        setIsMapLoading(true)
        setError(null)

        // Clean up existing resources
        cleanupMapResources()

        // Initialize the loader with required libraries
        loader = new Loader({
          apiKey,
          version: 'weekly',
          libraries: ['places', 'geometry', 'drawing', 'marker'],
          language: 'en',
          region: 'US'
        })

        // Load the Google Maps API
        await loader.load()

        if (!mapRef.current || !isMounted) {
          return
        }

        // Get user location first
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              if (!isMounted) return
              
              const location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
              setUserLocation(location)
              
              // Create map instance with user location
              const mapOptions: google.maps.MapOptions = {
                center: location,
                zoom: 15,
                mapId,
                styles: [
                  {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }]
                  }
                ],
                mapTypeControl: true,
                streetViewControl: false,
                fullscreenControl: true,
                zoomControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                gestureHandling: 'greedy'
              }

              const map = new google.maps.Map(mapRef.current!, mapOptions)
              
              if (!isMounted) {
                return
              }

              mapInstanceRef.current = map

              // Add markers for food items
              if (filteredItems && Array.isArray(filteredItems)) {
                const addMarkers = async () => {
                  const newMarkers = await Promise.all(filteredItems.map(async (item: FoodItem) => {
                    const lat = location.lat + (Math.random() - 0.5) * 0.1
                    const lng = location.lng + (Math.random() - 0.5) * 0.1

                    // Create marker element
                    const markerView = new google.maps.marker.PinElement({
                      background: item.id === selectedItem?.id ? '#00FF00' : '#FF4B4B',
                      borderColor: item.id === selectedItem?.id ? '#00FF00' : '#FF4B4B',
                      glyphColor: '#FFFFFF',
                      scale: item.id === selectedItem?.id ? 2 : 1.5
                    })

                    // Create advanced marker
                    const marker = new google.maps.marker.AdvancedMarkerElement({
                      map,
                      position: { lat, lng },
                      title: item.title,
                      content: markerView.element
                    })

                    // Add click listener
                    marker.addListener('click', () => {
                      if (isMounted) {
                        setSelectedItem(item)
                        map.panTo(marker.position as google.maps.LatLng)
                        map.setZoom(15)
                      }
                    })

                    return marker
                  }))

                  if (isMounted) {
                    markersRef.current = newMarkers
                  }
                }

                addMarkers()
              }
            },
            (error) => {
              if (isMounted) {
                console.error('Error getting location:', error)
                // Fallback to default center if geolocation fails
                const mapOptions: google.maps.MapOptions = {
                  center,
                  zoom,
                  mapId,
                  styles: [
                    {
                      featureType: 'poi',
                      elementType: 'labels',
                      stylers: [{ visibility: 'off' }]
                    }
                  ],
                  mapTypeControl: true,
                  streetViewControl: false,
                  fullscreenControl: true,
                  zoomControl: true,
                  mapTypeId: google.maps.MapTypeId.ROADMAP,
                  gestureHandling: 'greedy'
                }

                const map = new google.maps.Map(mapRef.current!, mapOptions)
                mapInstanceRef.current = map
              }
            },
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0
            }
          )
        }
      } catch (err) {
        if (isMounted) {
          console.error('Map initialization error:', err)
          if (err instanceof Error) {
            setError(`Failed to initialize map: ${err.message}`)
          } else {
            setError('Failed to initialize map. Please try again later.')
          }
        }
      } finally {
        if (isMounted) {
          setIsMapLoading(false)
        }
      }
    }

    // Initialize map after a short delay to ensure container is ready
    const timeoutId = setTimeout(() => {
      initMap()
    }, 100)

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
      
      // Clean up all map resources
      cleanupMapResources()
    }
  }, [apiKey, mapId, viewMode, selectedItem])

  // Separate effect for updating markers when filtered items change
  useEffect(() => {
    if (!mapInstanceRef.current || !filteredItems || viewMode !== 'map') return

    // Clean up existing markers
    markersRef.current.forEach(marker => {
      marker.map = null
    })
    markersRef.current = []

    // Add new markers
    const addMarkers = async () => {
      const newMarkers = await Promise.all(filteredItems.map(async (item: FoodItem) => {
        const lat = center.lat + (Math.random() - 0.5) * 0.1
        const lng = center.lng + (Math.random() - 0.5) * 0.1

        const markerView = new google.maps.marker.PinElement({
          background: item.id === selectedItem?.id ? '#00FF00' : '#FF4B4B', // Highlight selected item
          borderColor: item.id === selectedItem?.id ? '#00FF00' : '#FF4B4B',
          glyphColor: '#FFFFFF',
          scale: item.id === selectedItem?.id ? 2 : 1.5 // Make selected item marker larger
        })

        const marker = new google.maps.marker.AdvancedMarkerElement({
          map: mapInstanceRef.current!,
          position: { lat, lng },
          title: item.title,
          content: markerView.element
        })

        marker.addListener('click', () => {
          setSelectedItem(item)
          mapInstanceRef.current!.panTo(marker.position as google.maps.LatLng)
          mapInstanceRef.current!.setZoom(15)
        })

        return marker
      }))

      markersRef.current = newMarkers
    }

    addMarkers()
  }, [filteredItems, center, viewMode, selectedItem])

  // Separate effect for handling user location updates
  useEffect(() => {
    if (!mapInstanceRef.current || !userLocation || viewMode !== 'map' || selectedItem) return

    mapInstanceRef.current.panTo(userLocation)
    mapInstanceRef.current.setZoom(15)
  }, [userLocation, viewMode, selectedItem])

  const handleUseLocation = () => {
    if (userLocation && mapInstanceRef.current) {
      mapInstanceRef.current.panTo(userLocation)
      mapInstanceRef.current.setZoom(15)
    }
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const allTags = Array.from(new Set(
    foodItems.flatMap(item => [...item.culturalTags, ...item.dietaryTags])
  ))

  const handleRequestItem = async (item: FoodItem) => {
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate the request
      setRequestedItems(prev => new Set([...prev, item.id]))
      
      // Create a notification for the donor
      const notification = {
        type: 'FOOD_REQUEST',
        itemId: item.id,
        itemTitle: item.title,
        requesterId: 'current-user-id', // Replace with actual user ID
        requesterName: 'Current User', // Replace with actual user name
        timestamp: new Date().toISOString(),
        status: 'PENDING'
      }

      // Store the notification (in a real app, this would be in your backend)
      localStorage.setItem(`notification_${item.id}`, JSON.stringify(notification))

      toast({
        title: "Request Sent",
        description: "The donor will be notified of your request.",
      })

      // Navigate to chat section
      navigation.navigate('/chat')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send request. Please try again.",
        variant: "destructive"
      })
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-gray-50">
        <div className="text-center p-4">
          <p className="text-red-600 mb-2">{error}</p>
          <p className="text-sm text-gray-600">Please check your API key and try again</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full">
      {/* Search and Filter Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 bg-white rounded-lg shadow-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for food items..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'map' ? 'default' : 'outline'}
              onClick={() => setViewMode('map')}
              className="shrink-0"
            >
              <Map className="w-5 h-5 mr-2" />
              Map
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              onClick={() => setViewMode('list')}
              className="shrink-0"
            >
              <List className="w-5 h-5 mr-2" />
              List
            </Button>
          </div>
        </div>

        {/* Tags Accordion */}
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="tags" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {selectedTags.length > 0 
                    ? `${selectedTags.length} filter${selectedTags.length === 1 ? '' : 's'} active`
                    : 'Filter by tags'}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2 pt-2">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Map View */}
      {viewMode === 'map' && (
        <div className="relative w-full h-full">
          {isMapLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75 z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Loading map...</p>
              </div>
            </div>
          )}
          <div 
            ref={mapRef} 
            className="w-full h-full min-h-[500px] bg-gray-100"
            style={{ height: 'calc(100vh - 4rem)' }}
          />
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="pt-32 px-4 pb-4 h-full overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {item.culturalTags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      {item.location}
                    </span>
                    <span className="font-medium">
                      {item.isFree ? 'Free' : `$${item.price}`}
                    </span>
                  </div>
                  <div className="mt-4">
                    <Button
                      variant={requestedItems.has(item.id) ? "secondary" : "default"}
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (!requestedItems.has(item.id)) {
                          handleRequestItem(item)
                        }
                      }}
                      disabled={requestedItems.has(item.id)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {requestedItems.has(item.id) ? 'Request Sent' : 'Request Item'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Selected Item Info Panel */}
      {selectedItem && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto">
          <div className="flex items-start gap-4">
            {selectedItem.image && (
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{selectedItem.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{selectedItem.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedItem.culturalTags.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{selectedItem.location}</span>
                {selectedItem.distance && (
                  <span className="text-gray-400">• {selectedItem.distance}</span>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-medium">
                    {selectedItem.isFree ? 'Free' : `$${selectedItem.price}`}
                  </span>
                  <span className="text-gray-600"> • Expires: {new Date(selectedItem.expiryDate).toLocaleDateString()}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedItem(null)}
                >
                  <Info className="w-5 h-5" />
                </Button>
              </div>
              <div className="mt-4">
                <Button
                  variant={requestedItems.has(selectedItem.id) ? "secondary" : "default"}
                  className="w-full"
                  onClick={() => {
                    if (!requestedItems.has(selectedItem.id)) {
                      handleRequestItem(selectedItem)
                    }
                  }}
                  disabled={requestedItems.has(selectedItem.id)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {requestedItems.has(selectedItem.id) ? 'Request Sent' : 'Request Item'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 