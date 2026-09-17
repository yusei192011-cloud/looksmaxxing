import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { fetchConditionCheckins, upsertConditionCheckin } from './queries'
import { queryKeys } from './queryClient'

export function useConditionCheckins() {
  return useQuery({
    queryKey: queryKeys.conditionCheckins,
    queryFn: () => fetchConditionCheckins(supabase),
    initialData: [],
  })
}

export function useUpsertConditionCheckin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload) => upsertConditionCheckin(supabase, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.conditionCheckins }),
  })
}
