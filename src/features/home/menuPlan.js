import { slugForExercise } from '../workout/exerciseIcons'

// Rule-based personalization + progressive overload. Pure functions: the
// menu generator calls these, and a future AI generator can replace them
// while returning the same { weight, reps, sets, reason } shape.

const EXPERIENCE = {
  complete_beginner: { exercises: 4, sets: 2, weightFactor: 0.4, bwReps: 5 },
  beginner:          { exercises: 5, sets: 3, weightFactor: 0.6, bwReps: 8 },
  intermediate:      { exercises: 5, sets: 3, weightFactor: 1.0, bwReps: 10 },
  advanced:          { exercises: 6, sets: 4, weightFactor: 1.4, bwReps: 12 },
}

// Rep range per goal; higher reps + a lighter start for fat-loss / health.
const GOAL = {
  bulk:        { repLow: 8,  repHigh: 12, weightFactor: 1.0 },
  lean_muscle: { repLow: 10, repHigh: 12, weightFactor: 0.95 },
  lose_weight: { repLow: 12, repHigh: 15, weightFactor: 0.85 },
  health:      { repLow: 10, repHigh: 15, weightFactor: 0.85 },
}

// Typical working weight (kg) for an intermediate lifter, per exercise slug
// (dumbbell lifts are per hand). Scaled down for lighter experience below.
const BASE_WEIGHT = {
  'bench-press': 40, 'dumbbell-bench-press': 14, 'incline-bench-press': 30, 'dumbbell-fly': 8,
  'machine-chest-press': 30, 'lat-pulldown': 35, 'one-arm-dumbbell-row': 16, 'deadlift': 60,
  'dumbbell-bent-over-row': 12, 'seated-row': 30, 'seated-dumbbell-press': 10, 'lateral-raise': 4,
  'front-raise': 4, 'overhead-press': 25, 'face-pull': 15, 'arnold-press': 8,
  'bicep-curl': 8, 'hammer-curl': 8, 'preacher-curl': 15, 'tricep-pushdown': 15,
  'overhead-tricep-extension': 8, 'skull-crusher': 15, 'squat': 50, 'leg-press': 80,
  'leg-curl': 25, 'leg-extension': 25, 'walking-lunge': 8, 'bulgarian-split-squat': 8,
  'dumbbell-side-bend': 8,
}
const GROUP_BASE_WEIGHT = { chest: 30, back: 30, shoulder: 10, arms: 8, legs: 40, abs: 0 }

const BODYWEIGHT = new Set(['push-up', 'pull-up', 'dip', 'calf-raise', 'crunch', 'plank', 'lying-leg-raise', 'ab-wheel'])
const HARD_BODYWEIGHT = new Set(['pull-up', 'dip'])
const DUMBBELL = new Set([
  'dumbbell-bench-press', 'dumbbell-fly', 'one-arm-dumbbell-row', 'dumbbell-bent-over-row',
  'seated-dumbbell-press', 'lateral-raise', 'front-raise', 'arnold-press', 'bicep-curl', 'hammer-curl',
  'overhead-tricep-extension', 'walking-lunge', 'bulgarian-split-squat', 'dumbbell-side-bend',
])
// Moves that are unrealistic to lead a beginner's session with.
const HARD_FOR_BEGINNERS = new Set(['pull-up', 'dip', 'bulgarian-split-squat', 'ab-wheel'])

const DAY_MS = 86400000

export function getPlan(profile) {
  const exp = EXPERIENCE[profile?.experience] || EXPERIENCE.beginner
  const goal = GOAL[profile?.goal] || GOAL.bulk
  const beginner = profile?.experience === 'complete_beginner' || profile?.experience === 'beginner'
  const sets = profile?.goal === 'health' ? Math.min(exp.sets, 3) : exp.sets
  const bodyScale = profile?.weight_kg ? Math.min(1.3, Math.max(0.75, profile.weight_kg / 70)) : 1
  return {
    exercises: exp.exercises,
    sets,
    repLow: goal.repLow,
    repHigh: goal.repHigh,
    weightFactor: exp.weightFactor * goal.weightFactor * bodyScale,
    bwReps: exp.bwReps,
    // Beginners progress a little sooner and in smaller steps so the target
    // never feels out of reach.
    upReps: beginner ? goal.repHigh - 1 : goal.repHigh,
    minSets: beginner ? Math.max(2, sets - 1) : sets,
    beginner,
  }
}

