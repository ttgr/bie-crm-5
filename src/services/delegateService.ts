
import { apiClient, ApiResponse, PaginatedResponse } from '@/lib/api'
import { Delegate, DelegateNote, DelegateDocument } from '@/types/delegate'
import { 
  GetDelegatesParams, 
  CreateDelegateRequest, 
  UpdateDelegateRequest,
  CreateNoteRequest,
  AttachDocumentRequest,
  DelegateStats
} from '@/types/api'

export class DelegateService {
  // Get paginated delegates with filters
  async getDelegates(params: GetDelegatesParams = {}): Promise<PaginatedResponse<Delegate>> {
    return apiClient.get<PaginatedResponse<Delegate>>('/delegates', params)
  }

  // Get single delegate by ID
  async getDelegate(id: string): Promise<ApiResponse<Delegate>> {
    return apiClient.get<ApiResponse<Delegate>>(`/delegates/${id}`)
  }

  // Create new delegate
  async createDelegate(data: CreateDelegateRequest): Promise<ApiResponse<Delegate>> {
    return apiClient.post<ApiResponse<Delegate>>('/delegates', data)
  }

  // Update delegate
  async updateDelegate(id: string, data: UpdateDelegateRequest): Promise<ApiResponse<Delegate>> {
    return apiClient.patch<ApiResponse<Delegate>>(`/delegates/${id}`, data)
  }

  // End delegate membership
  async endMembership(id: string, endDate: string): Promise<ApiResponse<Delegate>> {
    return apiClient.patch<ApiResponse<Delegate>>(`/delegates/${id}/end-membership`, { endDate })
  }

  // Get delegate stats
  async getStats(): Promise<ApiResponse<DelegateStats>> {
    return apiClient.get<ApiResponse<DelegateStats>>('/delegates/stats')
  }

  // Get member states list
  async getMemberStates(): Promise<ApiResponse<string[]>> {
    return apiClient.get<ApiResponse<string[]>>('/delegates/member-states')
  }

  // Notes management
  async addNote(data: CreateNoteRequest): Promise<ApiResponse<DelegateNote>> {
    return apiClient.post<ApiResponse<DelegateNote>>('/delegates/notes', data)
  }

  async updateNote(id: string, text: string): Promise<ApiResponse<DelegateNote>> {
    return apiClient.patch<ApiResponse<DelegateNote>>(`/delegates/notes/${id}`, { text })
  }

  async deleteNote(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`/delegates/notes/${id}`)
  }

  // Document management
  async attachDocument(data: AttachDocumentRequest): Promise<ApiResponse<DelegateDocument>> {
    const formData = new FormData()
    formData.append('subject', data.subject)
    formData.append('type', data.type)
    formData.append('dateTime', data.dateTime)
    formData.append('attachedDelegates', JSON.stringify(data.attachedDelegates))
    formData.append('file', data.file)

    return apiClient.uploadFile<ApiResponse<DelegateDocument>>('/delegates/documents', formData)
  }

  async getDocuments(delegateId: string): Promise<ApiResponse<DelegateDocument[]>> {
    return apiClient.get<ApiResponse<DelegateDocument[]>>(`/delegates/${delegateId}/documents`)
  }

  // Export functionality
  async exportDelegates(params: GetDelegatesParams = {}): Promise<Blob> {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/delegates/export?${new URLSearchParams(params as any)}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        'X-Login-Device': import.meta.env.VITE_LOGIN_DEVICE,
      },
    })
    
    if (!response.ok) {
      throw new Error('Export failed')
    }
    
    return response.blob()
  }

  // Bulk operations for Joomla integration
  async bulkUpdateDelegates(delegateIds: string[], updates: Partial<UpdateDelegateRequest>): Promise<ApiResponse<void>> {
    return apiClient.post<ApiResponse<void>>('/delegates/bulk-update', {
      delegate_ids: delegateIds,
      updates,
    })
  }

  async bulkDeleteDelegates(delegateIds: string[]): Promise<ApiResponse<void>> {
    return apiClient.post<ApiResponse<void>>('/delegates/bulk-delete', {
      delegate_ids: delegateIds,
    })
  }

  // Sync with Joomla users
  async syncWithJoomla(): Promise<ApiResponse<{ synced: number; errors: any[] }>> {
    return apiClient.post<ApiResponse<{ synced: number; errors: any[] }>>('/delegates/sync-joomla')
  }
}

export const delegateService = new DelegateService()
