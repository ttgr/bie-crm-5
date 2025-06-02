
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ArrowUpDown, Filter, Mail } from "lucide-react"

interface DelegateFiltersProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  sortBy: string
  setSortBy: (value: string) => void
  selectedMemberState: string
  setSelectedMemberState: (value: string) => void
  selectedNewsletterStatus: string
  setSelectedNewsletterStatus: (value: string) => void
  activeTab: string
  setActiveTab: (value: string) => void
  memberStates: string[]
}

export function DelegateFilters({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  selectedMemberState,
  setSelectedMemberState,
  selectedNewsletterStatus,
  setSelectedNewsletterStatus,
  activeTab,
  setActiveTab,
  memberStates
}: DelegateFiltersProps) {
  return (
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
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="name_asc">Name A-Z</SelectItem>
                <SelectItem value="name_desc">Name Z-A</SelectItem>
              </SelectContent>
            </Select>
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
            <Select value={selectedNewsletterStatus} onValueChange={setSelectedNewsletterStatus}>
              <SelectTrigger className="w-[200px]">
                <Mail className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Newsletter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_newsletter">All Newsletter Status</SelectItem>
                <SelectItem value="subscribed">Subscribed</SelectItem>
                <SelectItem value="not_subscribed">Not Subscribed</SelectItem>
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
  )
}
