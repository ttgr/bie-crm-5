
import { Card, CardContent } from "@/components/ui/card"
import { Building, Vote, Users } from "lucide-react"

interface DelegateStatsProps {
  stats: {
    activeDelegates: number
    totalActive: number
    newsletterSubscribers: number
    totalMembers: number
    activeMemberStates?: number
    memberStatesWithVotingRights?: number
    quorum?: number
  }
}

export function DelegateStats({ stats }: DelegateStatsProps) {
  // Check if we're showing member states stats (when activeMemberStates is provided)
  const isMemberStatesView = stats.activeMemberStates !== undefined

  if (isMemberStatesView) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Member States</p>
                <p className="text-2xl font-bold">{stats.activeMemberStates}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Vote className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Member States with Right to Vote</p>
                <p className="text-2xl font-bold">{stats.memberStatesWithVotingRights || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Quorum</p>
                <p className="text-2xl font-bold">{stats.quorum || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Original delegate stats view
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserCheck className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Delegates</p>
              <p className="text-2xl font-bold">{stats.activeDelegates}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Active</p>
              <p className="text-2xl font-bold">{stats.totalActive}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Mail className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Newsletter Subscribers</p>
              <p className="text-2xl font-bold">{stats.newsletterSubscribers}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Users className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Members</p>
              <p className="text-2xl font-bold">{stats.totalMembers}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
