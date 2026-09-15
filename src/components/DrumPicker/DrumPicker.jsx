import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLang } from '../../i18n/LangContext'
import { playTick } from '../../lib/audio'

const ITEM_HEIGHT = 44

function Drum({ items, current, onIndexChange }) {
  const ref = useRef(null)
  const [activeIdx, setActiveIdx] = useState(current)
  const lastIdxRef = useRef(current)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    el.scrollTop = current * ITEM_HEIGHT
    setActiveIdx(current)
    lastIdxRef.current = current
  }, [current])

  const handleScroll = () => {
    const idx = Math.round(ref.current.scrollTop / ITEM_HEIGHT)
    if (idx < 0 || idx >= items.length) return
    setActiveIdx(idx)
    if (idx !== lastIdxRef.current) {
      lastIdxRef.current = idx
      playTick()
      onIndexChange(idx)
    }
  }

  return (
    <div className="picker-drum" ref={ref} onScroll={handleScroll}>
      <div className="picker-list">
        {items.map((item, i) => (
          <div key={item.value} className={`picker-item${i === activeIdx ? ' on' : ''}`}>{item.label}</div>
        ))}
      </div>
    </div>
  )
}

export default function DrumPicker({ cfg, onClose }) {
  const { t } = useLang()
  const indicesRef = useRef([])
  const overlayRef = useRef(null)
  const stageRef = useRef(null)

  useEffect(() => {
    if (!cfg) return
    indicesRef.current = cfg.drums.map(d => d.current)
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
  }, [cfg])

  // Keeps the background page from rubber-band scrolling behind the sheet
  // on iOS even with the body lock above, and lets a drag start anywhere
  // over a (possibly narrow) drum column scroll that column — not just a
  // touch that starts exactly on it.
  useEffect(() => {
    if (!cfg) return
    const overlay = overlayRef.current
    const stage = stageRef.current
    if (!overlay || !stage) return

    const onOverlayTouchMove = (e) => {
      if (!e.target.closest('.picker-drum')) e.preventDefault()
    }

    let activeDrum = null
    let lastY = 0
    const onStageTouchStart = (e) => {
      if (e.target.closest('.picker-drum')) return
      const drums = Array.from(stage.querySelectorAll('.picker-drum'))
      if (!drums.length) return
      if (drums.length === 1) {
        activeDrum = drums[0]
      } else {
        const tx = e.touches[0].clientX
        activeDrum = drums.reduce((best, d) => {
          const r = d.getBoundingClientRect(), br = best.getBoundingClientRect()
          return Math.abs(tx - (r.left + r.width / 2)) < Math.abs(tx - (br.left + br.width / 2)) ? d : best
        })
      }
      lastY = e.touches[0].clientY
      e.preventDefault()
    }
    const onStageTouchMove = (e) => {
      if (!activeDrum) return
      const dy = lastY - e.touches[0].clientY
      activeDrum.scrollTop += dy
      lastY = e.touches[0].clientY
      e.preventDefault()
    }
    const onStageTouchEnd = () => { activeDrum = null }

    overlay.addEventListener('touchmove', onOverlayTouchMove, { passive: false })
    stage.addEventListener('touchstart', onStageTouchStart, { passive: false })
    stage.addEventListener('touchmove', onStageTouchMove, { passive: false })
    stage.addEventListener('touchend', onStageTouchEnd, { passive: true })
    return () => {
      overlay.removeEventListener('touchmove', onOverlayTouchMove)
      stage.removeEventListener('touchstart', onStageTouchStart)
      stage.removeEventListener('touchmove', onStageTouchMove)
      stage.removeEventListener('touchend', onStageTouchEnd)
    }
  }, [cfg])

  if (!cfg) return null

  const hasLabels = cfg.drums.some(d => d.label)

  const confirm = () => {
    const values = cfg.drums.map((drum, di) => {
      const idx = Math.max(0, Math.min(indicesRef.current[di] ?? drum.current, drum.items.length - 1))
      return drum.items[idx].value
    })
    cfg.onConfirm(values)
    onClose()
  }

  return (
    <div id="picker-ov" ref={overlayRef} style={{ display: 'flex' }} role="dialog" aria-modal="true" aria-label={cfg.title}>
      <div id="picker-sh">
        <div id="picker-hdr">
          <span id="picker-ttl">{cfg.title}</span>
          <button className="picker-x" onClick={onClose} aria-label="Close">✕</button>
        </div>
        {hasLabels && (
          <div id="picker-lbl-row" style={{ display: 'flex' }}>
            {cfg.drums.map((drum, di) => (
              <span key={di} className="picker-drum-lbl">{drum.label || ''}</span>
            ))}
          </div>
        )}
        <div id="picker-stage" ref={stageRef}>
          <div id="picker-drums">
            {cfg.drums.map((drum, di) => (
              <div key={di} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                {di > 0 && cfg.sep && <div className="picker-sep">{cfg.sep}</div>}
                <div className="picker-col">
                  <Drum
                    items={drum.items}
                    current={drum.current}
                    onIndexChange={(idx) => { indicesRef.current[di] = idx }}
                  />
                  {drum.suffix && <div className="picker-sfx">{drum.suffix}</div>}
                </div>
              </div>
            ))}
          </div>
          <div className="pk-grad top" />
          <div className="pk-grad bot" />
          <div className="pk-sel" />
        </div>
        <button id="picker-ok" onClick={confirm}>{t('picker_ok')}</button>
      </div>
    </div>
  )
}
