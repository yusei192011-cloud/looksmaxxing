import { useLang } from '../../i18n/LangContext'

export default function WeightProgress({ bodyWeight, targetWeight, records }) {
  const { lang } = useLang()
  const isJa = lang === 'ja' || lang === 'ko' || lang === 'zh'
  const latest = records.length ? records[records.length - 1].weight : bodyWeight
  const diff = latest - targetWeight

  if (Math.abs(diff) < 0.05) {
    return (
      <div style={{ color: 'var(--green)', fontFamily: "'Fredoka','Zen Maru Gothic',sans-serif", fontSize: '18px', letterSpacing: '2px', textAlign: 'center' }}>
        🎯 TARGET REACHED!
      </div>
    )
  }

  const absDiff = Math.abs(diff).toFixed(1)
  const label = isJa
    ? (diff > 0 ? `目標まであと -${absDiff}kg` : `目標超過 +${absDiff}kg`)
    : (diff > 0 ? `-${absDiff}kg to goal` : `+${absDiff}kg over goal`)
  const pct = records.length
    ? Math.max(0, Math.min(100, Math.round((1 - Math.abs(diff) / Math.max(1, Math.abs(records[0].weight - targetWeight))) * 100)))
    : 0

  return (
    <>
      <div style={{ color: 'var(--t2)', fontSize: '12px', marginBottom: '6px', textAlign: 'center' }}>{label}</div>
      <div style={{ height: '6px', background: 'var(--s2)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'var(--grad)', borderRadius: '3px', transition: 'width .3s' }} />
      </div>
    </>
  )
}
