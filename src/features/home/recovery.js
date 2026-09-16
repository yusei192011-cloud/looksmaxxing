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
