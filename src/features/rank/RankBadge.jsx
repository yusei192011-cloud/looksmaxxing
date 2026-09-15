import { useLang } from '../../i18n/LangContext'
import { useWorkoutRecords } from '../../data/useWorkoutRecords'
import { getRank, RANK_IMGS } from './rankLogic'

export default function RankBadge({ onClick }) {
  const { lang } = useLang()
  const { data: records } = useWorkoutRecords()
  const rank = getRank(records)
  const isJa = lang === 'ja' || lang === 'ko' || lang === 'zh'

  if (rank.level === 0) {
    return (
      <div id="rank-lbl" onClick={onClick}>
        <span style={{ color: 'var(--t4)', fontSize: '11px' }}>{isJa ? 'トレーニングを始めよう' : 'Start training!'}</span>
      </div>
    )
  }

  const name = isJa ? rank.name : rank.nameEn
  const dLabel = isJa ? rank.days + '日' : rank.days + 'd'

  return (
    <div id="rank-lbl" onClick={onClick}>
      <img src={RANK_IMGS[rank.level]} alt="" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
      <span style={{ background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 700, fontSize: 15 }}>{name}</span>
      <span style={{ color: 'var(--t2)', fontSize: 11, marginLeft: 8 }}>{dLabel}</span>
    </div>
  )
}
