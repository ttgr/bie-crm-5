
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"

interface ActivityLog {
  id: string
  action: string
  performedBy: string
  timestamp: string
  details?: string
}

export function ActivityLogTab() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const activityLog: ActivityLog[] = [
    {
      id: '1',
      action: 'Profile Updated',
      performedBy: 'John Smith',
      timestamp: '2024-12-01T10:30:00Z',
      details: 'Updated contact information and role'
    },
    {
      id: '2',
      action: 'Note Added',
      performedBy: 'Sarah Johnson',
      timestamp: '2024-11-28T14:15:00Z',
      details: 'Added note about trade preferences'
    },
    {
      id: '3',
      action: 'Event Registration',
      performedBy: 'System',
      timestamp: '2024-11-25T09:00:00Z',
      details: 'Registered for Expo 2025 Osaka'
    },
    {
      id: '4',
      action: 'Membership Extended',
      performedBy: 'Admin User',
      timestamp: '2024-11-20T16:45:00Z',
      details: 'Extended membership until 2025'
    },
    {
      id: '5',
      action: 'Profile Created',
      performedBy: 'System',
      timestamp: '2022-01-15T08:00:00Z',
      details: 'Initial profile creation'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Activity Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activityLog.map((log) => (
            <div key={log.id} className="border-l-4 border-gray-200 pl-4 py-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{log.action}</div>
                  <div className="text-sm text-gray-600">by {log.performedBy}</div>
                  {log.details && (
                    <div className="text-xs text-gray-500 mt-1">{log.details}</div>
                  )}
                </div>
                <div className="text-xs text-gray-400">
                  {formatDate(log.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
