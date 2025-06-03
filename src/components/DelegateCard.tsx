import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Building, Calendar, CalendarOff, MapPin, Mail, Phone, FileText, Bell, Globe, StickyNote } from "lucide-react"
import { Delegate, DelegateNote } from "@/types/delegate"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { NotesModal } from "@/components/NotesModal"
import { DelegateProfile } from "@/components/DelegateProfile"

interface DelegateCardProps {
  delegate: Delegate
  onEndMembership?: (delegate: Delegate) => void
  onViewContact?: (delegate: Delegate) => void
}

export function DelegateCard({ delegate, onEndMembership, onViewContact }: DelegateCardProps) {
  const navigate = useNavigate()
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  
  const initials = delegate.contactName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const handleViewContact = () => {
    setIsProfileModalOpen(true)
  }

  const handleAddNote = (noteText: string) => {
    // In a real app, this would save to the backend
    const newNote: DelegateNote = {
      id: Date.now().toString(),
      text: noteText,
      createdAt: new Date().toISOString()
    }
    console.log('Adding note:', newNote, 'for delegate:', delegate.id)
    // This would update the delegate's notes in the backend
  }

  const getLanguageIcon = (language: 'English' | 'French') => {
    if (language === 'French') {
      return (
        <div className="flex items-center gap-1 text-sm text-gray-600" title="French">
          <div className="w-4 h-3 flex">
            <div className="w-1/3 bg-blue-600 rounded-l"></div>
            <div className="w-1/3 bg-white"></div>
            <div className="w-1/3 bg-red-600 rounded-r"></div>
          </div>
          <span className="text-xs">FR</span>
        </div>
      )
    }
    return (
      <div className="flex items-center gap-1 text-sm text-gray-600" title="English">
        <Globe className="h-3 w-3" />
        <span className="text-xs">EN</span>
      </div>
    )
  }

  const notes = delegate.notes || []
  const hasRecentNotes = notes.some(note => {
    const noteDate = new Date(note.createdAt)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    return noteDate > sevenDaysAgo
  })

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col h-full w-full">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className={`${delegate.contactType === 'organization' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                {delegate.contactType === 'organization' ? <Building className="h-4 w-4" /> : initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{delegate.contactName}</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                <Badge variant={delegate.membershipType === 'delegate' ? 'default' : 'secondary'} className="text-xs">
                  {delegate.membershipType === 'delegate' ? 'Delegate' : 'Member State'}
                </Badge>
                <Badge variant={delegate.isActive ? 'default' : 'destructive'} className="text-xs">
                  {delegate.isActive ? 'Current' : 'Former'}
                </Badge>
                {delegate.isNewsletterSubscribed && (
                  <Badge variant="outline" className="text-xs">
                    <Bell className="h-3 w-3 mr-1" />
                    Newsletter
                  </Badge>
                )}
              </div>
            </div>
            {/* Notes indicator */}
            {notes.length > 0 && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsNotesModalOpen(true)}
                  className="h-8 w-8 p-0"
                  title={`${notes.length} notes`}
                >
                  <StickyNote className={`h-4 w-4 ${hasRecentNotes ? 'text-blue-600' : 'text-gray-400'}`} />
                </Button>
                <Badge 
                  variant={hasRecentNotes ? "default" : "secondary"} 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {notes.length}
                </Badge>
                {hasRecentNotes && (
                  <div className="absolute -top-1 -right-1 h-2 w-2 bg-blue-600 rounded-full animate-pulse"></div>
                )}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3 flex-1 flex flex-col">
          {/* Member State and Role */}
          {delegate.memberState && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-3 w-3" />
              <span>{delegate.memberState}</span>
            </div>
          )}
          {delegate.role && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FileText className="h-3 w-3" />
              <span>{delegate.role}</span>
            </div>
          )}

          {/* Language Preference with Icon */}
          {getLanguageIcon(delegate.language)}

          {/* Dates - Start and End on same line */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-3 w-3" />
            <span>Started: {formatDate(delegate.startDate)}</span>
            {delegate.endDate && (
              <>
                <span className="mx-2">•</span>
                <CalendarOff className="h-3 w-3" />
                <span>Ended: {formatDate(delegate.endDate)}</span>
              </>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-2">
            {delegate.emails.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Mail className="h-3 w-3" />
                  <span>Email{delegate.emails.length > 1 ? 's' : ''}</span>
                </div>
                {delegate.emails.map((email, index) => (
                  <div key={index} className="text-xs text-gray-600 ml-5 truncate">
                    {email}
                  </div>
                ))}
              </div>
            )}

            {delegate.phones.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Phone className="h-3 w-3" />
                  <span>Phone{delegate.phones.length > 1 ? 's' : ''}</span>
                </div>
                {delegate.phones.map((phone, index) => (
                  <div key={index} className="text-xs text-gray-600 ml-5">
                    {phone}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Notes Button - only show if no notes exist */}
          {notes.length === 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsNotesModalOpen(true)}
              className="w-full text-xs text-gray-500 hover:text-gray-700"
            >
              <StickyNote className="h-3 w-3 mr-2" />
              Add Notes
            </Button>
          )}

          {/* Action Buttons - push to bottom */}
          <div className="flex gap-2 pt-2 mt-auto">
            <Button variant="default" size="sm" onClick={handleViewContact} className="flex-1">
              View Contact
            </Button>
            {delegate.isActive && (
              <Button variant="outline" size="sm" onClick={() => onEndMembership?.(delegate)} className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                Denounce
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <NotesModal
        isOpen={isNotesModalOpen}
        onClose={() => setIsNotesModalOpen(false)}
        delegateName={delegate.contactName}
        notes={notes}
        onAddNote={handleAddNote}
      />

      <DelegateProfile
        delegate={delegate}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  )
}
