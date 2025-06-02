
import { StatsCard } from "@/components/StatsCard"
import { ContactCard, Contact } from "@/components/ContactCard"
import { EventCard, Event } from "@/components/EventCard"
import { Users, Calendar, Building, UserCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  // Mock data - in a real app, this would come from your backend
  const stats = {
    totalContacts: 247,
    individuals: 198,
    organizations: 49,
    upcomingEvents: 12
  }

  const recentContacts: Contact[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      type: 'individual',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      organization: 'Tech Solutions Inc',
      eventsCount: 5,
      lastContact: '2 days ago'
    },
    {
      id: '2',
      name: 'Tech Solutions Inc',
      type: 'organization',
      email: 'contact@techsolutions.com',
      location: 'San Francisco, CA',
      eventsCount: 12,
      lastContact: '1 week ago'
    },
    {
      id: '3',
      name: 'Michael Chen',
      type: 'individual',
      email: 'michael.chen@startup.io',
      phone: '+1 (555) 987-6543',
      organization: 'Startup.io',
      eventsCount: 3,
      lastContact: '3 days ago'
    }
  ]

  const upcomingEvents: Event[] = [
    {
      id: '1',
      title: 'Q4 Business Review',
      description: 'Quarterly review meeting with key stakeholders',
      date: '2024-12-15',
      time: '2:00 PM',
      location: 'Conference Room A',
      participantsCount: 8,
      status: 'upcoming',
      type: 'meeting'
    },
    {
      id: '2',
      title: 'Tech Conference 2024',
      description: 'Annual technology conference and networking event',
      date: '2024-12-20',
      time: '9:00 AM',
      location: 'Downtown Convention Center',
      participantsCount: 150,
      status: 'upcoming',
      type: 'conference'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your contacts and events.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Contacts"
          value={stats.totalContacts}
          icon={Users}
          description="All contacts in your CRM"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Individuals"
          value={stats.individuals}
          icon={UserCheck}
          description="Individual contacts"
        />
        <StatsCard
          title="Organizations"
          value={stats.organizations}
          icon={Building}
          description="Company contacts"
        />
        <StatsCard
          title="Upcoming Events"
          value={stats.upcomingEvents}
          icon={Calendar}
          description="Events this month"
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Recent Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onEdit={(contact) => console.log('Edit contact:', contact)}
                onViewEvents={(contact) => console.log('View events for:', contact)}
              />
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={(event) => console.log('Edit event:', event)}
                onViewParticipants={(event) => console.log('View participants for:', event)}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
