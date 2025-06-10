
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building } from "lucide-react"

interface Relationship {
  id: string
  department: string
  sector: string
  position: string
  startDate: string
  endDate?: string
  isActive: boolean
}

export function RelationshipsTab() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const relationships: Relationship[] = [
    {
      id: '1',
      department: 'Ministry of Foreign Affairs',
      sector: 'International Trade',
      position: 'Senior Trade Advisor',
      startDate: '2022-01-15',
      isActive: true
    },
    {
      id: '2',
      department: 'Department of Commerce',
      sector: 'Export Development',
      position: 'Trade Specialist',
      startDate: '2020-03-01',
      endDate: '2021-12-31',
      isActive: false
    },
    {
      id: '3',
      department: 'Embassy Economic Section',
      sector: 'Bilateral Relations',
      position: 'Economic Attaché',
      startDate: '2023-06-01',
      isActive: true
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-4 w-4" />
          Department & Sector Relationships
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {relationships.map((relationship) => (
            <div key={relationship.id} className={`border-l-4 pl-4 ${relationship.isActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{relationship.department}</div>
                  <div className="text-sm text-gray-600">{relationship.sector}</div>
                  <div className="text-sm text-gray-700">{relationship.position}</div>
                  <div className="text-sm text-gray-500">
                    {formatDate(relationship.startDate)} - {relationship.endDate ? formatDate(relationship.endDate) : 'Present'}
                  </div>
                </div>
                <Badge variant={relationship.isActive ? 'default' : 'secondary'}>
                  {relationship.isActive ? 'Active' : 'Former'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
