import { useEffect } from 'react'

// Reference-counted so stacked overlays (e.g. the form card opened on top of
// the guided session) share one lock — the last one to close restores scroll.
let lockCount = 0
let savedScrollY = 0

function lock() {
  if (lockCount++ > 0) return
  savedScrollY = window.scrollY
  const b = document.body.style
  b.top = `-${savedScrollY}px`
  b.overflow = 'hidden'
  b.position = 'fixed'
  b.width = '100%'
  document.documentElement.style.overflow = 'hidden'
}

function unlock() {
  if (--lockCount > 0) return
  const b = document.body.style
  b.overflow = ''
  b.position = ''
  b.width = ''
  b.top = ''
  document.documentElement.style.overflow = ''
  window.scrollTo(0, savedScrollY)
}

export function useBodyScrollLock(active) {
  useEffect(() => {
    if (!active) return
    lock()
    return unlock
  }, [active])
}
