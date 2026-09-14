import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { deleteWorkoutRecord, fetchWorkoutRecords, insertWorkoutRecord } from './queries'
import { queryKeys } from './queryClient'

export function useWorkoutRecords() {
  return useQuery({
    queryKey: queryKeys.workoutRecords,
    queryFn: () => fetchWorkoutRecords(supabase),
    initialData: [],
  })
}

export function useInsertWorkoutRecord() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (rec) => insertWorkoutRecord(supabase, rec),
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
