import { useState, useMemo } from "react"
import { Delegate, DelegateNote } from "@/types/delegate"

export function useDelegates() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("active")
  const [selectedMemberState, setSelectedMemberState] = useState<string>("all_states")
  const [selectedVotingRights, setSelectedVotingRights] = useState<string>("all_voting")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)

  // Mock data generation
  const generateMockDelegates = (): Delegate[] => {
    const delegates: Delegate[] = []
    const countries = [
      { name: 'United States', language: 'English' as const, hasVotingRights: true },
      { name: 'Canada', language: Math.random() > 0.5 ? 'English' as const : 'French' as const, hasVotingRights: true },
      { name: 'United Kingdom', language: 'English' as const, hasVotingRights: false },
      { name: 'Germany', language: 'English' as const, hasVotingRights: true },
      { name: 'France', language: 'French' as const, hasVotingRights: true },
      { name: 'Italy', language: 'English' as const, hasVotingRights: false },
      { name: 'Spain', language: 'English' as const, hasVotingRights: true },
      { name: 'Netherlands', language: 'English' as const, hasVotingRights: false },
      { name: 'Sweden', language: 'English' as const, hasVotingRights: true },
      { name: 'Norway', language: 'English' as const, hasVotingRights: false },
      { name: 'Denmark', language: 'English' as const, hasVotingRights: true },
      { name: 'Finland', language: 'English' as const, hasVotingRights: false },
      { name: 'Poland', language: 'English' as const, hasVotingRights: true },
      { name: 'Czech Republic', language: 'English' as const, hasVotingRights: false },
      { name: 'Austria', language: 'English' as const, hasVotingRights: true },
      { name: 'Switzerland', language: Math.random() > 0.5 ? 'English' as const : 'French' as const, hasVotingRights: false },
      { name: 'Japan', language: 'English' as const, hasVotingRights: true },
      { name: 'South Korea', language: 'English' as const, hasVotingRights: false },
      { name: 'Australia', language: 'English' as const, hasVotingRights: true },
      { name: 'New Zealand', language: 'English' as const, hasVotingRights: false },
      { name: 'Brazil', language: 'English' as const, hasVotingRights: true },
      { name: 'Argentina', language: 'English' as const, hasVotingRights: false },
      { name: 'Mexico', language: 'English' as const, hasVotingRights: true },
      { name: 'Chile', language: 'English' as const, hasVotingRights: false },
      { name: 'India', language: 'English' as const, hasVotingRights: true },
      { name: 'Singapore', language: 'English' as const, hasVotingRights: false },
      { name: 'Thailand', language: 'English' as const, hasVotingRights: true },
      { name: 'Malaysia', language: 'English' as const, hasVotingRights: false },
      { name: 'South Africa', language: 'English' as const, hasVotingRights: true },
      { name: 'Egypt', language: 'English' as const, hasVotingRights: false },
      { name: 'Morocco', language: 'French' as const, hasVotingRights: true },
      { name: 'Turkey', language: 'English' as const, hasVotingRights: false },
      { name: 'Russia', language: 'English' as const, hasVotingRights: true },
      { name: 'Ukraine', language: 'English' as const, hasVotingRights: false },
      { name: 'Romania', language: 'English' as const, hasVotingRights: true },
      { name: 'Bulgaria', language: 'English' as const, hasVotingRights: false },
      { name: 'Greece', language: 'English' as const, hasVotingRights: true },
      { name: 'Portugal', language: 'English' as const, hasVotingRights: false },
      { name: 'Ireland', language: 'English' as const, hasVotingRights: true },
      { name: 'Belgium', language: Math.random() > 0.5 ? 'English' as const : 'French' as const, hasVotingRights: false },
      { name: 'Luxembourg', language: 'French' as const, hasVotingRights: true },
      { name: 'Senegal', language: 'French' as const, hasVotingRights: false },
      { name: 'Mali', language: 'French' as const, hasVotingRights: true },
      { name: 'Ivory Coast', language: 'French' as const, hasVotingRights: false },
      { name: 'Tunisia', language: 'French' as const, hasVotingRights: true },
      { name: 'Algeria', language: 'French' as const, hasVotingRights: false },
      { name: 'Madagascar', language: 'French' as const, hasVotingRights: true }
    ]
    const names = [
      'Sarah Johnson', 'Michael Chen', 'Emma Wilson', 'David Rodriguez', 'Lisa Anderson',
      'James Brown', 'Maria Garcia', 'Robert Taylor', 'Jennifer Davis', 'Christopher Wilson',
      'Amanda Thompson', 'Daniel Martinez', 'Michelle White', 'Kevin Clark', 'Laura Lewis',
      'Steven Walker', 'Nicole Hall', 'Brian Allen', 'Stephanie Young', 'Gregory King',
      'Anna Kowalski', 'Pierre Dubois', 'Hiroshi Tanaka', 'Sofia Rossi', 'Erik Andersen',
      'Fatima Al-Zahra', 'Carlos Mendoza', 'Ingrid Larsson', 'Dmitri Volkov', 'Priya Sharma'
    ]
    const organizations = [
      'Ministry of Foreign Affairs', 'Department of International Trade', 'Embassy of Economic Relations',
      'Consulate General', 'Trade Commission', 'Cultural Affairs Office', 'Economic Development Agency',
      'International Relations Ministry', 'Diplomatic Mission', 'Commercial Attaché Office'
    ]
    const roles = [
      'Ambassador', 'Deputy Ambassador', 'Trade Representative', 'Economic Attaché',
      'Cultural Attaché', 'Commercial Counselor', 'Consul General', 'First Secretary',
      'Second Secretary', 'Trade Commissioner', 'Economic Advisor', 'Diplomatic Attaché'
    ]

    const noteTemplates = [
      'Excellent communication skills',
      'Very responsive to emails',
      'Strong background in trade relations',
      'Speaks multiple languages fluently',
      'Specializes in environmental policy',
      'Good networking connections',
      'Prefers video calls over phone',
      'Available for weekend meetings',
      'Has experience with international law',
      'Focus on technology partnerships'
    ]

    for (let i = 1; i <= 400; i++) {
      const isOrganization = Math.random() > 0.7
      const isActive = Math.random() > 0.2
      const membershipType = isOrganization ? 'member_state' : 'delegate'
      const country = countries[Math.floor(Math.random() * countries.length)]
      const baseEmail = isOrganization 
        ? country.name.toLowerCase().replace(/\s+/g, '') + Math.floor(i/10)
        : names[Math.floor(Math.random() * names.length)].toLowerCase().replace(/\s+/g, '') + Math.floor(i/20)
      
      // Generate random notes for some delegates
      const notes: DelegateNote[] = []
      if (Math.random() > 0.6) { // 40% chance of having notes
        const numNotes = Math.floor(Math.random() * 3) + 1 // 1-3 notes
        for (let j = 0; j < numNotes; j++) {
          const daysAgo = Math.floor(Math.random() * 30) // Notes from last 30 days
          notes.push({
            id: `${i}-${j}`,
            text: noteTemplates[Math.floor(Math.random() * noteTemplates.length)],
            createdAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString()
          })
        }
      }
      
      delegates.push({
        id: i.toString(),
        contactId: i.toString(),
        contactName: membershipType === 'member_state' 
          ? country.name  // Only country name for member states
          : names[Math.floor(Math.random() * names.length)],
        contactType: isOrganization ? 'organization' : 'individual',
        startDate: new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
        endDate: !isActive ? new Date(2023 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0] : undefined,
        isActive,
        membershipType,
        memberState: country.name,
        isNewsletterSubscribed: Math.random() > 0.4,
        isBulletinSubscribed: Math.random() > 0.5,
        hasVotingRights: membershipType === 'member_state' ? country.hasVotingRights : undefined,
        role: membershipType === 'delegate' ? roles[Math.floor(Math.random() * roles.length)] : undefined,
        emails: [
          `${baseEmail}@${country.name.toLowerCase().replace(/\s+/g, '')}.gov`,
          ...(Math.random() > 0.6 ? [`${baseEmail}.official@embassy.org`] : [])
        ],
        phones: [
          `+${Math.floor(Math.random() * 999) + 1} (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
          ...(Math.random() > 0.7 ? [`+${Math.floor(Math.random() * 999) + 1} (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`] : [])
        ],
        notes,
        language: country.language
      })
    }
    
    return delegates.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
  }

  const delegates = useMemo(() => generateMockDelegates(), [])

  const memberStates = useMemo(() => {
    return Array.from(new Set(
      delegates
        .filter(d => d.memberState)
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
      const matchesVotingRights = selectedVotingRights === "all_voting" || 
                                (selectedVotingRights === "has_voting_rights" && delegate.hasVotingRights) ||
                                (selectedVotingRights === "no_voting_rights" && !delegate.hasVotingRights)
      return matchesSearch && matchesTab && matchesMemberState && matchesVotingRights
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
  }, [delegates, searchTerm, activeTab, selectedMemberState, selectedVotingRights, sortBy])

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
    selectedVotingRights,
    setSelectedVotingRights,
    sortBy,
    setSortBy
  }
}
