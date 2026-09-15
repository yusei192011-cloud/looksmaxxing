import { useLang } from '../../i18n/LangContext'
import { useWorkoutRecords } from '../../data/useWorkoutRecords'
import { getRank, RANK_DEFS, RANK_FROM, RANK_IMGS } from '../rank/rankLogic'
import RankList from '../rank/RankList'

export default function StatusPane() {
  const { lang } = useLang()
  const { data: records } = useWorkoutRecords()
  const rank = getRank(records)
  const isJa = lang === 'ja' || lang === 'ko' || lang === 'zh'

  return (
    <div id="pane-status" className="pane on">
      <div className="status-inner">
        {rank.level === 0 ? (
          <div className="status-hero">
            <div className="status-no-rank-ic"><img src="muscle_body.png" alt="" style={{ width: 80, height: 80, objectFit: 'contain', opacity: 0.6 }} /></div>
            <div className="status-no-rank-msg">{isJa ? 'トレーニングを始めよう！' : 'Start Training!'}</div>
          </div>
        ) : (
          <div className="status-hero">
            <div className="img-clip"><img className="status-rank-img" src={RANK_IMGS[rank.level]} alt="" /></div>
            <div className="status-rank-name" style={{ color: rank.color }}>{isJa ? rank.name : rank.nameEn}</div>
            <div className="status-rank-days">{rank.days}{isJa ? '日達成' : ' days achieved'}</div>
          </div>
        )}

        {rank.next !== null ? (
          (() => {
            const from = RANK_FROM[rank.level]
            const pct = Math.min(100, Math.round((rank.days - from) / (rank.next - from) * 100))
            const nextDef = RANK_DEFS.find(r => r.level === rank.level + 1)
            const nextLabel = nextDef ? (isJa ? nextDef.name : nextDef.nameEn) : ''
            return (
              <div className="status-prog-wrap">
                <div className="status-prog-bar"><div className="status-prog-fill" style={{ width: `${pct}%`, background: rank.color }} /></div>
                <div className="status-prog-meta">
                  <span>{rank.days}{isJa ? '日' : 'd'} / {rank.next}{isJa ? '日' : 'd'}</span>
                  <span style={{ color: rank.color }}>{isJa ? `次: ${rank.next}日 (${nextLabel})` : `Next: ${rank.next}d (${nextLabel})`}</span>
                </div>
              </div>
            )
          })()
        ) : (
          <div className="status-prog-wrap"><div className="status-max-rank" style={{ color: rank.color }}>MAX RANK 🏆</div></div>
        )}

        <div className="status-list-ttl">{isJa ? '全ランク' : 'ALL RANKS'}</div>
        <RankList rank={rank} />
      </div>
    </div>
  )
}
