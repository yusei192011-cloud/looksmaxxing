import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useToast } from '../components/Toast'
import { useLang } from '../i18n/LangContext'
import { insertWorkoutRecord } from './queries'
import { flushOutbox, readOutbox } from './outbox'
import { queryKeys } from './queryClient'

// Retry parked offline records on launch and whenever the connection returns.
export function useOutboxSync() {
  const queryClient = useQueryClient()
  const { showToast } = useToast()
  const { t } = useLang()

  useEffect(() => {
    const sync = async () => {
      if (!readOutbox().length) return
      const sent = await flushOutbox((rec) => insertWorkoutRecord(supabase, rec))
      if (sent > 0) {
        queryClient.invalidateQueries({ queryKey: queryKeys.workoutRecords })
        showToast(t('synced_offline'))
      }
    }
    sync()
    window.addEventListener('online', sync)
    return () => window.removeEventListener('online', sync)
  }, [queryClient, showToast, t])
}
