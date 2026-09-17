import { useEffect } from 'react'
import { useLang } from '../../i18n/LangContext'
import { useWorkoutRecords } from '../../data/useWorkoutRecords'
import { getRank, RANK_DEFS, RANK_FROM, RANK_IMGS } from './rankLogic'
import RankList from './RankList'

function useBodyScrollLock(active) {
  useEffect(() => {
    if (!active) return
    const scrollY = window.scrollY
    document.body.style.top = `-${scrollY}px`
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    return () => {
      const y = document.body.style.top
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      window.scrollTo(0, parseInt(y || '0', 10) * -1)
    }
  }, [active])
}

export default function RankModal({ open, onClose }) {
  const { t, lang } = useLang()
  const { data: records } = useWorkoutRecords()
  useBodyScrollLock(open)

  if (!open) return null

  const rank = getRank(records)
  const isJa = lang === 'ja' || lang === 'ko' || lang === 'zh'

  return (
    <div id="rank-ov" className="open" style={{ display: 'flex' }} role="dialog" aria-modal="true">
      <div id="rank-sh">
        <button className="rank-close-btn" onClick={onClose} aria-label="Close">✕</button>
        <div className="rank-hero">
          <div className="img-clip">
            <img className="rank-img-lg" src={rank.level > 0 ? RANK_IMGS[rank.level] : undefined} alt="" style={{ display: rank.level > 0 ? '' : 'none' }} />
          </div>
          <div className="rank-name-lg" style={{ color: rank.color }}>{isJa ? rank.name : rank.nameEn}</div>
          <div className="rank-days-lg">{isJa ? `${rank.days}日のトレーニング` : `${rank.days} training days`}</div>
        </div>
        <div className="rank-mid">
          {rank.next !== null ? (
            (() => {
              const from = RANK_FROM[rank.level]
              const pct = Math.min(100, Math.round((rank.days - from) / (rank.next - from) * 100))
              const nextDef = RANK_DEFS.find(r => r.level === rank.level + 1)
              const fromLabel = isJa ? rank.name : rank.nameEn
              const toLabel = nextDef ? (isJa ? nextDef.name : nextDef.nameEn) : ''
              const remaining = rank.next - rank.days
              return (
                <>
                  <div className="rank-prog-header">
                    <span>{fromLabel}({RANK_FROM[rank.level]}{isJa ? '日' : 'd'})</span>
                    <span>{toLabel}({rank.next}{isJa ? '日' : 'd'})</span>
                  </div>
                  <div className="rank-prog-bar"><div className="rank-prog-fill" style={{ width: `${pct}%`, background: rank.color }} /></div>
                  <div className="rank-prog-sub">
                    <span>{isJa ? '現在: ' : 'Now: '}{rank.days}{isJa ? '日' : 'd'}</span>
                    <span>{isJa ? `次まであと${remaining}日` : `${remaining}d to next`}</span>
                  </div>
                </>
              )
            })()
          ) : (
            <div style={{ textAlign: 'center', fontFamily: "'Fredoka',sans-serif", fontSize: '20px', letterSpacing: '3px', color: rank.color, padding: '10px 0' }}>
              MAX RANK ACHIEVED 🏆
            </div>
          )}
        </div>
        <div className="rank-bottom">
          <div className="rank-section-ttl">{isJa ? '全ランク' : 'ALL RANKS'}</div>
          <RankList rank={rank} />
        </div>
      </div>
    </div>
  )
}
