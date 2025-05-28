import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Check, X } from 'lucide-react'

interface RequestNotification {
  type: 'FOOD_REQUEST'
  itemId: string
  itemTitle: string
  requesterId: string
  requesterName: string
  timestamp: string
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED'
}

export function RequestNotification({ notification, onAccept, onReject }: {
  notification: RequestNotification
  onAccept: (notification: RequestNotification) => void
  onReject: (notification: RequestNotification) => void
}) {
  const { toast } = useToast()
  const [status, setStatus] = useState(notification.status)

  const handleAccept = async () => {
    try {
      // Here you would typically make an API call to your backend
      setStatus('ACCEPTED')
      onAccept(notification)
      
      toast({
        title: "Request Accepted",
        description: "You can now chat with the requester.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept request. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleReject = async () => {
    try {
      // Here you would typically make an API call to your backend
      setStatus('REJECTED')
      onReject(notification)
      
      toast({
        title: "Request Rejected",
        description: "The requester has been notified.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject request. Please try again.",
        variant: "destructive"
      })
    }
  }

  if (status !== 'PENDING') {
    return null
  }

  return (
    <Card className="p-4 mb-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">Food Request</h3>
          <p className="text-sm text-gray-600">
            {notification.requesterName} requested your item: {notification.itemTitle}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(notification.timestamp).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReject}
            className="text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4 mr-1" />
            Reject
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
            className="bg-green-600 hover:bg-green-700"
          >
            <Check className="w-4 h-4 mr-1" />
            Accept
          </Button>
        </div>
      </div>
    </Card>
  )
} 