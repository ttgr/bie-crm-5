
import { useDelegates } from './useDelegates'
import { useApiDelegates, useApiDelegateStats, useApiMemberStates } from './useApiDelegates'
import { useDataProvider } from '@/providers/DataProvider'
import { GetDelegatesParams } from '@/types/api'

export function useUnifiedDelegates(params: GetDelegatesParams = {}) {
  const { useMockData } = useDataProvider()
  
  // Mock data hooks
  const mockData = useDelegates()
  
  // API data hooks
  const apiDelegatesQuery = useApiDelegates(params)
  const apiStatsQuery = useApiDelegateStats()
  const apiMemberStatesQuery = useApiMemberStates()
  
  if (useMockData) {
    // Return mock data with the same interface
    return {
      // Data
      delegates: mockData.delegates,
      filteredDelegates: mockData.filteredDelegates,
      currentDelegates: mockData.currentDelegates,
      memberStates: mockData.memberStates,
      stats: mockData.stats,
      
      // Pagination
      currentPage: mockData.currentPage,
      totalPages: mockData.totalPages,
      pageSize: mockData.pageSize,
      handlePageChange: mockData.handlePageChange,
      handlePageSizeChange: mockData.handlePageSizeChange,
      
      // Filters
      searchTerm: mockData.searchTerm,
      setSearchTerm: mockData.setSearchTerm,
      activeTab: mockData.activeTab,
      setActiveTab: mockData.setActiveTab,
      selectedMemberState: mockData.selectedMemberState,
      setSelectedMemberState: mockData.setSelectedMemberState,
      selectedVotingRights: mockData.selectedVotingRights,
      setSelectedVotingRights: mockData.setSelectedVotingRights,
      selectedNewsletterStatus: mockData.selectedNewsletterStatus,
      setSelectedNewsletterStatus: mockData.setSelectedNewsletterStatus,
      sortBy: mockData.sortBy,
      setSortBy: mockData.setSortBy,
      
      // Loading states
      isLoading: false,
      error: null,
    }
  }
  
  // Return API data
  return {
    // Data from API
    delegates: apiDelegatesQuery.data?.data || [],
    filteredDelegates: apiDelegatesQuery.data?.data || [],
    currentDelegates: apiDelegatesQuery.data?.data || [],
    memberStates: apiMemberStatesQuery.data?.data || [],
    stats: apiStatsQuery.data?.data || {
      activeDelegates: 0,
      activeMemberStates: 0,
      totalActive: 0,
      newsletterSubscribers: 0,
      totalMembers: 0
    },
    
    // Pagination from API
    currentPage: apiDelegatesQuery.data?.pagination.page || 1,
    totalPages: apiDelegatesQuery.data?.pagination.totalPages || 1,
    pageSize: apiDelegatesQuery.data?.pagination.pageSize || 12,
    handlePageChange: (page: number) => {
      // This would trigger a new API call with updated pagination
      console.log('Page change to:', page)
    },
    handlePageSizeChange: (size: string) => {
      console.log('Page size change to:', size)
    },
    
    // Filters (these would be managed by the API params)
    searchTerm: params.search || '',
    setSearchTerm: (term: string) => console.log('Search term:', term),
    activeTab: params.status || 'active',
    setActiveTab: (tab: string) => console.log('Active tab:', tab),
    selectedMemberState: params.memberState || 'all_states',
    setSelectedMemberState: (state: string) => console.log('Member state:', state),
    selectedVotingRights: params.votingRights || 'all_voting',
    setSelectedVotingRights: (rights: string) => console.log('Voting rights:', rights),
    selectedNewsletterStatus: params.newsletterStatus || 'all_newsletter',
    setSelectedNewsletterStatus: (status: string) => console.log('Newsletter status:', status),
    sortBy: params.sortBy || 'newest',
    setSortBy: (sort: string) => console.log('Sort by:', sort),
    
    // Loading states
    isLoading: apiDelegatesQuery.isLoading || apiStatsQuery.isLoading || apiMemberStatesQuery.isLoading,
    error: apiDelegatesQuery.error || apiStatsQuery.error || apiMemberStatesQuery.error,
  }
}
