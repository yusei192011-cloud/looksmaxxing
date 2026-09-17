import { useState } from 'react'
import { useLang } from '../../i18n/LangContext'
import { groupName } from '../workout/groups'
import { applyConditionOverrides, listGroupRecovery } from './recovery'
import { useConditionCheckins, useUpsertConditionCheckin } from '../../data/useConditionCheckins'
import { todayLocalDate } from '../../lib/formatDate'
import PreWorkoutCheckinModal from './PreWorkoutCheckinModal'

const BUCKET_LABEL_KEY = { recovered: 'recovered', almost_recovered: 'almost_recovered', recovering: 'recovering' }

export default function RecoveryList({ records }) {
  const { t, lang } = useLang()
  const { data: checkins } = useConditionCheckins()
  const upsertCheckin = useUpsertConditionCheckin()
  const [editGroup, setEditGroup] = useState(null)
  const today = todayLocalDate()
  const checkinsToday = checkins.filter(c => c.date === today)
  const rows = applyConditionOverrides(listGroupRecovery(records), checkinsToday)

  const handleSelect = (status) => {
    upsertCheckin.mutate({ group: editGroup, status, date: today })
    setEditGroup(null)
  }

  return (
    <div className="sec" style={{ borderBottom: 'none' }}>
      <div className="sec-ttl">{t('recovery_status')}</div>
      <div className="home-recovery-list">
        {rows.map(({ group, bucket }) => (
          <button className="home-recovery-row" key={group} onClick={() => setEditGroup(group)}>
            <span className="home-recovery-name">{groupName(group, lang)}</span>
            <span className={`home-recovery-status ${bucket}`}>
              <span className="home-recovery-dot" />
              {t(BUCKET_LABEL_KEY[bucket])}
            </span>
          </button>
        ))}
      </div>
      <PreWorkoutCheckinModal
        open={editGroup !== null}
        group={editGroup}
        onSelect={handleSelect}
        onClose={() => setEditGroup(null)}
      />
    </div>
  )
}
