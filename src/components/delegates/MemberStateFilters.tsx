
import { SearchBar } from "./SearchBar"
import { FilterTabs } from "./FilterTabs"
import { MemberStateSelector } from "./MemberStateSelector"
import { VotingRightsSelect } from "./VotingRightsSelect"
import { SortSelect } from "./SortSelect"
import { ClearFiltersButton } from "./ClearFiltersButton"

interface MemberStateFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
  selectedMemberState: string
  setSelectedMemberState: (state: string) => void
  selectedVotingRights: string
  setSelectedVotingRights: (status: string) => void
  activeTab: string
  setActiveTab: (tab: string) => void
  memberStates: string[]
}

export function MemberStateFilters({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  selectedMemberState,
  setSelectedMemberState,
  selectedVotingRights,
  setSelectedVotingRights,
  activeTab,
  setActiveTab,
  memberStates
}: MemberStateFiltersProps) {
  const hasActiveFilters = searchTerm || 
                          selectedMemberState !== "all_states" || 
                          selectedVotingRights !== "all_voting" || 
                          sortBy !== "newest"

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedMemberState("all_states")
    setSelectedVotingRights("all_voting")
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
        
        <VotingRightsSelect 
          selectedVotingRights={selectedVotingRights}
          setSelectedVotingRights={setSelectedVotingRights}
        />
        
        <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
        
        {hasActiveFilters && (
          <ClearFiltersButton onClearFilters={clearAllFilters} />
        )}
      </div>
    </div>
  )
}
