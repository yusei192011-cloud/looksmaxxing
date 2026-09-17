import { useLang } from '../../i18n/LangContext'

const STATUSES = ['good', 'normal', 'sore', 'pain']

const ICONS = {
  good: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 13.5c1 1.3 2.3 2 4 2s3-.7 4-2" />
      <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  normal: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <line x1="8.5" y1="14.5" x2="15.5" y2="14.5" />
      <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  sore: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="6" r="2.6" />
      <path d="M4 21v-3a5 5 0 0 1 5-5h1" />
      <path d="M13 13c1.5-2 4-2 5.5 0 1.2 1.6.7 3.6-1 4.6-1.3.8-2 2-2 3.4" />
    </svg>
  ),
  pain: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 3 4 14h6l-1 7 9-11h-6l1-7z" />
    </svg>
  ),
}

// Selectable list (not immediate-commit): the modal collects one choice via
// `value`/`onSelect`, then confirms it with its own bottom CTA — this lets
// a "pain" selection show its safety notice inline before the user commits.
export default function ConditionPicker({ value, onSelect }) {
  const { t } = useLang()
  return (
    <div className="cond-list">
      {STATUSES.map(status => (
        <button
          key={status}
          className={`cond-row${value === status ? ' on' : ''}`}
          onClick={() => onSelect(status)}
        >
          <span className={`cond-ic cond-ic-${status}`}>{ICONS[status]}</span>
          <span className="cond-text">
            <span className="cond-ttl">{t(`cond_${status}`)}</span>
            <span className="cond-sub">{t(`cond_${status}_desc`)}</span>
          </span>
          {value === status && (
            <span className={`cond-check cond-check-${status}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
