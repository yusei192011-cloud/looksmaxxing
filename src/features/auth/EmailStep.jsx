import { useLang } from '../../i18n/LangContext'

export default function EmailStep({ email, setEmail, sending, message, onBack, onSend }) {
  const { t } = useLang()
  return (
    <div className="auth-screen">
      <button className="auth-back-btn" onClick={onBack} aria-label="Back">←</button>
      <div className="auth-step-ttl">{t('email_step_title')}</div>
      <div className="auth-step-desc">{t('email_step_desc')}</div>
      <label htmlFor="auth-email" className="sec-ttl" style={{ marginTop: '18px' }}>{t('email_label')}</label>
      <input
        id="auth-email"
        className="inp"
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onSend()}
        autoFocus
      />
      <div className="auth-note">{t('email_note')}</div>
      <button className="btn btn-start" onClick={onSend} disabled={sending || !email} style={{ marginTop: '16px' }}>
        {sending ? t('email_sending') : t('email_send')}
      </button>
      {message && <div className="auth-error">{message}</div>}
    </div>
  )
}
