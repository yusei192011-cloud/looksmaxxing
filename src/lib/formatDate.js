// Local (not UTC) calendar date as YYYY-MM-DD — condition check-ins are keyed
// by the user's felt "today", which drifts from UTC's near midnight.
export function toLocalDateStr(d) {
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

export function todayLocalDate() {
  return toLocalDateStr(new Date())
}

export function formatRelativeDate(iso, t) {
  const d = new Date(iso)
  const diff = Math.floor((Date.now() - d.getTime()) / 864e5)
  if (diff === 0) return t('today')
  if (diff === 1) return t('yesterday')
  if (diff < 7) return diff + t('dago')
  return `${d.getMonth() + 1}/${d.getDate()}`
}
