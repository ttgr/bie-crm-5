
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import { Delegate } from "@/types/delegate"

interface MembershipTabProps {
  delegate: Delegate
}

interface MembershipPeriod {
  id: string
  startDate: string
  endDate?: string
  role?: string
  isActive: boolean
  memberState: string
  notes?: string
}

export function MembershipTab({ delegate }: MembershipTabProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const membershipPeriods: MembershipPeriod[] = [
    {
      id: '1',
      startDate: '2024-01-01',
      role: 'Senior Delegate',
      isActive: true,
      memberState: delegate.memberState || 'Unknown',
      notes: 'Current active membership'
    },
    {
      id: '2',
      startDate: '2022-01-15',
      endDate: '2023-12-31',
      role: 'Delegate',
      isActive: false,
      memberState: delegate.memberState || 'Unknown',
      notes: 'Previous term as regular delegate'
    },
    {
      id: '3',
      startDate: '2020-06-01',
      endDate: '2021-12-31',
      role: 'Observer',
      isActive: false,
      memberState: delegate.memberState || 'Unknown',
      notes: 'Initial observer status'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Membership Periods
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {membershipPeriods.map((period) => (
            <div key={period.id} className={`border-l-4 pl-4 ${period.isActive ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{period.role}</div>
                  <div className="text-sm text-gray-600">{period.memberState}</div>
                  <div className="text-sm text-gray-500">
                    {formatDate(period.startDate)} - {period.endDate ? formatDate(period.endDate) : 'Present'}
                  </div>
                  {period.notes && (
                    <div className="text-xs text-gray-500 mt-1">{period.notes}</div>
                  )}
                </div>
                <Badge variant={period.isActive ? 'default' : 'secondary'}>
                  {period.isActive ? 'Current' : 'Former'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
