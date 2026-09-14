import { useEffect, useRef, useState } from 'react'
import { notifyTimerDone, playAlarm, playCountdown } from '../../../lib/audio'
import { flashScreen } from '../../../lib/flashScreen'

// Wall-clock-based countdown (Date.now() deltas, not a naive setInterval
// tick count), so it stays accurate across a backgrounded/throttled tab —
// ported near-verbatim from the original startTimerAnim()/renderTimer().
export function useSessionTimer({ onDone }) {
  const [remaining, setRemaining] = useState(0)
  const [status, setStatus] = useState('') // '' | 'warn' | 'done'
  const [total, setTotal] = useState(0)

  const totalRef = useRef(0)
  const startTimeRef = useRef(0)
  const rafRef = useRef(null)
  const pausedRemainingRef = useRef(0)
  const lastCountdownRef = useRef(-1)
  const lastDisplayedSecRef = useRef(-1)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  const clear = () => {
    if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
  }

  const tick = () => {
    const rem = Math.max(0, totalRef.current - (Date.now() - startTimeRef.current) / 1000)
    setRemaining(rem)
    const sec = Math.ceil(rem)
    if (sec !== lastDisplayedSecRef.current) {
      lastDisplayedSecRef.current = sec
      setStatus(rem <= 0 ? 'done' : rem <= 10 ? 'warn' : '')
      if (rem > 0 && sec <= 5 && sec !== lastCountdownRef.current) {
        lastCountdownRef.current = sec
        playCountdown(sec)
      }
    }
    if (rem <= 0) {
      rafRef.current = null
      playAlarm()
      notifyTimerDone()
      flashScreen()
      onDoneRef.current()
      return
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  const start = (totalSecs) => {
    clear()
    totalRef.current = totalSecs
    startTimeRef.current = Date.now()
    lastCountdownRef.current = -1
    lastDisplayedSecRef.current = -1
    setTotal(totalSecs)
    setRemaining(totalSecs)
    setStatus('')
    rafRef.current = requestAnimationFrame(tick)
  }

  const pause = () => {
    pausedRemainingRef.current = Math.max(0, totalRef.current - (Date.now() - startTimeRef.current) / 1000)
    clear()
  }

  const resume = () => {
    startTimeRef.current = Date.now() - (totalRef.current - pausedRemainingRef.current) * 1000
    rafRef.current = requestAnimationFrame(tick)
  }

  // Called when the tab becomes visible again while resting and unpaused —
  // rAF is throttled/suspended in background tabs on many platforms, so
  // this reconciles immediately instead of waiting for it to resume on its
  // own. Deliberately skips flashScreen() (a jarring flash right as the
  // user returns), matching the original visibilitychange handler exactly.
  const reconcileVisibility = () => {
    clear()
    const rem = Math.max(0, totalRef.current - (Date.now() - startTimeRef.current) / 1000)
    if (rem <= 0) {
      setRemaining(0)
      setStatus('done')
      playAlarm()
      notifyTimerDone()
      onDoneRef.current()
    } else {
      rafRef.current = requestAnimationFrame(tick)
    }
  }

  useEffect(() => clear, [])

  const fraction = total > 0 ? remaining / total : 0
  return { remaining, fraction, status, start, pause, resume, reconcileVisibility, clear }
}
