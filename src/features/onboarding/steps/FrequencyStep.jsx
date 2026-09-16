import { useLang } from '../../../i18n/LangContext'
import { FREQUENCY_OPTIONS } from '../onboardingOptions'

export default function FrequencyStep({ frequency, setFrequency, onNext }) {
  const { t } = useLang()
  return (
    <div className="onb-step">
      <div className="onb-icon">📅</div>
      <div className="onb-q">{t('frequency_q')}</div>
      <div className="onb-desc">{t('frequency_desc')}</div>
      <div className="onb-freq-grid">
        {FREQUENCY_OPTIONS.map(n => (
          <button
            key={n}
            className={`onb-freq-btn${frequency === n ? ' on' : ''}`}
            onClick={() => { setFrequency(n); onNext() }}
          >{n}</button>
        ))}
      </div>
      <div className="onb-note">{t('frequency_note')}</div>
    </div>
  )
}
