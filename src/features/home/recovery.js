import { GROUPS } from '../workout/groups'

const TRAINABLE_GROUPS = GROUPS.filter(g => g.id !== 'other').map(g => g.id)

export function hoursSinceLastTrained(records, group) {
  const latest = records
    .filter(r => (r.group || 'other') === group)
    .reduce((max, r) => Math.max(max, new Date(r.date).getTime()), 0)
  if (latest === 0) return Infinity
  return (Date.now() - latest) / 36e5
}

export function recoveryBucket(hours) {
  if (hours < 24) return 'recovering'
  if (hours < 48) return 'almost_recovered'
  return 'recovered'
}

// Sorted longest-since-trained (most recovered) first — never-trained
// groups (Infinity) sort to the very front, matching the spec's "recovered
// groups first" menu-generation rule.
export function listGroupRecovery(records) {
  return TRAINABLE_GROUPS
    .map(group => {
      const hours = hoursSinceLastTrained(records, group)
      return { group, hours, bucket: recoveryBucket(hours) }
    })
    .sort((a, b) => (b.hours === a.hours ? 0 : b.hours - a.hours))
}

// Lets a same-day condition check-in override the purely time-based estimate:
// 'good' means fully recovered regardless of elapsed hours, 'sore'/'pain'
// means treat it as just-trained (needs max recovery) so it naturally sorts
// to the back of the ranking. 'normal' or no check-in leaves the automatic
// value untouched.
export function applyConditionOverrides(ranked, checkinsToday) {
  const statusByGroup = Object.fromEntries(checkinsToday.map(c => [c.group, c.status]))
  return ranked
    .map(entry => {
      const status = statusByGroup[entry.group]
      const hours =
        status === 'good' ? Infinity
        : status === 'sore' || status === 'pain' ? 0
        : entry.hours
      return { ...entry, hours, bucket: recoveryBucket(hours), conditionStatus: status ?? null }
    })
    .sort((a, b) => (b.hours === a.hours ? 0 : b.hours - a.hours))
}
