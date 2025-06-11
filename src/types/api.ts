
import { Delegate, DelegateDocument, DelegateNote } from './delegate'

// API Request/Response types
export interface GetDelegatesParams {
  page?: number
  pageSize?: number
  search?: string
  membershipType?: 'delegate' | 'member_state' | 'all'
  status?: 'active' | 'inactive' | 'all'
  memberState?: string
  newsletterStatus?: 'subscribed' | 'not_subscribed' | 'all'
  votingRights?: 'has_voting_rights' | 'no_voting_rights' | 'all'
  sortBy?: 'newest' | 'oldest' | 'name_asc' | 'name_desc'
}

export interface CreateDelegateRequest {
  contactId: string
  membershipType: 'delegate' | 'member_state'
  memberState?: string
  startDate: string
  role?: string
  isNewsletterSubscribed?: boolean
  isBulletinSubscribed?: boolean
  hasVotingRights?: boolean
  language: 'English' | 'French'
}

export interface UpdateDelegateRequest extends Partial<CreateDelegateRequest> {
  endDate?: string
  isActive?: boolean
}

export interface CreateNoteRequest {
  delegateId: string
  text: string
}

export interface AttachDocumentRequest {
  subject: string
  type: 'Meeting (In presence)' | 'Meeting (Online)' | 'Report' | 'Contract' | 'Other'
  dateTime: string
  attachedDelegates: string[]
  file: File
}

export interface DelegateStats {
  activeDelegates: number
  activeMemberStates: number
  totalActive: number
  newsletterSubscribers: number
  totalMembers: number
}
