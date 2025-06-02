
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Building, Calendar, CalendarOff, MapPin, Mail, Phone, FileText, Bell, BellOff } from "lucide-react"
import { Delegate } from "@/types/delegate"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

interface DelegateCardProps {
  delegate: Delegate
  onEndMembership?: (delegate: Delegate) => void
  onViewContact?: (delegate: Delegate) => void
}

export function DelegateCard({ delegate, onEndMembership, onViewContact }: DelegateCardProps) {
  const navigate = useNavigate()
  const [notes, setNotes] = useState(delegate.notes || "")
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  
  const initials = delegate.contactName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const handleViewContact = () => {
    navigate(`/contacts/${delegate.contactId}`)
  }

  const handleSaveNotes = () => {
    // In a real app, this would save to the backend
    console.log('Saving notes:', notes, 'for delegate:', delegate.id)
    setIsEditingNotes(false)
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
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
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
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

        {/* Dates */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-3 w-3" />
          <span>Started: {formatDate(delegate.startDate)}</span>
        </div>
        {delegate.endDate && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CalendarOff className="h-3 w-3" />
            <span>Ended: {formatDate(delegate.endDate)}</span>
          </div>
        )}

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

        {/* Notes Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Notes</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditingNotes(!isEditingNotes)}
              className="h-6 px-2 text-xs"
            >
              {isEditingNotes ? 'Cancel' : 'Edit'}
            </Button>
          </div>
          {isEditingNotes ? (
            <div className="space-y-2">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this delegate..."
                className="min-h-[60px] text-xs"
              />
              <Button
                onClick={handleSaveNotes}
                size="sm"
                className="h-6 px-2 text-xs"
              >
                Save
              </Button>
            </div>
          ) : (
            <div className="text-xs text-gray-600 min-h-[40px] p-2 bg-gray-50 rounded border">
              {notes || "No notes added"}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={handleViewContact} className="flex-1">
            View Contact
          </Button>
          {delegate.isActive && (
            <Button variant="destructive" size="sm" onClick={() => onEndMembership?.(delegate)} className="flex-1">
              End Membership
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
