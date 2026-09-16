import { useLang } from '../../i18n/LangContext'

function greetingKey(hour = new Date().getHours()) {
  if (hour < 11) return 'greeting_morning'
  if (hour < 17) return 'greeting_afternoon'
  return 'greeting_evening'
}

export default function HomeHeader({ nickname, streak }) {
  const { t } = useLang()
  return (
    <div className="home-header">
      <div>
        <div className="home-greeting">{t(greetingKey())}</div>
        <div className="home-nickname">{nickname}</div>
      </div>
      <div className="home-header-right">
        {streak > 0 && <div className="home-streak-badge">🔥 {streak}{t('consecutive_days')}</div>}
        {/* Profile/settings screen is a later phase — placeholder only. */}
        <div className="home-profile-ic" aria-hidden="true">👤</div>
      </div>
    </div>
  )
}
