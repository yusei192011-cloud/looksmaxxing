import { useEffect, useRef } from 'react'

const CLOSE_DISTANCE = 100
const CLOSE_VELOCITY = 0.6 // px/ms
const TOP_ZONE = 64

// Drag a bottom sheet down to dismiss it. Attach the returned ref to the
// sheet element (not the dimmed backdrop). zone 'top' only starts a drag from
// the header area, for sheets that contain their own draggable controls.
export function useSheetSwipeClose(open, onClose, { zone = 'any' } = {}) {
  const ref = useRef(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    const el = ref.current
    if (!open || !el) return

    let startY = 0, startT = 0, dy = 0, active = false, dragging = false

    const onStart = (e) => {
      const touch = e.touches[0]
      const rect = el.getBoundingClientRect()
      const inZone = zone === 'any' || touch.clientY - rect.top <= TOP_ZONE
      active = inZone && el.scrollTop <= 0
      dragging = false
      dy = 0
      startY = touch.clientY
      startT = e.timeStamp
    }
    const onMove = (e) => {
      if (!active) return
      dy = e.touches[0].clientY - startY
      if (dy <= 0) {
        if (dragging) el.style.transform = ''
        return
      }
      if (!dragging && dy < 6) return
      dragging = true
      e.preventDefault()
      el.style.transition = 'none'
      el.style.transform = `translateY(${dy}px)`
    }
    const onEnd = (e) => {
      if (!active || !dragging) { active = false; return }
      active = false
      dragging = false
      const velocity = dy / Math.max(1, e.timeStamp - startT)
      el.style.transition = 'transform .2s ease'
      if (dy > CLOSE_DISTANCE || velocity > CLOSE_VELOCITY) {
        el.style.transform = 'translateY(100%)'
        setTimeout(() => closeRef.current?.(), 180)
      } else {
        el.style.transform = ''
      }
    }

    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchmove', onMove, { passive: false })
    el.addEventListener('touchend', onEnd)
    el.addEventListener('touchcancel', onEnd)
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onEnd)
      el.removeEventListener('touchcancel', onEnd)
    }
  }, [open, zone])

  return ref
}
