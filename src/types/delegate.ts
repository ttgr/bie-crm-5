
export interface DelegateNote {
  id: string
  text: string
  createdAt: string
}

export interface DelegateDocument {
  id: string
  subject: string
  type: 'Meeting (In presence)' | 'Meeting (Online)' | 'Report' | 'Contract' | 'Other'
  dateTime: string
  fileName: string
  fileUrl: string
  attachedDelegates: string[] // Array of delegate IDs
  createdAt: string
}

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
  notes?: DelegateNote[] // Changed to array of timestamped notes
  documents?: DelegateDocument[] // Added documents array
  language: 'English' | 'French' // Preferred communication language
}
