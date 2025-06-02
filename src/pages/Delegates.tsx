import { useState } from "react"
import { DelegateCard } from "@/components/DelegateCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Plus, Search, Users, Building, UserCheck, Filter } from "lucide-react"
import { Delegate } from "@/types/delegate"

export default function Delegates() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedMemberState, setSelectedMemberState] = useState<string>("all_states")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)

  // Mock data - simulating 400 delegates
  const generateMockDelegates = (): Delegate[] => {
    const delegates: Delegate[] = []
    const names = [
      'Sarah Johnson', 'Michael Chen', 'Emma Wilson', 'David Rodriguez', 'Lisa Anderson',
      'James Brown', 'Maria Garcia', 'Robert Taylor', 'Jennifer Davis', 'Christopher Wilson',
      'Amanda Thompson', 'Daniel Martinez', 'Michelle White', 'Kevin Clark', 'Laura Lewis',
      'Steven Walker', 'Nicole Hall', 'Brian Allen', 'Stephanie Young', 'Gregory King'
    ]
    const organizations = [
      'Tech Solutions Inc', 'Global Corp', 'Innovation Labs', 'Digital Dynamics', 'Future Systems',
      'Smart Technologies', 'Advanced Solutions', 'Elite Enterprises', 'Prime Industries', 'NextGen Corp'
    ]
    const memberStates = [
      'California', 'New York', 'Texas', 'Florida', 'Illinois', 'Pennsylvania', 
      'Ohio', 'Georgia', 'North Carolina', 'Michigan', 'New Jersey', 'Virginia'
    ]

    for (let i = 1; i <= 400; i++) {
      const isOrganization = Math.random() > 0.7
      const isActive = Math.random() > 0.2
      const membershipType = isOrganization ? 'member_state' : 'delegate'
      
      delegates.push({
        id: i.toString(),
        contactId: i.toString(),
        contactName: isOrganization 
          ? organizations[Math.floor(Math.random() * organizations.length)] + ` ${Math.floor(i/10)}`
          : names[Math.floor(Math.random() * names.length)] + ` ${Math.floor(i/20)}`,
        contactType: isOrganization ? 'organization' : 'individual',
        startDate: new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
        endDate: !isActive ? new Date(2023 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0] : undefined,
        isActive,
        membershipType,
        memberState: membershipType === 'delegate' ? memberStates[Math.floor(Math.random() * memberStates.length)] : undefined
      })
    }
    
    return delegates.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
  }

  const delegates = generateMockDelegates()

  // Get unique member states for filter
  const memberStates = Array.from(new Set(
    delegates
      .filter(d => d.membershipType === 'delegate' && d.memberState)
      .map(d => d.memberState!)
  )).sort()

  const filteredDelegates = delegates.filter(delegate => {
    const matchesSearch = delegate.contactName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'active' && delegate.isActive) ||
                      (activeTab === 'inactive' && !delegate.isActive) ||
                      (activeTab === 'delegates' && delegate.membershipType === 'delegate') ||
                      (activeTab === 'member_states' && delegate.membershipType === 'member_state')
    const matchesMemberState = selectedMemberState === "all_states" || delegate.memberState === selectedMemberState
    return matchesSearch && matchesTab && matchesMemberState
  })

  const totalPages = Math.ceil(filteredDelegates.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentDelegates = filteredDelegates.slice(startIndex, endIndex)

  const activeDelegates = delegates.filter(d => d.isActive && d.membershipType === 'delegate')
  const activeMemberStates = delegates.filter(d => d.isActive && d.membershipType === 'member_state')

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePageSizeChange = (size: string) => {
    setPageSize(parseInt(size))
    setCurrentPage(1)
  }

  const renderPaginationItems = () => {
    const items = []
    const maxVisiblePages = 5
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key="1">
          <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
        </PaginationItem>
      )
      if (startPage > 2) {
        items.push(<PaginationItem key="ellipsis1"><PaginationEllipsis /></PaginationItem>)
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<PaginationItem key="ellipsis2"><PaginationEllipsis /></PaginationItem>)
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationLink>
        </PaginationItem>
      )
    }

    return items
  }

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
            <div className="flex gap-2">
              <Select value={selectedMemberState} onValueChange={setSelectedMemberState}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by Member State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_states">All Member States</SelectItem>
                  {memberStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          </div>
        </CardContent>
      </Card>

      {/* Results Header with Pagination Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            {filteredDelegates.length} member{filteredDelegates.length !== 1 ? 's' : ''}
          </h2>
          {(activeTab !== 'all' || selectedMemberState !== "all_states") && (
            <div className="flex gap-2">
              {activeTab !== 'all' && (
                <Badge variant="secondary">
                  {activeTab === 'active' ? 'Active' : 
                   activeTab === 'inactive' ? 'Inactive' :
                   activeTab === 'delegates' ? 'Delegates' : 'Member States'}
                </Badge>
              )}
              {selectedMemberState !== "all_states" && (
                <Badge variant="outline">
                  {selectedMemberState}
                </Badge>
              )}
            </div>
          )}
          <span className="text-sm text-gray-500">
            (Page {currentPage} of {totalPages})
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show:</span>
          <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="24">24</SelectItem>
              <SelectItem value="48">48</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600">per page</span>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentDelegates.map((delegate) => (
          <DelegateCard
            key={delegate.id}
            delegate={delegate}
            onEndMembership={(delegate) => console.log('End membership for:', delegate)}
            onViewContact={(delegate) => console.log('View contact for:', delegate)}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {renderPaginationItems()}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {filteredDelegates.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedMemberState
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
  )
}
