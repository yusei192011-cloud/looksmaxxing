// Target body weight is a single user preference, not a "record" of history,
// so — like the original implementation — it stays in localStorage rather
// than in the body_weight_records table.
const TARGET_W_KEY = 'target_weight_v1'

export function loadTargetWeight() {
  const v = parseFloat(localStorage.getItem(TARGET_W_KEY))
  return isNaN(v) ? 65.0 : v
}

export function saveTargetWeight(v) {
  localStorage.setItem(TARGET_W_KEY, String(v))
}
