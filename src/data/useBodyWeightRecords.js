import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { deleteBodyWeightRecord, fetchBodyWeightRecords, insertBodyWeightRecord } from './queries'
import { queryKeys } from './queryClient'

export function useBodyWeightRecords() {
  return useQuery({
    queryKey: queryKeys.bodyWeightRecords,
    queryFn: () => fetchBodyWeightRecords(supabase),
    initialData: [],
  })
}

export function useInsertBodyWeightRecord() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (weight) => insertBodyWeightRecord(supabase, weight),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.bodyWeightRecords }),
  })
}

export function useDeleteBodyWeightRecord() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => deleteBodyWeightRecord(supabase, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.bodyWeightRecords }),
  })
}
