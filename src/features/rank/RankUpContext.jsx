import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import RankUpOverlay from './RankUpOverlay'

const RankUpContext = createContext(null)

export function RankUpProvider({ children }) {
  const [rank, setRank] = useState(null)

  const celebrate = useCallback((newRank) => setRank(newRank), [])
  const hide = useCallback(() => setRank(null), [])

  const value = useMemo(() => ({ celebrate }), [celebrate])

  return (
    <RankUpContext.Provider value={value}>
      {children}
      <RankUpOverlay rank={rank} onHide={hide} />
    </RankUpContext.Provider>
  )
}

export function useRankUp() {
  const ctx = useContext(RankUpContext)
  if (!ctx) throw new Error('useRankUp must be used within a RankUpProvider')
  return ctx
}
