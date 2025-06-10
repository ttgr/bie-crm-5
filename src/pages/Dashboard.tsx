import { StatsCard } from "@/components/StatsCard"
import { ContactCard, Contact } from "@/components/ContactCard"
import { EventCard, Event } from "@/components/EventCard"
import { DelegateCard } from "@/components/DelegateCard"
import { Users, Calendar, Building, UserCheck, FileText, Download, Vote } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Delegate, DelegateDocument } from "@/types/delegate"

export default function Dashboard() {
  // Mock data - in a real app, this would come from your backend
  const stats = {
    activeDelegates: 15,
    activeMemberStates: 8,
    memberStatesWithVotingRight: 6, // Subset of member states that have voting rights
  }

  // Calculate Quorum as 2/3 of Member States with Voting Right
  const quorum = Math.ceil((2/3) * stats.memberStatesWithVotingRight)

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

  const recentDelegates: Delegate[] = [
    {
      id: '1',
      contactId: '1',
      contactName: 'Sarah Johnson',
      contactType: 'individual',
      startDate: '2024-11-15',
      isActive: true,
      membershipType: 'delegate',
      memberState: 'California',
      isNewsletterSubscribed: true,
      isBulletinSubscribed: true,
      role: 'Senior Delegate',
      emails: ['sarah.johnson@email.com'],
      phones: ['+1 (555) 123-4567'],
      notes: [
        {
          id: '1',
          text: 'Excellent communication skills',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          text: 'Very responsive to emails',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      documents: [
        {
          id: 'doc1',
          subject: 'Q4 Policy Review Meeting',
          type: 'Meeting (In presence)',
          dateTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          fileName: 'Q4-Policy-Review.pdf',
          fileUrl: '/documents/Q4-Policy-Review.pdf',
          attachedDelegates: ['1', '2'],
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'doc2',
          subject: 'Annual Budget Report 2024',
          type: 'Report',
          dateTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          fileName: 'Annual-Budget-2024.pdf',
          fileUrl: '/documents/Annual-Budget-2024.pdf',
          attachedDelegates: ['1'],
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      language: 'English'
    },
    {
      id: '2',
      contactId: '2',
      contactName: 'Global Corp',
      contactType: 'organization',
      startDate: '2024-11-10',
      isActive: true,
      membershipType: 'member_state',
      isNewsletterSubscribed: false,
      isBulletinSubscribed: true,
      emails: ['contact@globalcorp.com'],
      phones: ['+1 (555) 987-6543'],
      documents: [
        {
          id: 'doc3',
          subject: 'Strategic Partnership Agreement',
          type: 'Contract',
          dateTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          fileName: 'Partnership-Agreement.pdf',
          fileUrl: '/documents/Partnership-Agreement.pdf',
          attachedDelegates: ['2', '3'],
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      language: 'English'
    },
    {
      id: '3',
      contactId: '3',
      contactName: 'Emma Wilson',
      contactType: 'individual',
      startDate: '2024-11-05',
      isActive: true,
      membershipType: 'delegate',
      memberState: 'New York',
      isNewsletterSubscribed: true,
      isBulletinSubscribed: false,
      role: 'Policy Advisor',
      emails: ['emma.wilson@gov.ny.us', 'e.wilson@personal.com'],
      phones: ['+1 (555) 456-7890'],
      notes: [
        {
          id: '3',
          text: 'Specializes in environmental policy',
          createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      documents: [
        {
          id: 'doc4',
          subject: 'Environmental Impact Assessment',
          type: 'Report',
          dateTime: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          fileName: 'Environmental-Impact.pdf',
          fileUrl: '/documents/Environmental-Impact.pdf',
          attachedDelegates: ['3'],
          createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'doc5',
          subject: 'Online Climate Summit Notes',
          type: 'Meeting (Online)',
          dateTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          fileName: 'Climate-Summit-Notes.pdf',
          fileUrl: '/documents/Climate-Summit-Notes.pdf',
          attachedDelegates: ['3', '4'],
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      language: 'English'
    },
    {
      id: '4',
      contactId: '4',
      contactName: 'Innovation Labs',
      contactType: 'organization',
      startDate: '2024-11-01',
      isActive: true,
      membershipType: 'member_state',
      isNewsletterSubscribed: true,
      isBulletinSubscribed: false,
      emails: ['info@innovationlabs.com'],
      phones: ['+1 (555) 234-5678', '+1 (555) 234-5679'],
      documents: [
        {
          id: 'doc6',
          subject: 'Technology Roadmap 2025',
          type: 'Report',
          dateTime: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
          fileName: 'Tech-Roadmap-2025.pdf',
          fileUrl: '/documents/Tech-Roadmap-2025.pdf',
          attachedDelegates: ['4'],
          createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      language: 'French'
    },
    {
      id: '5',
      contactId: '5',
      contactName: 'John Smith',
      contactType: 'individual',
      startDate: '2024-10-28',
      isActive: true,
      membershipType: 'delegate',
      memberState: 'Texas',
      isNewsletterSubscribed: false,
      isBulletinSubscribed: true,
      role: 'Trade Representative',
      emails: ['john.smith@texas.gov'],
      phones: ['+1 (555) 345-6789'],
      documents: [
        {
          id: 'doc7',
          subject: 'Trade Agreement Review',
          type: 'Meeting (In presence)',
          dateTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          fileName: 'Trade-Agreement-Review.pdf',
          fileUrl: '/documents/Trade-Agreement-Review.pdf',
          attachedDelegates: ['5'],
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      language: 'English'
    },
    {
      id: '6',
      contactId: '6',
      contactName: 'Future Systems',
      contactType: 'organization',
      startDate: '2024-10-25',
      isActive: true,
      membershipType: 'member_state',
      isNewsletterSubscribed: true,
      isBulletinSubscribed: true,
      emails: ['contact@futuresystems.com', 'support@futuresystems.com'],
      phones: ['+1 (555) 567-8901'],
      documents: [
        {
          id: 'doc8',
          subject: 'Digital Transformation Strategy',
          type: 'Report',
          dateTime: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
          fileName: 'Digital-Transformation.pdf',
          fileUrl: '/documents/Digital-Transformation.pdf',
          attachedDelegates: ['6'],
          createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'doc9',
          subject: 'Security Compliance Framework',
          type: 'Other',
          dateTime: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
          fileName: 'Security-Compliance.pdf',
          fileUrl: '/documents/Security-Compliance.pdf',
          attachedDelegates: ['6'],
          createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'doc10',
          subject: 'Quarterly Performance Review',
          type: 'Meeting (Online)',
          dateTime: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          fileName: 'Q3-Performance-Review.pdf',
          fileUrl: '/documents/Q3-Performance-Review.pdf',
          attachedDelegates: ['6', '1'],
          createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      language: 'French'
    }
  ]

  // Get all documents from all delegates and sort by creation date
  const allDocuments: DelegateDocument[] = recentDelegates
    .flatMap(delegate => delegate.documents || [])
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10)

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getTypeColor = (type: DelegateDocument['type']) => {
    switch (type) {
      case 'Meeting (In presence)':
        return 'bg-blue-100 text-blue-800'
      case 'Meeting (Online)':
        return 'bg-purple-100 text-purple-800'
      case 'Report':
        return 'bg-green-100 text-green-800'
      case 'Contract':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getAttachedDelegatesNames = (attachedDelegateIds: string[]): string[] => {
    return attachedDelegateIds.map(id => {
      const delegate = recentDelegates.find(d => d.id === id)
      return delegate ? delegate.contactName : `Unknown Delegate (${id})`
    })
  }

  const handleDownloadDocument = (document: DelegateDocument) => {
    console.log('Downloading document:', document.fileName)
    // In a real implementation, this would download the file
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your contacts and events.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Current Delegates"
          value={stats.activeDelegates}
          icon={UserCheck}
          description="Active individual delegates"
          trend={{ value: 2, isPositive: true }}
        />
        <StatsCard
          title="Member States"
          value={stats.activeMemberStates}
          icon={Building}
          description="Active member organizations"
          trend={{ value: 1, isPositive: true }}
        />
        <StatsCard
          title="Member States with right to Vote"
          value={stats.memberStatesWithVotingRight}
          icon={Vote}
          description="Member states with voting rights"
        />
        <StatsCard
          title="Quorum"
          value={quorum}
          icon={Users}
          description="2/3 of voting member states"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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

        {/* Recent Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Documents
              <Badge variant="secondary">{allDocuments.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {allDocuments.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No documents yet</p>
            ) : (
              allDocuments.map((document) => {
                const attachedDelegatesNames = getAttachedDelegatesNames(document.attachedDelegates)
                return (
                  <div key={document.id} className="p-3 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{document.subject}</h4>
                        <div className="flex items-center gap-2">
                          <Badge className={getTypeColor(document.type)} variant="secondary">
                            {document.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDateTime(document.dateTime)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <FileText className="h-3 w-3 text-red-600" />
                          <span className="truncate">{document.fileName}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-gray-600 font-medium">
                            Attached to {attachedDelegatesNames.length} delegate(s):
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {attachedDelegatesNames.map((name, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadDocument(document)}
                        className="h-8 w-8 p-0 shrink-0"
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )
              })
            )}
          </CardContent>
        </Card>

        {/* Recent Delegate Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Recent Memberships
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {recentDelegates.map((delegate) => (
              <DelegateCard
                key={delegate.id}
                delegate={delegate}
                onEndMembership={(delegate) => console.log('End membership for:', delegate)}
                onViewContact={(delegate) => console.log('View contact for:', delegate)}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
