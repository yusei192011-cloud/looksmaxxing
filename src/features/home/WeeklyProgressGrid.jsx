import { useLang } from '../../i18n/LangContext'

export default function WeeklyProgressGrid({ sessions, frequency, volume }) {
  const { t } = useLang()
  return (
    <div className="sec">
      <div className="sec-ttl">{t('weekly_progress')}</div>
      <div className="home-stats-grid">
        <div className="home-stat-card">
          <div className="home-stat-value">{sessions} / {frequency}</div>
          <div className="home-stat-label">{t('sessions_label')}</div>
        </div>
        <div className="home-stat-card">
          <div className="home-stat-value">{Math.round(volume).toLocaleString()}<span className="home-stat-unit">kg</span></div>
          <div className="home-stat-label">{t('volume_label')}</div>
        </div>
      </div>
    </div>
  )
}
