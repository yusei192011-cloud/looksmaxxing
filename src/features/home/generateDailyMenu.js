import { GROUP_EX } from '../workout/groups'
import { listGroupRecovery } from './recovery'
import { sessionsThisWeek } from './weeklyStats'

const EXERCISES_PER_MENU = 5
const DEFAULT_REST_SECS = 90
const DEFAULT_REPS = 10
const DEFAULT_SETS = 3

// Flat, conservative starting weights (kg) for a group with no history at
// all — intentionally light; a real weight from the user's own past
// records always wins over this once one exists.
const GROUP_DEFAULT_WEIGHT = { chest: 20, back: 20, shoulder: 10, arms: 8, legs: 30, abs: 0 }

function exerciseNamesForGroup(group, records, lang) {
  const key = (lang === 'ja' || lang === 'ko' || lang === 'zh') ? 'ja' : 'en'
  const base = GROUP_EX[group]?.[key] || []
  const past = [...new Set(records.filter(r => (r.group || 'other') === group).map(r => r.exercise))]
  return [...new Set([...base, ...past])]
}

// Pure and swappable: a future AI-backed generator can return the exact
// same shape and nothing else in the app needs to change.
export function generateDailyMenu({ records, frequency, lang, rotation = 0 }) {
  const ranked = listGroupRecovery(records)
  const targetGroup = ranked[rotation % ranked.length].group

  const names = exerciseNamesForGroup(targetGroup, records, lang)
  const offset = names.length ? rotation % names.length : 0
  const rotated = [...names.slice(offset), ...names.slice(0, offset)]
  const chosen = rotated.slice(0, EXERCISES_PER_MENU)

  const exercises = chosen.map(exercise => {
    const last = records.find(r => r.exercise === exercise)
    return {
      exercise,
      group: targetGroup,
      weight: last?.weight ?? GROUP_DEFAULT_WEIGHT[targetGroup] ?? 10,
      reps: last?.reps ?? DEFAULT_REPS,
      sets: last?.sets ?? DEFAULT_SETS,
      restSecs: DEFAULT_REST_SECS,
    }
  })

  return {
    targetGroup,
    dayLabel: { day: Math.min(sessionsThisWeek(records) + 1, frequency || 1), of: frequency || 1 },
    exercises,
  }
}
