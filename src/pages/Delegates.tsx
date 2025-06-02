
import { useState } from "react"
import { DelegateCard } from "@/components/DelegateCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Users, Building, UserCheck } from "lucide-react"
import { Delegate } from "@/types/delegate"

export default function Delegates() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Mock data - in a real app, this would come from your backend
  const delegates: Delegate[] = [
    {
      id: '1',
      contactId: '1',
      contactName: 'Sarah Johnson',
      contactType: 'individual',
      startDate: '2024-01-15',
      isActive: true,
      membershipType: 'delegate'
    },
    {
      id: '2',
      contactId: '2',
      contactName: 'Tech Solutions Inc',
      contactType: 'organization',
      startDate: '2023-06-01',
      isActive: true,
      membershipType: 'member_state'
    },
    {
      id: '3',
      contactId: '3',
      contactName: 'Michael Chen',
      contactType: 'individual',
      startDate: '2023-12-01',
      endDate: '2024-11-30',
      isActive: false,
      membershipType: 'delegate'
    },
    {
      id: '4',
      contactId: '4',
      contactName: 'Global Corp',
      contactType: 'organization',
      startDate: '2022-03-15',
      isActive: true,
      membershipType: 'member_state'
    },
    {
      id: '5',
      contactId: '5',
      contactName: 'Emma Wilson',
      contactType: 'individual',
      startDate: '2024-03-01',
      isActive: true,
      membershipType: 'delegate'
    }
  ]

  const filteredDelegates = delegates.filter(delegate => {
    const matchesSearch = delegate.contactName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'active' && delegate.isActive) ||
                      (activeTab === 'inactive' && !delegate.isActive) ||
                      (activeTab === 'delegates' && delegate.membershipType === 'delegate') ||
                      (activeTab === 'member_states' && delegate.membershipType === 'member_state')
    return matchesSearch && matchesTab
  })

  const activeDelegates = delegates.filter(d => d.isActive && d.membershipType === 'delegate')
  const activeMemberStates = delegates.filter(d => d.isActive && d.membershipType === 'member_state')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Delegates & Member States</h1>
          <p className="text-gray-600 mt-2">Manage membership assignments for contacts</p>
        </div>
        <Button className="w-fit">
          <Plus className="h-4 w-4 mr-2" />
          Assign Membership
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Delegates</p>
                <p className="text-2xl font-bold">{activeDelegates.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Building className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Member States</p>
                <p className="text-2xl font-bold">{activeMemberStates.length}</p>
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
                <p className="text-2xl font-bold">{activeDelegates.length + activeMemberStates.length}</p>
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
                <p className="text-2xl font-bold">{delegates.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search delegates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
                <TabsTrigger value="delegates">Delegates</TabsTrigger>
                <TabsTrigger value="member_states">Member States</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-semibold">
            {filteredDelegates.length} member{filteredDelegates.length !== 1 ? 's' : ''}
          </h2>
          {activeTab !== 'all' && (
            <Badge variant="secondary">
              {activeTab === 'active' ? 'Active' : 
               activeTab === 'inactive' ? 'Inactive' :
               activeTab === 'delegates' ? 'Delegates' : 'Member States'}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDelegates.map((delegate) => (
            <DelegateCard
              key={delegate.id}
              delegate={delegate}
              onEndMembership={(delegate) => console.log('End membership for:', delegate)}
              onViewContact={(delegate) => console.log('View contact for:', delegate)}
            />
          ))}
        </div>

        {filteredDelegates.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? "Try adjusting your search terms or filters"
                  : "Get started by assigning membership to contacts"}
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Assign Membership
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
