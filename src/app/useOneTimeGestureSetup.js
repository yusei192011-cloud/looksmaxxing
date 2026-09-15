import { useEffect } from 'react'

// Two one-shot bits of setup that must happen on the very first user
// gesture: unlocking the Web Audio context (autoplay policy) as early and
// reliably as possible, and asking for Notification permission (needed for
// the rest-timer "done" alert) rather than waiting for a specific button.
export function useOneTimeGestureSetup() {
  useEffect(() => {
    function initAudio() {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        if (ctx.state === 'suspended') ctx.resume()
        const o = ctx.createOscillator(), g = ctx.createGain()
        g.gain.value = 0
        o.connect(g); g.connect(ctx.destination)
        o.start(); o.stop(ctx.currentTime + 0.01)
      } catch { /* audio not available */ }
      document.removeEventListener('touchstart', initAudio)
    }
    document.addEventListener('touchstart', initAudio, { once: true })

    function requestNotificationPermission() {
      Notification.requestPermission()
      document.removeEventListener('click', requestNotificationPermission)
    }
    if ('Notification' in window && Notification.permission === 'default') {
      document.addEventListener('click', requestNotificationPermission, { once: true })
    }

    return () => {
      document.removeEventListener('touchstart', initAudio)
      document.removeEventListener('click', requestNotificationPermission)
    }
  }, [])
}
