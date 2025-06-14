
import { SearchBar } from "./SearchBar"
import { FilterTabs } from "./FilterTabs"
import { MemberStateSelector } from "./MemberStateSelector"
import { NewsletterStatusSelect } from "./NewsletterStatusSelect"
import { SortSelect } from "./SortSelect"
import { ClearFiltersButton } from "./ClearFiltersButton"

interface DelegateFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
  selectedMemberState: string
  setSelectedMemberState: (state: string) => void
  selectedNewsletterStatus: string
  setSelectedNewsletterStatus: (status: string) => void
  activeTab: string
  setActiveTab: (tab: string) => void
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
  const hasActiveFilters = searchTerm || 
                          selectedMemberState !== "all_states" || 
                          selectedNewsletterStatus !== "all_newsletter" || 
                          sortBy !== "newest"

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedMemberState("all_states")
    setSelectedNewsletterStatus("all_newsletter")
    setSortBy("newest")
  }

  return (
    <div className="space-y-4">
      <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Search field above other filters for responsive design */}
      <div className="w-full">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <MemberStateSelector 
          selectedMemberState={selectedMemberState}
          setSelectedMemberState={setSelectedMemberState}
          memberStates={memberStates}
        />
        
        <NewsletterStatusSelect 
          selectedNewsletterStatus={selectedNewsletterStatus}
          setSelectedNewsletterStatus={setSelectedNewsletterStatus}
        />
        
        <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
        
        {hasActiveFilters && (
          <ClearFiltersButton onClearFilters={clearAllFilters} />
        )}
      </div>
    </div>
  )
}
