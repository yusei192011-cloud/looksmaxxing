// True *consecutive*-day streak (breaks on any skipped day) — deliberately
// separate from features/rank/rankLogic.js's getRank(), which counts total
// distinct days ever trained (no consecutivity required). Showing both a
// "🔥 X day streak" and a rank based on a different definition of "days" is
// intentional per the design spec, but the two must never be conflated in
// code — hence living in a different module entirely.
function toDateKey(iso) {
  return new Date(iso).toLocaleDateString()
}

function daysAgoKey(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toLocaleDateString()
}

export function computeStreak(records) {
  const trainedDates = new Set(records.map(r => toDateKey(r.date)))
  if (trainedDates.size === 0) return 0

  // The streak is still "alive" if yesterday was trained even if today
  // hasn't happened yet — only count from today if today already has a
  // record, otherwise start the walk from yesterday.
  let offset = trainedDates.has(daysAgoKey(0)) ? 0 : 1
  if (offset === 1 && !trainedDates.has(daysAgoKey(1))) return 0

  let streak = 0
  while (trainedDates.has(daysAgoKey(offset))) {
    streak++
    offset++
  }
  return streak
}
