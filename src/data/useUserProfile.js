import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { fetchUserProfile, upsertUserProfile } from './queries'
import { queryKeys } from './queryClient'

// `data` is `null` (not undefined/pending) once loaded for a user who
// hasn't completed onboarding yet — App.jsx's setup-vs-home branch relies
// on being able to tell "loading" apart from "confirmed no profile".
export function useUserProfile() {
  return useQuery({
    queryKey: queryKeys.userProfile,
    queryFn: () => fetchUserProfile(supabase),
  })
}

export function useUpsertUserProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (profile) => upsertUserProfile(supabase, profile),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.userProfile }),
  })
}
