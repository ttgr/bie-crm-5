
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, User, Mail, Phone } from "lucide-react"
import { Delegate } from "@/types/delegate"

interface ContactDetailsTabProps {
  delegate: Delegate
}

export function ContactDetailsTab({ delegate }: ContactDetailsTabProps) {
  const addresses = [
    {
      type: 'Work',
      street: '123 Diplomatic Avenue',
      city: 'Geneva',
      state: 'Geneva',
      country: 'Switzerland',
      postalCode: '1202'
    },
    {
      type: 'Home',
      street: '456 Embassy Row',
      city: delegate.memberState?.split(' ')[0] || 'Capital',
      state: delegate.memberState || 'State',
      country: delegate.memberState || 'Country',
      postalCode: '12345'
    }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Addresses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {addresses.map((address, index) => (
            <div key={index} className="border-l-4 border-blue-200 pl-4">
              <div className="font-medium text-sm text-gray-700">{address.type}</div>
              <div className="text-sm text-gray-600 mt-1">
                <div>{address.street}</div>
                <div>{address.city}, {address.state} {address.postalCode}</div>
                <div>{address.country}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Mail className="h-4 w-4" />
              <span>Email{delegate.emails.length > 1 ? 's' : ''}</span>
            </div>
            {delegate.emails.map((email, index) => (
              <div key={index} className="text-sm text-blue-600 hover:underline cursor-pointer ml-6">
                {email}
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Phone className="h-4 w-4" />
              <span>Phone{delegate.phones.length > 1 ? 's' : ''}</span>
            </div>
            {delegate.phones.map((phone, index) => (
              <div key={index} className="text-sm text-gray-600 ml-6">
                {phone}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
