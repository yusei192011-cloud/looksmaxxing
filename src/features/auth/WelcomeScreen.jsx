import { useLang } from '../../i18n/LangContext'

const FEATURES = [
  { emoji: '🧠', ttl: 'welcome_feat1_ttl', desc: 'welcome_feat1_desc' },
  { emoji: '📈', ttl: 'welcome_feat2_ttl', desc: 'welcome_feat2_desc' },
  { emoji: '📱', ttl: 'welcome_feat3_ttl', desc: 'welcome_feat3_desc' },
]

export default function WelcomeScreen({ onStart }) {
  const { t } = useLang()
  return (
    <div className="auth-screen">
      <div className="auth-icon">🔥</div>
      <div className="auth-appname">LOOKSMAXXING</div>
      <div className="auth-subtitle">{t('welcome_subtitle')}</div>
      <div className="welcome-features">
        {FEATURES.map(f => (
          <div className="welcome-feature" key={f.ttl}>
            <div className="welcome-feature-ic">{f.emoji}</div>
            <div>
              <div className="welcome-feature-ttl">{t(f.ttl)}</div>
              <div className="welcome-feature-desc">{t(f.desc)}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-start" onClick={onStart}>{t('welcome_start')}</button>
      <button className="auth-ghost-btn" onClick={onStart}>{t('welcome_have_account')}</button>
    </div>
  )
}
