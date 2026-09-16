// Calendar week starting Monday (ISO-style), not a rolling 7-day window —
// so "this week" resets predictably rather than always meaning "last 7 days".
function startOfWeek(date = new Date()) {
  const d = new Date(date)
  const day = d.getDay() // 0 = Sunday
  const diffToMonday = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diffToMonday)
  d.setHours(0, 0, 0, 0)
  return d
}

function recordsThisWeek(records) {
  const start = startOfWeek().getTime()
  return records.filter(r => new Date(r.date).getTime() >= start)
}

export function sessionsThisWeek(records) {
  const dates = new Set(recordsThisWeek(records).map(r => new Date(r.date).toLocaleDateString()))
  return dates.size
}

export function totalVolumeThisWeek(records) {
  return recordsThisWeek(records).reduce((sum, r) => sum + (r.volume ?? r.weight * r.reps * r.sets), 0)
}
