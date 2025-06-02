
export interface Delegate {
  id: string
  contactId: string
  contactName: string
  contactType: 'individual' | 'organization'
  startDate: string
  endDate?: string
  isActive: boolean
  membershipType: 'delegate' | 'member_state'
  memberState?: string // Added member state for delegates
}
