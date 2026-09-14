import { useLang } from '../../../i18n/LangContext'

const CIRC = 552.92

export default function CountdownRing({ remaining, fraction, status }) {
  const { t } = useLang()
  const sec = Math.max(0, Math.ceil(remaining))
  const display = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`
  const dashoffset = CIRC * (fraction - 1)

  return (
    <div className="timer-wrap">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle id="t-bg" cx="100" cy="100" r="88" />
        <circle id="t-arc" className={status} cx="100" cy="100" r="88" strokeDasharray={CIRC} strokeDashoffset={dashoffset} />
      </svg>
      <div className="timer-over">
        <div id="t-disp" className={status}>{display}</div>
        <div className="t-rl">{t('wo_rest_lbl')}</div>
      </div>
    </div>
  )
}
