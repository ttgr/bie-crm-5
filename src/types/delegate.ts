
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
  isNewsletterSubscribed: boolean // Added newsletter subscription status
  role?: string // Role within the organization
  emails: string[] // Multiple email addresses
  phones: string[] // Multiple phone numbers
  notes?: string // Notes about the delegate
  language: 'English' | 'French' // Preferred communication language
}
