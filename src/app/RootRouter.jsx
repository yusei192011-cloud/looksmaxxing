import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import AuthFlow from '../features/auth/AuthFlow'
import ProfileGate from './ProfileGate'
import LoadingScreen from './LoadingScreen'

export default function RootRouter() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setAuthLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (authLoading) return <LoadingScreen />
  if (!user) return <AuthFlow />
  return <ProfileGate />
}
