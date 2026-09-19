// A session's sets can differ in weight/reps (the user edits them as they
// go), but workout_records stores one row per (weight, reps) combination
// with a set count — so group identical sets into one row each.
export function setsToRecords(exercise, group, completedSets) {
  const rows = []
  for (const s of completedSets) {
    const row = rows.find(r => r.weight === s.weight && r.reps === s.reps)
    if (row) row.sets += 1
    else rows.push({ exercise, group, weight: s.weight, reps: s.reps, sets: 1 })
  }
  return rows
}
