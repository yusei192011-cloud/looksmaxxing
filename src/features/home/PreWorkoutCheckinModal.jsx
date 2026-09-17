import { useEffect, useState } from 'react'
import { useLang } from '../../i18n/LangContext'
import { groupName } from '../workout/groups'
import ConditionPicker from './ConditionPicker'

// Shared by two call sites: the pre-workout gate on HomePane, and the manual
// recovery-status override on RecoveryList. Both just report "what's the
// condition of this group today" — same question, same safety handling.
export default function PreWorkoutCheckinModal({ open, group, onSelect, onClose }) {
  const { lang, t } = useLang()
  const [pendingPain, setPendingPain] = useState(false)

  useEffect(() => {
    if (!open) setPendingPain(false)
  }, [open])

  if (!open) return null

  const handlePick = (status) => {
    if (status === 'pain') {
      setPendingPain(true)
      return
    }
    onSelect(status)
  }

  return (
    <div className="dlg-ov open" role="dialog" aria-modal="true">
      <div className="dlg">
        <div className="dlg-ttl">{groupName(group, lang)}</div>
        {pendingPain ? (
          <>
            <div className="dlg-body">{t('checkin_pain_notice')}</div>
            <div className="dlg-acts">
              <button className="dbtn dbtn-cond-pain" onClick={() => onSelect('pain')}>
                {t('checkin_pain_ack')}
              </button>
              <button className="dbtn dbtn-cancel" onClick={() => setPendingPain(false)}>
                {t('dlg_cancel')}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="dlg-body">{t('checkin_question')}</div>
            <ConditionPicker onSelect={handlePick} />
            <button className="dbtn dbtn-cancel" style={{ marginTop: 8 }} onClick={onClose}>
              {t('dlg_cancel')}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
