
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

interface Event {
  id: string
  name: string
  type: 'GA' | 'Expo'
  year: number
  city: string
  country: string
  startDate: string
  endDate: string
  role?: string
  status: 'attended' | 'registered' | 'cancelled'
}

export function EventsTab() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getEventStatusBadge = (status: Event['status']) => {
    switch (status) {
      case 'attended':
        return <Badge variant="default" className="text-xs">Attended</Badge>
      case 'registered':
        return <Badge variant="secondary" className="text-xs">Registered</Badge>
      case 'cancelled':
        return <Badge variant="destructive" className="text-xs">Cancelled</Badge>
    }
  }

  const events: Event[] = [
    {
      id: '1',
      name: 'GA 2024',
      type: 'GA',
      year: 2024,
      city: 'Geneva',
      country: 'Switzerland',
      startDate: '2024-09-15',
      endDate: '2024-09-18',
      role: 'Delegate',
      status: 'attended'
    },
    {
      id: '2',
      name: 'Expo 2023',
      type: 'Expo',
      year: 2023,
      city: 'Dubai',
      country: 'UAE',
      startDate: '2023-10-01',
      endDate: '2023-10-28',
      role: 'Trade Representative',
      status: 'attended'
    },
    {
      id: '3',
      name: 'GA 2023',
      type: 'GA',
      year: 2023,
      city: 'New York',
      country: 'USA',
      startDate: '2023-09-19',
      endDate: '2023-09-26',
      role: 'Observer',
      status: 'attended'
    },
    {
      id: '4',
      name: 'Expo 2025',
      type: 'Expo',
      year: 2025,
      city: 'Osaka',
      country: 'Japan',
      startDate: '2025-04-13',
      endDate: '2025-10-13',
      role: 'Delegate',
      status: 'registered'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Event Participations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{event.name}</div>
                  <div className="text-sm text-gray-600">{event.city}, {event.country}</div>
                  <div className="text-sm text-gray-500">
                    {formatDate(event.startDate)} - {formatDate(event.endDate)}
                  </div>
                  {event.role && (
                    <div className="text-xs text-gray-500">Role: {event.role}</div>
                  )}
                </div>
                <div className="text-right">
                  {getEventStatusBadge(event.status)}
                  <div className="text-xs text-gray-500 mt-1">{event.year}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
