import { useEffect, useState } from 'react'
import { useLang } from '../../i18n/LangContext'
import { slugForExercise } from './exerciseIcons'
import { FORM_TIPS } from './formTips'
import { useBodyScrollLock } from '../../lib/useBodyScrollLock'
import { useSheetSwipeClose } from '../../lib/useSheetSwipeClose'

// start -> mid -> end -> mid, looped, so the motion reads without controls.
const FRAME_SEQUENCE = [1, 2, 3, 2]

export default function ExerciseFormCard({ exercise, onClose }) {
  const { t, lang } = useLang()
  const [step, setStep] = useState(0)
  const slug = exercise ? slugForExercise(exercise) : null

  useBodyScrollLock(!!slug)
  const sheetRef = useSheetSwipeClose(!!slug, onClose)

  useEffect(() => {
    if (!slug) return
    setStep(0)
    const id = setInterval(() => setStep(s => (s + 1) % FRAME_SEQUENCE.length), 900)
    return () => clearInterval(id)
  }, [slug])

  if (!slug) return null
  const tips = FORM_TIPS[slug]?.[(lang === 'ja' || lang === 'ko' || lang === 'zh') ? 'ja' : 'en']
  const frame = FRAME_SEQUENCE[step]

  return (
    <div className="dlg-ov open" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="dlg form-card" ref={sheetRef} onClick={(e) => e.stopPropagation()}>
        <div className="cond-drag" />
        <div className="form-card-img">
          {[1, 2, 3].map(n => (
            <img key={n} src={`exercise-icons/${slug}-${n}.svg`} alt="" style={{ opacity: n === frame ? 1 : 0 }} />
          ))}
        </div>
        <div className="form-card-name">{exercise}</div>
        {tips && (
          <>
            <div className="form-card-muscle"><span>{t('form_target_ttl')}</span>{tips.muscle}</div>
            <div className="form-card-ttl">{t('form_points_ttl')}</div>
            <ol className="form-card-points">
              {tips.points.map((p, i) => (
                <li key={i}><span className="form-card-num">{i + 1}</span><span>{p}</span></li>
              ))}
            </ol>
          </>
        )}
        <button className="dbtn dbtn-cond-cta" style={{ width: '100%', marginTop: 16 }} onClick={onClose}>{t('form_close')}</button>
      </div>
    </div>
  )
}
