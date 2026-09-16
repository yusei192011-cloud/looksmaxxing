import { useLang } from '../../i18n/LangContext'
import OtpDigitInput from './OtpDigitInput'

function maskEmail(email) {
  const [name, domain] = email.split('@')
  if (!name || !domain) return email
  const masked = name.length <= 2 ? name[0] + '*' : name[0] + '*'.repeat(name.length - 2) + name[name.length - 1]
  return `${masked}@${domain}`
}

export default function OtpStep({ email, otp, setOtp, verifying, message, onBack, onVerify, onResend }) {
  const { t } = useLang()
  return (
    <div className="auth-screen">
      <button className="auth-back-btn" onClick={onBack} aria-label="Back">←</button>
      <div className="auth-step-ttl">{t('otp_step_title')}</div>
      <div className="auth-step-desc">{t('otp_sent_text')}</div>
      <div className="auth-masked-email">{maskEmail(email)}</div>
      <OtpDigitInput value={otp} onChange={setOtp} onComplete={onVerify} />
      <div className="auth-note" style={{ textAlign: 'center' }}>{t('otp_hint')}</div>
      <button className="btn btn-start" onClick={onVerify} disabled={verifying || otp.length < 6} style={{ marginTop: '16px' }}>
        {verifying ? t('otp_verifying') : t('otp_verify')}
      </button>
      <button className="auth-ghost-btn" onClick={onResend}>{t('otp_resend')}</button>
      {message && <div className="auth-error">{message}</div>}
    </div>
  )
}
