
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building, MapPin, Bell, Globe, Camera } from "lucide-react"
import { Delegate } from "@/types/delegate"

interface ProfileHeaderProps {
  delegate: Delegate
}

export function ProfileHeader({ delegate }: ProfileHeaderProps) {
  const initials = delegate.contactName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()

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

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={`https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face`} />
              <AvatarFallback className={`text-lg ${delegate.contactType === 'organization' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                {delegate.contactType === 'organization' ? <Building className="h-8 w-8" /> : initials}
              </AvatarFallback>
            </Avatar>
            <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 p-0">
              <Camera className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{delegate.contactName}</h2>
            <p className="text-gray-600 mt-1">{delegate.role}</p>
            
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant={delegate.membershipType === 'delegate' ? 'default' : 'secondary'}>
                {delegate.membershipType === 'delegate' ? 'Delegate' : 'Member State'}
              </Badge>
              <Badge variant={delegate.isActive ? 'default' : 'destructive'}>
                {delegate.isActive ? 'Active' : 'Inactive'}
              </Badge>
              {delegate.isNewsletterSubscribed && (
                <Badge variant="outline">
                  <Bell className="h-3 w-3 mr-1" />
                  Newsletter
                </Badge>
              )}
              {getLanguageIcon(delegate.language)}
            </div>

            {delegate.memberState && (
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <MapPin className="h-4 w-4" />
                <span>{delegate.memberState}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
