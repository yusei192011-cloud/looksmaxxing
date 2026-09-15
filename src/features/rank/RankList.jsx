import { useLang } from '../../i18n/LangContext'
import { RANK_DEFS, RANK_IMGS } from './rankLogic'

// Shared by RankModal and StatusPane — the original independently rebuilt
// this same list markup in both places (renderStatus() duplicated
// openRankModal()'s rank-row rendering almost verbatim).
export default function RankList({ rank }) {
  const { lang } = useLang()
  const isJa = lang === 'ja' || lang === 'ko' || lang === 'zh'

  return (
    <div className="rank-list">
      {RANK_DEFS.map(rd => {
        const isCur = rd.level === rank.level
        const isDone = rd.level < rank.level
        const imgStyle = isDone || isCur ? undefined : { filter: 'grayscale(1)', opacity: 0.4 }
        return (
          <div key={rd.level} className={`rank-row${isCur ? ' cur' : ''}`} style={isCur ? { borderColor: rd.color } : undefined}>
            <div className="img-clip"><img className="rank-img-sm" src={RANK_IMGS[rd.level]} alt="" style={imgStyle} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="rank-row-name" style={{ color: isCur || isDone ? rd.color : '#3a3a3a' }}>{isJa ? rd.name : rd.nameEn}</div>
              <div className="rank-row-req">{isJa ? rd.req : rd.reqEn}</div>
            </div>
            {isCur && <span className="rank-row-badge" style={{ color: rd.color }}>NOW</span>}
            {isDone && <span className="rank-row-badge" style={{ color: 'var(--green)' }}>✓</span>}
          </div>
        )
      })}
    </div>
  )
}
