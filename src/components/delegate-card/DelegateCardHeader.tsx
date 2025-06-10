
import { CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Building, Bell } from "lucide-react"
import { Delegate } from "@/types/delegate"
import { LanguageIcon } from "./LanguageIcon"
import { NotesIndicator } from "./NotesIndicator"

interface DelegateCardHeaderProps {
  delegate: Delegate
  onNotesClick: () => void
}

export function DelegateCardHeader({ delegate, onNotesClick }: DelegateCardHeaderProps) {
  const initials = delegate.contactName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()

  const notes = delegate.notes || []

  return (
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
            <LanguageIcon language={delegate.language} />
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
        <NotesIndicator notes={notes} onNotesClick={onNotesClick} />
      </div>
    </CardHeader>
  )
}
