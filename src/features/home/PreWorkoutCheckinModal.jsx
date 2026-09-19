import { useEffect, useState } from 'react'
import { useLang } from '../../i18n/LangContext'
import { useBodyScrollLock } from '../../lib/useBodyScrollLock'
import ConditionPicker from './ConditionPicker'

// Shared by two call sites: the pre-workout gate on HomePane, and the manual
// recovery-status override on RecoveryList. Both just report "what's your
// condition today" — same question, same safety handling. Which muscle
// group this check-in is for lives entirely in the caller's own `onSelect`
// closure; this component doesn't need to know or display it.
export default function PreWorkoutCheckinModal({ open, onSelect, onClose }) {
  const { t } = useLang()
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (!open) setSelected(null)
  }, [open])

  useBodyScrollLock(open)

  if (!open) return null

  const isEasy = selected === 'sore' || selected === 'pain'
  const ctaLabel = isEasy ? t('checkin_cta_easy') : t('checkin_cta_start')

  return (
    <div className="dlg-ov open" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="dlg" onClick={(e) => e.stopPropagation()}>
        <div className="cond-drag" />
        <div className="dlg-ttl">{t('checkin_question')}</div>
        <div className="dlg-body">{t('checkin_subtitle')}</div>
        <ConditionPicker value={selected} onSelect={setSelected} />
        {selected === 'pain' && <div className="cond-notice">{t('checkin_pain_notice')}</div>}
        <button
          className="dbtn dbtn-cond-cta"
          disabled={!selected}
          onClick={() => onSelect(selected)}
          style={{ marginTop: 14 }}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  )
}
