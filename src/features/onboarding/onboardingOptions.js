// Option values only — labels come from i18n (t('exp_beginner_ttl') etc.),
// unlike groups.js's inline per-language exercise-name objects, since these
// are UI chrome text that belongs in the normal translation tables.
export const EXPERIENCE_OPTIONS = [
  { value: 'complete_beginner', emoji: '🔰' },
  { value: 'beginner', emoji: '💪' },
  { value: 'intermediate', emoji: '🔥' },
  { value: 'advanced', emoji: '🏆' },
]

export const BODY_TYPE_OPTIONS = [
  { value: 'skinny', emoji: '🦴' },
  { value: 'average', emoji: '⚖️' },
  { value: 'chubby', emoji: '🐻' },
  { value: 'overweight', emoji: '🍔' },
]

export const GOAL_OPTIONS = [
  { value: 'lose_weight', emoji: '📉' },
  { value: 'lean_muscle', emoji: '🏖️' },
  { value: 'bulk', emoji: '💥' },
  { value: 'health', emoji: '💚' },
]

export const FREQUENCY_OPTIONS = [1, 2, 3, 4, 5, 6, 7]
