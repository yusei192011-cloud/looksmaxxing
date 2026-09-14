let audioCtx = null

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  return audioCtx
}

function beep(freq, dur, vol, type = 'sine') {
  try {
    const c = getAudioCtx()
    if (c.state === 'suspended') c.resume()
    const o = c.createOscillator(), g = c.createGain()
    o.connect(g); g.connect(c.destination)
    o.frequency.value = freq; o.type = type
    g.gain.setValueAtTime(vol, c.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur)
    o.start(c.currentTime); o.stop(c.currentTime + dur)
  } catch { /* audio not available (autoplay policy, unsupported browser) */ }
}

// Drum-picker scroll-snap tick.
export function playTick() {
  try {
    const c = getAudioCtx()
    const now = c.currentTime
    if (c.state === 'suspended') c.resume()
    const osc = c.createOscillator()
    const g = c.createGain()
    osc.type = 'sine'; osc.frequency.value = 3800
    g.gain.setValueAtTime(0.08, now)
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.03)
    osc.connect(g); g.connect(c.destination)
    osc.start(now); osc.stop(now + 0.03)
  } catch { /* audio not available */ }
}

// Rest-timer last-5-seconds countdown tick; the final second gets a
// distinct higher/longer beep plus a stronger vibration pulse.
export function playCountdown(rem) {
  if (rem === 1) beep(880, .3, .4, 'sine')
  else beep(523, .12, .25, 'sine')
  if (navigator.vibrate) navigator.vibrate(rem === 1 ? 80 : 30)
}

export async function playAlarm() {
  const ctx = getAudioCtx()
  if (ctx.state === 'suspended') await ctx.resume()
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      try {
        const o = ctx.createOscillator(), g = ctx.createGain()
        o.connect(g); g.connect(ctx.destination)
        o.frequency.value = 880; o.type = 'sine'
        g.gain.value = 0.3
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
        o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.3)
      } catch { /* audio not available */ }
    }, i * 400)
  }
  if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200])
}

export function notifyTimerDone() {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('LOOKSMAXXING', {
      body: '休憩終了！次のセットを始めよう！',
      tag: 'timer-done',
      requireInteraction: true,
    })
  }
}
