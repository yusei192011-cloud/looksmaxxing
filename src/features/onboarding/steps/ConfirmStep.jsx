import { useLang } from '../../../i18n/LangContext'

export default function ConfirmStep({ wizard }) {
  const { t } = useLang()
  const { nickname, experience, bodyType, goal, frequency, heightCm, weightKg, submitting, submitError, submit } = wizard

  const rows = [
    [t('nickname_q'), nickname],
    [t('experience_q'), t(`exp_${experience}_ttl`)],
    [t('bodytype_q'), t(`bt_${bodyType}_ttl`)],
    [t('goal_q'), t(`goal_${goal}_ttl`)],
    [t('frequency_q'), frequency],
    [t('height_label'), `${heightCm} cm`],
    [t('su_weight_label'), `${weightKg.toFixed(1)} kg`],
  ]

  return (
    <div className="onb-step">
      <div className="onb-icon">✨</div>
      <div className="onb-q">{t('confirm_q')}</div>
      <div className="onb-desc">{t('confirm_desc')}</div>
      <div className="onb-summary">
        {rows.map(([label, value]) => (
          <div className="onb-summary-row" key={label}>
            <span className="onb-summary-label">{label}</span>
            <span className="onb-summary-value">{value}</span>
          </div>
        ))}
      </div>
      <button className="btn btn-start" onClick={submit} disabled={submitting}>
        {submitting ? t('confirm_creating') : t('confirm_create')}
      </button>
      {submitError && <div className="auth-error">{submitError}</div>}
    </div>
  )
}
