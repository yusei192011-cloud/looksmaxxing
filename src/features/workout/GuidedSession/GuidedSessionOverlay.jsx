import { useEffect, useRef, useState } from 'react'
import { useLang } from '../../../i18n/LangContext'
import ResetDialog from './ResetDialog'

// Locks page scroll while the full-screen session overlay is open, the same
// position:fixed trick used by DrumPicker, plus the extra
// documentElement-level lock and tab-disable the original openWo() did.
function useBodyLock(active, onActiveChange) {
  useEffect(() => {
    if (!active) return
    const scrollY = window.scrollY
    document.body.style.top = `-${scrollY}px`
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.documentElement.style.overflow = 'hidden'
    onActiveChange?.(true)
    return () => {
      const y = document.body.style.top
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      document.documentElement.style.overflow = ''
      window.scrollTo(0, parseInt(y || '0', 10) * -1)
      onActiveChange?.(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])
}

export default function GuidedSessionOverlay({ guidedSession, onSessionActiveChange }) {
  const { t } = useLang()
  const { session, done, next, close, resetSave, resetDiscard } = guidedSession
  const [resetOpen, setResetOpen] = useState(false)
  const rootRef = useRef(null)

  useBodyLock(!!session, onSessionActiveChange)

  // Belt-and-suspenders alongside the body lock above — some mobile
  // browsers still let a touchmove inside this overlay bubble up and
  // rubber-band-scroll the page behind it.
  useEffect(() => {
    if (!session) return
    const el = rootRef.current
    if (!el) return
    const stop = (e) => e.stopPropagation()
    el.addEventListener('touchmove', stop, { passive: false })
    return () => el.removeEventListener('touchmove', stop)
  }, [session])

  if (!session) return null

  const { exercise, weight, reps, sets, curSet, phase, queue, queueIndex, completedExercises } = session
  const isMultiExercise = queue.length > 1

  const handleResetSave = () => { setResetOpen(false); resetSave() }
  const handleResetDiscard = () => { setResetOpen(false); resetDiscard() }

  return (
    <div id="wo" className="on" ref={rootRef} role="dialog" aria-modal="true" aria-label={t('wo_ttl')}>
      <div className="woh">
        <div className="woh-ttl">{t('wo_ttl')}</div>
        <div className="woh-ctrls">
          <button className="woc" onClick={() => setResetOpen(true)} style={{ display: phase === 'complete' ? 'none' : '' }}>↺</button>
        </div>
      </div>
      <div className="wo-setinfo">
        {isMultiExercise && <div className="wo-exidx">EXERCISE {queueIndex + 1} / {queue.length}</div>}
        <div className="wo-setlbl-sm">SET {curSet} / {sets}</div>
        <div className="wo-dots">
          {Array.from({ length: sets }, (_, i) => (
            <div key={i} className={`wo-dot${i + 1 <= curSet ? ' done' : ''}`} />
          ))}
        </div>
        <div className="wo-exname">{exercise}</div>
        <div className="wo-winfo">{weight}kg × {reps}reps</div>
      </div>
      <div id="wo-main">
        <div className={`wo-phase${phase === 'active' ? ' on' : ''}`} />
        <div className={`wo-phase${phase === 'wait' ? ' on' : ''}`} style={{ gap: '12px' }}>
          <span className="wo-fire" />
          <div className="wo-done-txt">{t('wo_rest_done')}</div>
        </div>
        <div className={`wo-phase${phase === 'complete' ? ' on' : ''}`} style={{ textAlign: 'center', gap: '0' }}>
          <div className="co-ic" />
          <div className="co-ttl">{t('wo_complete')}</div>
          <div className="co-det">
            {completedExercises.map(ex => (
              <div key={ex.exercise}>{ex.exercise}  {ex.weight}kg × {ex.reps}reps × {ex.completedSets.length}sets</div>
            ))}
          </div>
        </div>
      </div>
      <div id="wo-action">
        <button className="btn btn-done" onClick={done} style={{ display: phase === 'active' ? '' : 'none' }}>{t('btn_done')}</button>
        <button className="btn btn-next" onClick={next} style={{ display: phase === 'wait' ? '' : 'none' }}>{t('btn_next')}</button>
        <button
          className="btn btn-sec"
          onClick={close}
          style={{
            display: phase === 'complete' ? '' : 'none',
            fontFamily: "'Fredoka',sans-serif", letterSpacing: '2px', fontSize: '18px',
          }}
        >CLOSE</button>
      </div>
      <ResetDialog open={resetOpen} onSave={handleResetSave} onDiscard={handleResetDiscard} onCancel={() => setResetOpen(false)} />
    </div>
  )
}
