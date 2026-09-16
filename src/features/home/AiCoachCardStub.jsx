import { useLang } from '../../i18n/LangContext'

// AI chat is a later phase (needs a Supabase Edge Function + Claude API
// key). Shown as a visibly-disabled card rather than a working-looking
// button that does nothing when tapped.
export default function AiCoachCardStub() {
  const { t } = useLang()
  return (
    <div className="sec">
      <div className="home-ai-card" aria-disabled="true">
        <div className="home-ai-ic">🤖</div>
        <div style={{ flex: 1 }}>
          <div className="home-ai-ttl">{t('ask_ai')}</div>
          <div className="home-ai-desc">{t('ask_ai_desc')}</div>
        </div>
        <div className="home-ai-badge">{t('ai_coming_soon')}</div>
      </div>
    </div>
  )
}
