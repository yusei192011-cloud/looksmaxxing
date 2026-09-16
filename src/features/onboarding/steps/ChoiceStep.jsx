import { useLang } from '../../../i18n/LangContext'

// Shared by Experience/BodyType/Goal steps — all three are "4 tappable
// cards, tap = select + auto-advance" per the spec, differing only in
// which options and i18n key prefix they use.
export default function ChoiceStep({ icon, questionKey, descKey, options, value, onSelect, keyPrefix }) {
  const { t } = useLang()
  return (
    <div className="onb-step">
      <div className="onb-icon">{icon}</div>
      <div className="onb-q">{t(questionKey)}</div>
      <div className="onb-desc">{t(descKey)}</div>
      <div className="onb-choices">
        {options.map(opt => (
          <button
            key={opt.value}
            className={`onb-choice${value === opt.value ? ' on' : ''}`}
            onClick={() => onSelect(opt.value)}
          >
            <span className="onb-choice-emoji">{opt.emoji}</span>
            <span>
              <span className="onb-choice-ttl">{t(`${keyPrefix}_${opt.value}_ttl`)}</span>
              <span className="onb-choice-desc">{t(`${keyPrefix}_${opt.value}_desc`)}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
