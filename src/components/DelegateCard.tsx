
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Building, Calendar, Users, CalendarOff } from "lucide-react"
import { Delegate } from "@/types/delegate"
import { useNavigate } from "react-router-dom"

interface DelegateCardProps {
  delegate: Delegate
  onEndMembership?: (delegate: Delegate) => void
  onViewContact?: (delegate: Delegate) => void
}

export function DelegateCard({ delegate, onEndMembership, onViewContact }: DelegateCardProps) {
  const navigate = useNavigate()
  
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
            <div className="flex gap-2 mt-1">
              <Badge variant={delegate.membershipType === 'delegate' ? 'default' : 'secondary'} className="text-xs">
                {delegate.membershipType === 'delegate' ? 'Delegate' : 'Member State'}
              </Badge>
              <Badge variant={delegate.isActive ? 'default' : 'destructive'} className="text-xs">
                {delegate.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
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
