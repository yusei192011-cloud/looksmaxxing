import { useEffect, useMemo, useRef } from 'react'
import { useLang } from '../../i18n/LangContext'
import { RANK_IMGS } from './rankLogic'

const AUTO_HIDE_MS = 3000

function makeParticles() {
  return Array.from({ length: 24 }, () => {
    const size = 4 + Math.random() * 8
    return {
      size,
      left: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
      opacity: 0.4 + Math.random() * 0.6,
    }
  })
}

export default function RankUpOverlay({ rank, onHide }) {
  const { lang } = useLang()
  const timerRef = useRef(null)
  // Regenerated only when a new rank-up actually happens, not on every render.
  const particles = useMemo(() => (rank ? makeParticles() : []), [rank])

  useEffect(() => {
    if (!rank) return
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(onHide, AUTO_HIDE_MS)
    return () => clearTimeout(timerRef.current)
  }, [rank, onHide])

  if (!rank) return null

  const isJa = lang === 'ja' || lang === 'ko' || lang === 'zh'
  const name = isJa ? rank.name : rank.nameEn
  const remaining = rank.next ? rank.next - rank.days : 0
  const msg = rank.next
    ? (isJa ? `🎉 おめでとう！次のランクまであと${remaining}日！` : `🎉 Congrats! ${remaining} days to next rank!`)
    : (isJa ? '🏆 おめでとう！最高ランク到達！' : '🏆 Congrats! Max rank achieved!')

  return (
    <div id="rankup-ov" className="open" style={{ display: 'flex' }} onClick={onHide}>
      <div id="rankup-particles">
        {particles.map((p, i) => (
          <div
            key={i}
            className="sp"
            style={{
              width: p.size, height: p.size, left: `${p.left}%`, bottom: -p.size,
              background: rank.color,
              animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s`,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>
      <div className="rankup-label" style={{ color: rank.color }}>RANK UP!</div>
      <div className="img-clip"><img className="rankup-trophy" src={RANK_IMGS[rank.level]} alt="" /></div>
      <div className="rankup-texts">
        <div className="rankup-name" style={{ color: rank.color }}>{name}</div>
        <div className="rankup-msg">{msg}</div>
      </div>
      <div className="rankup-hint">TAP TO CLOSE</div>
    </div>
  )
}
