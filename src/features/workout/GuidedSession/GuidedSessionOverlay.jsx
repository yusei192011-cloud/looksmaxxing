import { useEffect, useRef, useState } from 'react'
import { useLang } from '../../../i18n/LangContext'
import ExerciseIcon, { slugForExercise } from '../exerciseIcons'
import ExerciseFormCard from '../ExerciseFormCard'
import { useBodyScrollLock } from '../../../lib/useBodyScrollLock'
import ResetDialog from './ResetDialog'

export default function GuidedSessionOverlay({ guidedSession, onSessionActiveChange }) {
  const { t } = useLang()
  const { session, done, next, close, resetSave, resetDiscard } = guidedSession
  const [resetOpen, setResetOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const rootRef = useRef(null)

  useBodyScrollLock(!!session)
  useEffect(() => {
    if (!session) return
    onSessionActiveChange?.(true)
    return () => onSessionActiveChange?.(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!session])

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
        <ExerciseIcon name={exercise} className="ex-ic-lg" onClick={() => setFormOpen(true)} />
        {slugForExercise(exercise) && <div className="ex-tap-hint">{t('form_tap_hint')}</div>}
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
            fontFamily: "'Fredoka','Zen Maru Gothic',sans-serif", letterSpacing: '2px', fontSize: '18px',
          }}
        >CLOSE</button>
      </div>
      <ExerciseFormCard exercise={formOpen ? exercise : null} onClose={() => setFormOpen(false)} />
      <ResetDialog open={resetOpen} onSave={handleResetSave} onDiscard={handleResetDiscard} onCancel={() => setResetOpen(false)} />
    </div>
  )
}
