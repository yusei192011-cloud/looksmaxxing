import { useRef } from 'react'

const INITIAL_DELAY = 400
const MIN_INTERVAL = 40
const RAMP = 800
const MOVE_CANCEL_PX = 10

// A tap fires onPress once. Holding past 400ms fires onPress immediately and
// then repeatedly, accelerating over time — used for the weight/reps/sets/
// rest ± steppers. Ported from the original makeLongPress()/initLongPress().
export default function LongPressButton({ onPress, ...rest }) {
  const timerRef = useRef(null)
  const intervalRef = useRef(null)
  const startPosRef = useRef({ x: 0, y: 0 })
  const firedRef = useRef(false)
  const activeRef = useRef(false)

  const clearAll = () => {
    clearTimeout(timerRef.current); timerRef.current = null
    clearTimeout(intervalRef.current); intervalRef.current = null
    activeRef.current = false
  }

  const handlePointerDown = (e) => {
    clearAll()
    startPosRef.current = { x: e.clientX, y: e.clientY }
    timerRef.current = setTimeout(() => {
      activeRef.current = true
      firedRef.current = true
      if (navigator.vibrate) navigator.vibrate(20)
      onPress()
      const t0 = Date.now()
      const loop = () => {
        const elapsed = Date.now() - t0
        const delay = Math.max(MIN_INTERVAL, 150 / (1 + elapsed / RAMP))
        intervalRef.current = setTimeout(() => { onPress(); loop() }, delay)
      }
      loop()
    }, INITIAL_DELAY)
  }

  const handlePointerMove = (e) => {
    if (!timerRef.current && !activeRef.current) return
    const dx = e.clientX - startPosRef.current.x
    const dy = e.clientY - startPosRef.current.y
    if (Math.hypot(dx, dy) >= MOVE_CANCEL_PX) clearAll()
  }

  const handleClick = (e) => {
    if (firedRef.current) {
      firedRef.current = false
      e.preventDefault()
      e.stopPropagation()
      return
    }
    onPress()
  }

  return (
    <button
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={clearAll}
      onPointerCancel={clearAll}
      onPointerLeave={clearAll}
      onClick={handleClick}
      {...rest}
    />
  )
}
