import { useLang } from '../../i18n/LangContext'
import { groupName } from '../workout/groups'
import { listGroupRecovery } from './recovery'

const BUCKET_LABEL_KEY = { recovered: 'recovered', almost_recovered: 'almost_recovered', recovering: 'recovering' }

export default function RecoveryList({ records }) {
  const { t, lang } = useLang()
  const rows = listGroupRecovery(records)

  return (
    <div className="sec" style={{ borderBottom: 'none' }}>
      <div className="sec-ttl">{t('recovery_status')}</div>
      <div className="home-recovery-list">
        {rows.map(({ group, bucket }) => (
          <div className="home-recovery-row" key={group}>
            <span className="home-recovery-name">{groupName(group, lang)}</span>
            <span className={`home-recovery-status ${bucket}`}>
              <span className="home-recovery-dot" />
              {t(BUCKET_LABEL_KEY[bucket])}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
