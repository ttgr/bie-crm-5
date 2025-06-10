
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, CalendarOff, FileText, Mail, Phone, StickyNote } from "lucide-react"
import { Delegate } from "@/types/delegate"

interface DelegateCardContentProps {
  delegate: Delegate
  onNotesClick: () => void
}

export function DelegateCardContent({ delegate, onNotesClick }: DelegateCardContentProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const notes = delegate.notes || []

  return (
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
          onClick={onNotesClick}
          className="w-full text-xs text-gray-500 hover:text-gray-700"
        >
          <StickyNote className="h-3 w-3 mr-2" />
          Add Notes
        </Button>
      )}
    </CardContent>
  )
}
