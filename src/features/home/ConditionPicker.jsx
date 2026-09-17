import { useLang } from '../../i18n/LangContext'

const STATUSES = ['good', 'normal', 'sore', 'pain']

// One-tap commit — selecting a status immediately fires onSelect, there is
// no separate confirm step (kept low-friction per the product decision that
// this check-in should never feel like a form).
export default function ConditionPicker({ onSelect }) {
  const { t } = useLang()
  return (
    <div className="dlg-acts">
      {STATUSES.map(status => (
        <button
          key={status}
          className={`dbtn dbtn-cond-${status}`}
          onClick={() => onSelect(status)}
        >
          {t(`cond_${status}`)}
        </button>
      ))}
    </div>
  )
}
