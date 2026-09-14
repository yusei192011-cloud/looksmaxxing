export function formatRelativeDate(iso, t) {
  const d = new Date(iso)
  const diff = Math.floor((Date.now() - d.getTime()) / 864e5)
  if (diff === 0) return t('today')
  if (diff === 1) return t('yesterday')
  if (diff < 7) return diff + t('dago')
  return `${d.getMonth() + 1}/${d.getDate()}`
}