// Beginners shouldn't be handed unassisted pull-ups first: move those to the
// end so they only appear when the group has nothing else.
export function orderForExperience(names, plan) {
  if (!plan.beginner) return names
  const hard = names.filter(n => HARD_FOR_BEGINNERS.has(slugForExercise(n)))
  return [...names.filter(n => !hard.includes(n)), ...hard]
}

function roundWeight(w) {
  if (w <= 0) return 0
  if (w < 20) return Math.max(1, Math.round(w))
  return Math.round(w / 2.5) * 2.5
}

function increment(slug, weight, beginner = false) {
  if (DUMBBELL.has(slug)) return beginner || weight < 12 ? 1 : 2
  if (slug) return 2.5
  return weight >= 20 ? 2.5 : 1
}

function firstTime(exercise, group, plan) {
  const slug = slugForExercise(exercise)
  if (slug && BODYWEIGHT.has(slug)) {
    const reps = Math.max(3, HARD_BODYWEIGHT.has(slug) ? Math.round(plan.bwReps / 2) : plan.bwReps)
    return { weight: 0, reps, sets: plan.sets, reason: 'first' }
  }
  const base = (slug && BASE_WEIGHT[slug]) ?? GROUP_BASE_WEIGHT[group] ?? 10
  return {
    weight: roundWeight(base * plan.weightFactor),
    reps: Math.round((plan.repLow + plan.repHigh) / 2),
    sets: plan.sets,
    reason: 'first',
  }
}

// records are newest-first. The "last session" for an exercise is every row
// of it on the most recent day it was logged (a session can be split across
// rows when the weight or reps differed between sets).
function lastSession(exercise, records) {
  const rows = records.filter(r => r.exercise === exercise)
  if (!rows.length) return null
  const day = new Date(rows[0].date).toLocaleDateString()
  const sameDay = rows.filter(r => new Date(r.date).toLocaleDateString() === day)
  const best = sameDay.reduce((a, b) => (b.weight > a.weight || (b.weight === a.weight && b.reps > a.reps)) ? b : a)
  return { best, totalSets: sameDay.reduce((s, r) => s + r.sets, 0), date: new Date(rows[0].date) }
}

export function nextTarget({ exercise, group, records, plan, now = Date.now() }) {
  const last = lastSession(exercise, records)
  if (!last) return firstTime(exercise, group, plan)

  const { best, totalSets, date } = last
  const slug = slugForExercise(exercise)
  const isBodyweight = best.weight === 0
  const daysSince = (now - date.getTime()) / DAY_MS

  if (daysSince > 21) {
    const factor = daysSince > 60 ? 0.8 : 0.9
    return {
      weight: isBodyweight ? 0 : roundWeight(best.weight * factor),
      reps: Math.min(plan.repHigh, Math.max(plan.repLow, best.reps)),
      sets: plan.sets,
      reason: 'return',
    }
  }

  if (isBodyweight) {
    return { weight: 0, reps: Math.min(30, best.reps + 1), sets: plan.sets, reason: 'more' }
  }

  // Far below the rep range means the weight was too heavy: back off a step
  // rather than asking for more of the same.
  if (best.reps <= plan.repLow - 2) {
    return {
      weight: Math.max(1, roundWeight(best.weight - increment(slug, best.weight, plan.beginner))),
      reps: plan.repLow,
      sets: plan.sets,
      reason: 'lighter',
    }
  }

  if (best.reps >= plan.upReps && totalSets >= plan.minSets) {
    return { weight: roundWeight(best.weight + increment(slug, best.weight, plan.beginner)), reps: plan.repLow, sets: plan.sets, reason: 'up' }
  }
  return {
    weight: best.weight,
    reps: Math.min(plan.repHigh, best.reps + 1),
    sets: plan.sets,
    reason: 'hold',
  }
}

// Shown instead of a single number so anything inside the range reads as a
// success. Bodyweight moves have no fixed range, so use a band around the target.
export function repRange(target, plan) {
  if (target.weight === 0) return { repLow: Math.max(1, target.reps - 2), repHigh: target.reps + 2 }
  return { repLow: Math.min(plan.repLow, target.reps), repHigh: Math.max(plan.repHigh, target.reps) }
}
