import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { deleteWorkoutRecord, fetchWorkoutRecords, insertWorkoutRecord } from './queries'
import { queryKeys } from './queryClient'

const CACHE_KEY = 'lm_records_cache_v1'

function readCache() {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || 'null') } catch { return null }
}

// The last successful fetch is kept locally so the menu and history still
// have data when the app is opened without signal; it always refetches.
export function useWorkoutRecords() {
  return useQuery({
    queryKey: queryKeys.workoutRecords,
    queryFn: async () => {
      const data = await fetchWorkoutRecords(supabase)
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(data)) } catch { /* storage unavailable */ }
      return data
    },
    initialData: () => readCache() ?? [],
    initialDataUpdatedAt: 0,
  })
}

export function useInsertWorkoutRecord() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (rec) => insertWorkoutRecord(supabase, rec),
    // By default React Query parks mutations while offline; run it anyway so
    // the failure reaches the outbox instead of hanging forever.
    networkMode: 'always',
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.workoutRecords }),
  })
}

export function useDeleteWorkoutRecord() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => deleteWorkoutRecord(supabase, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.workoutRecords }),
  })
}
