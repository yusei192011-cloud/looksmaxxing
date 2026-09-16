import { useEffect, useReducer, useRef } from 'react'
import { sessionReducer } from './sessionReducer'
import { useSessionTimer } from './useSessionTimer'
import { useLogWorkoutRecord } from '../useLogWorkoutRecord'
import { useToast } from '../../../components/Toast'
import { useLang } from '../../../i18n/LangContext'
import { trainMsg } from '../trainMessages'
import { unlockAudio } from '../../../lib/audio'

const AUTO_CLOSE_MS = 3500

export function useGuidedSession() {
  const [session, dispatch] = useReducer(sessionReducer, null)
  const { logWorkout } = useLogWorkoutRecord()
  const { showToast } = useToast()
  const { lang } = useLang()
  const savedRef = useRef(false)
  const autoCloseTimerRef = useRef(null)

  const timer = useSessionTimer({ onDone: () => dispatch({ type: 'REST_DONE' }) })

  // Enter rest phase -> (re)start the countdown. The boolean dependency
  // flips false->true exactly once per rest period (active/wait/complete
  // all read as false), so this only fires on the actual transition.
  const isResting = session?.phase === 'rest'
  useEffect(() => {
    if (isResting) timer.start(session.restSecs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResting])

  // Save once the whole queue finishes: one workout_records row per
  // exercise, sequentially awaited (not Promise.all) — logWorkout's
  // rank-up detection reads the query cache's "before" snapshot right
  // before each insert, so firing them concurrently would have every call
  // read the same stale snapshot and could double-fire or drop a
  // mid-queue rank-up celebration.
  useEffect(() => {
    if (session?.phase !== 'complete' || savedRef.current) return
    savedRef.current = true
    ;(async () => {
      for (const ex of session.completedExercises) {
        await logWorkout({ exercise: ex.exercise, weight: ex.weight, reps: ex.reps, sets: ex.completedSets.length, group: ex.group })
      }
      showToast(lang === 'ja' ? trainMsg() : '✓ Saved!')
    })()
    autoCloseTimerRef.current = setTimeout(() => dispatch({ type: 'RESET' }), AUTO_CLOSE_MS)
    return () => clearTimeout(autoCloseTimerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.phase])

  // Guard against accidental navigation away mid-session.
  useEffect(() => {
    if (!session) return
    const onUnload = (e) => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', onUnload)
    return () => window.removeEventListener('beforeunload', onUnload)
  }, [session])

  // rAF is throttled/suspended in backgrounded tabs on many platforms;
  // reconcile immediately on return instead of waiting for it to resume.
  useEffect(() => {
    if (!isResting || session?.paused) return
    const onVisibility = () => {
      if (document.hidden) return
      timer.reconcileVisibility()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResting, session?.paused])

  const start = (payload) => {
    savedRef.current = false
    dispatch({ type: 'START', payload })
  }

  const done = () => { unlockAudio(); dispatch({ type: 'DONE_ACTIVE' }) }

  const next = () => { unlockAudio(); dispatch({ type: 'NEXT' }) }

  const togglePause = () => {
    if (!session) return
    if (session.paused) timer.resume()
    else timer.pause()
    dispatch({ type: 'TOGGLE_PAUSE' })
  }

  const close = () => {
    timer.clear()
    clearTimeout(autoCloseTimerRef.current)
    dispatch({ type: 'RESET' })
  }

  // Flush every already-finished exercise, then the current one's partial
  // progress if any sets were completed, then close. For a single-exercise
  // session (completedExercises always empty until the whole thing is
  // done) this reduces to exactly today's "save the one exercise so far".
  const resetSave = async () => {
    if (session) {
      for (const ex of session.completedExercises) {
        await logWorkout({ exercise: ex.exercise, weight: ex.weight, reps: ex.reps, sets: ex.completedSets.length, group: ex.group })
      }
      if (session.completedSets.length > 0) {
        await logWorkout({
          exercise: session.exercise, weight: session.weight, reps: session.reps,
          sets: session.completedSets.length, group: session.group,
        })
      }
    }
    close()
  }

  const resetDiscard = () => close()

  return { session, timer, start, done, next, togglePause, close, resetSave, resetDiscard }
}
