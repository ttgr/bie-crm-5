
import { useState, useMemo } from "react"
import { Delegate } from "@/types/delegate"

export function useDelegates() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedMemberState, setSelectedMemberState] = useState<string>("all_states")
  const [selectedNewsletterStatus, setSelectedNewsletterStatus] = useState<string>("all_newsletter")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)

  // Mock data generation
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
        memberState: membershipType === 'delegate' ? memberStates[Math.floor(Math.random() * memberStates.length)] : undefined,
        isNewsletterSubscribed: Math.random() > 0.4
      })
    }
    
    return delegates.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
  }

  const delegates = useMemo(() => generateMockDelegates(), [])

  const memberStates = useMemo(() => {
    return Array.from(new Set(
      delegates
        .filter(d => d.membershipType === 'delegate' && d.memberState)
        .map(d => d.memberState!)
    )).sort()
  }, [delegates])

  const filteredDelegates = useMemo(() => {
    return delegates.filter(delegate => {
      const matchesSearch = delegate.contactName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTab = activeTab === 'all' || 
                        (activeTab === 'active' && delegate.isActive) ||
                        (activeTab === 'inactive' && !delegate.isActive) ||
                        (activeTab === 'delegates' && delegate.membershipType === 'delegate') ||
                        (activeTab === 'member_states' && delegate.membershipType === 'member_state')
      const matchesMemberState = selectedMemberState === "all_states" || delegate.memberState === selectedMemberState
      const matchesNewsletter = selectedNewsletterStatus === "all_newsletter" || 
                                (selectedNewsletterStatus === "subscribed" && delegate.isNewsletterSubscribed) ||
                                (selectedNewsletterStatus === "not_subscribed" && !delegate.isNewsletterSubscribed)
      return matchesSearch && matchesTab && matchesMemberState && matchesNewsletter
    }).sort((a, b) => {
      const dateA = new Date(a.startDate).getTime()
      const dateB = new Date(b.startDate).getTime()
      
      switch (sortBy) {
        case "newest":
          return dateB - dateA
        case "oldest":
          return dateA - dateB
        case "name_asc":
          return a.contactName.localeCompare(b.contactName)
        case "name_desc":
          return b.contactName.localeCompare(a.contactName)
        default:
          return dateB - dateA
      }
    })
  }, [delegates, searchTerm, activeTab, selectedMemberState, selectedNewsletterStatus, sortBy])

  const stats = useMemo(() => {
    const activeDelegates = delegates.filter(d => d.isActive && d.membershipType === 'delegate')
    const activeMemberStates = delegates.filter(d => d.isActive && d.membershipType === 'member_state')
    const newsletterSubscribers = delegates.filter(d => d.isNewsletterSubscribed)

    return {
      activeDelegates: activeDelegates.length,
      activeMemberStates: activeMemberStates.length,
      totalActive: activeDelegates.length + activeMemberStates.length,
      newsletterSubscribers: newsletterSubscribers.length,
      totalMembers: delegates.length
    }
  }, [delegates])

  const totalPages = Math.ceil(filteredDelegates.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentDelegates = filteredDelegates.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePageSizeChange = (size: string) => {
    setPageSize(parseInt(size))
    setCurrentPage(1)
  }

  return {
    // Data
    delegates,
    filteredDelegates,
    currentDelegates,
    memberStates,
    stats,
    
    // Pagination
    currentPage,
    totalPages,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    
    // Filters
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    selectedMemberState,
    setSelectedMemberState,
    selectedNewsletterStatus,
    setSelectedNewsletterStatus,
    sortBy,
    setSortBy
  }
}
