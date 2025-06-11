
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { delegateService } from '@/services/delegateService'
import { GetDelegatesParams, CreateDelegateRequest, UpdateDelegateRequest } from '@/types/api'

// Query keys for caching
export const delegateKeys = {
  all: ['delegates'] as const,
  lists: () => [...delegateKeys.all, 'list'] as const,
  list: (params: GetDelegatesParams) => [...delegateKeys.lists(), params] as const,
  details: () => [...delegateKeys.all, 'detail'] as const,
  detail: (id: string) => [...delegateKeys.details(), id] as const,
  stats: () => [...delegateKeys.all, 'stats'] as const,
  memberStates: () => [...delegateKeys.all, 'member-states'] as const,
}

// Hook for getting paginated delegates
export function useApiDelegates(params: GetDelegatesParams = {}) {
  return useQuery({
    queryKey: delegateKeys.list(params),
    queryFn: () => delegateService.getDelegates(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook for getting single delegate
export function useApiDelegate(id: string) {
  return useQuery({
    queryKey: delegateKeys.detail(id),
    queryFn: () => delegateService.getDelegate(id),
    enabled: !!id,
  })
}

// Hook for delegate stats
export function useApiDelegateStats() {
  return useQuery({
    queryKey: delegateKeys.stats(),
    queryFn: () => delegateService.getStats(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Hook for member states
export function useApiMemberStates() {
  return useQuery({
    queryKey: delegateKeys.memberStates(),
    queryFn: () => delegateService.getMemberStates(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

// Mutation hooks
export function useCreateDelegate() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateDelegateRequest) => delegateService.createDelegate(data),
    onSuccess: () => {
      // Invalidate and refetch delegates list
      queryClient.invalidateQueries({ queryKey: delegateKeys.lists() })
      queryClient.invalidateQueries({ queryKey: delegateKeys.stats() })
    },
  })
}

export function useUpdateDelegate() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDelegateRequest }) => 
      delegateService.updateDelegate(id, data),
    onSuccess: (result, variables) => {
      // Update the specific delegate in cache
      queryClient.invalidateQueries({ queryKey: delegateKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: delegateKeys.lists() })
      queryClient.invalidateQueries({ queryKey: delegateKeys.stats() })
    },
  })
}

export function useEndMembership() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, endDate }: { id: string; endDate: string }) => 
      delegateService.endMembership(id, endDate),
    onSuccess: (result, variables) => {
      queryClient.invalidateQueries({ queryKey: delegateKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: delegateKeys.lists() })
      queryClient.invalidateQueries({ queryKey: delegateKeys.stats() })
    },
  })
}

export function useAttachDocument() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: delegateService.attachDocument,
    onSuccess: () => {
      // Invalidate delegates that had documents attached
      queryClient.invalidateQueries({ queryKey: delegateKeys.lists() })
    },
  })
}
