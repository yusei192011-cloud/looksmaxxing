import { useEffect, useReducer, useRef } from 'react'
import { sessionReducer } from './sessionReducer'
import { setsToRecords } from './sessionRecords'
import { useLogWorkoutRecord } from '../useLogWorkoutRecord'
import { useToast } from '../../../components/Toast'
import { useLang } from '../../../i18n/LangContext'
import { trainMsg } from '../trainMessages'
import { unlockAudio } from '../../../lib/audio'

const AUTO_CLOSE_MS = 3500
const STORAGE_KEY = 'lm_active_session_v1'
const MAX_AGE_MS = 8 * 3600 * 1000

// iOS reloads a backgrounded PWA, which used to wipe an in-progress workout.
// The session lives in the reducer, so mirror it to localStorage and restore
// it on launch (a finished-but-unsaved session is re-saved by the effect below).
function loadSession() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    if (saved && saved.session && Date.now() - saved.savedAt < MAX_AGE_MS) return saved.session
  } catch { /* corrupt or unavailable: start clean */ }
  return null
}

export function useGuidedSession() {
  const [session, dispatch] = useReducer(sessionReducer, null, loadSession)
  const { logWorkout } = useLogWorkoutRecord()
  const { showToast } = useToast()
  const { lang, t } = useLang()
  const savedRef = useRef(false)
  const autoCloseTimerRef = useRef(null)

  useEffect(() => {
    try {
      if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify({ session, savedAt: Date.now() }))
      else localStorage.removeItem(STORAGE_KEY)
    } catch { /* storage unavailable: session just won't survive a reload */ }
  }, [session])

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
      let queued = false
      for (const ex of session.completedExercises) {
        for (const rec of setsToRecords(ex.exercise, ex.group, ex.completedSets)) {
          const res = await logWorkout(rec)
          if (res?.queued) queued = true
        }
      }
      showToast(queued ? t('saved_offline') : (lang === 'ja' ? trainMsg() : '✓ Saved!'))
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

  const start = (payload) => {
    savedRef.current = false
    dispatch({ type: 'START', payload })
  }

  const done = () => { unlockAudio(); dispatch({ type: 'DONE_ACTIVE' }) }

  const next = () => { unlockAudio(); dispatch({ type: 'NEXT' }) }

  const adjust = (field, delta) => dispatch({ type: 'ADJUST', field, delta })

  const close = () => {
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
        for (const rec of setsToRecords(ex.exercise, ex.group, ex.completedSets)) await logWorkout(rec)
      }
      for (const rec of setsToRecords(session.exercise, session.group, session.completedSets)) await logWorkout(rec)
    }
    close()
  }

  const resetDiscard = () => close()

  return { session, start, done, next, adjust, close, resetSave, resetDiscard }
}
