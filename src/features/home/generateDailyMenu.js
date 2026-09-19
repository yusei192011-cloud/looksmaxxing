import { GROUP_EX } from '../workout/groups'
import { applyConditionOverrides, listGroupRecovery } from './recovery'
import { sessionsThisWeek } from './weeklyStats'
import { getPlan, nextTarget, orderForExperience, repRange } from './menuPlan'

function exerciseNamesForGroup(group, records, lang) {
  const key = (lang === 'ja' || lang === 'ko' || lang === 'zh') ? 'ja' : 'en'
  const base = GROUP_EX[group]?.[key] || []
  const past = [...new Set(records.filter(r => (r.group || 'other') === group).map(r => r.exercise))]
  return [...new Set([...base, ...past])]
}

// Pure and swappable: a future AI-backed generator can return the exact
// same shape and nothing else in the app needs to change.
export function generateDailyMenu({ records, frequency, lang, rotation = 0, checkinsToday = [], profile = null }) {
  const plan = getPlan(profile)
  const ranked = applyConditionOverrides(listGroupRecovery(records), checkinsToday)
  // sore/pain both mean "skip this group today" — pain is filtered explicitly
  // (not just deprioritized via hours=0) so it can never be picked even if
  // every other group also just got trained.
  const candidates = ranked.filter(r => r.conditionStatus !== 'sore' && r.conditionStatus !== 'pain')
  const adjustedForCondition = checkinsToday.some(c => c.status === 'sore' || c.status === 'pain')

  if (candidates.length === 0) {
    return {
      targetGroup: null,
      dayLabel: { day: Math.min(sessionsThisWeek(records) + 1, frequency || 1), of: frequency || 1 },
      exercises: [],
      restDay: true,
      adjustedForCondition,
    }
  }

  const targetGroup = candidates[rotation % candidates.length].group

  const names = orderForExperience(exerciseNamesForGroup(targetGroup, records, lang), plan)
  const offset = names.length ? rotation % names.length : 0
  const rotated = [...names.slice(offset), ...names.slice(0, offset)]
  const chosen = rotated.slice(0, plan.exercises)

  const exercises = chosen.map(exercise => {
    const target = nextTarget({ exercise, group: targetGroup, records, plan })
    return { exercise, group: targetGroup, ...target, ...repRange(target, plan) }
  })

  return {
    targetGroup,
    dayLabel: { day: Math.min(sessionsThisWeek(records) + 1, frequency || 1), of: frequency || 1 },
    exercises,
    restDay: false,
    adjustedForCondition,
  }
}
