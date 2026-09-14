// Flickers the full-screen #flash overlay (rendered once by AppShell) white
// a few times — the visual complement to the rest-timer alarm sound.
let flashCount = 0

export function flashScreen() {
  const el = document.getElementById('flash')
  if (!el) return
  flashCount = 0
  const step = () => {
    el.style.opacity = flashCount % 2 === 0 ? '0.55' : '0'
    flashCount++
    if (flashCount < 6) setTimeout(step, 110)
    else el.style.opacity = '0'
  }
  step()
}
