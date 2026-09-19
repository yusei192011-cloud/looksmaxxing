// Mirrors the original global `WS` object as a reducer: phase machine
// 'active' -> 'wait' -> 'complete', plus curSet/completedSets, run through
// a QUEUE of exercises (the Home screen's multi-exercise daily menu)
// instead of just one. There is no rest/countdown step — the 'wait' phase
// is a self-paced "ready for the next set" prompt the user advances
// manually (real-world feedback: a forced rest timer felt unnecessary).
//
// `queue` is the immutable input list; `exercise/weight/reps/sets/group`
// mirror queue[queueIndex] so every existing consumer (GuidedSessionOverlay's
// destructuring, the single-exercise call from WorkoutForm's "LET'S GO")
// keeps working unchanged — a single-exercise start is just
// `queue.length === 1`, not a different code path.
// `state` is null whenever no guided session is running.
export function sessionReducer(state, action) {
  switch (action.type) {
    case 'START': {
      const queue = action.payload.queue || [action.payload]
      return {
        queue,
        queueIndex: 0,
        ...queue[0],
        curSet: 1,
        phase: 'active',
        completedSets: [],
        completedExercises: [],
      }
    }

    case 'DONE_ACTIVE': {
      if (!state || state.phase !== 'active') return state
      const completedSets = [...state.completedSets, { set: state.curSet, weight: state.weight, reps: state.reps }]
      const isLastSet = state.curSet >= state.sets
      if (!isLastSet) return { ...state, completedSets, phase: 'wait' }

      const completedExercises = [...state.completedExercises, {
        exercise: state.exercise, weight: state.weight, reps: state.reps, group: state.group, completedSets,
      }]
      const isLastExercise = state.queueIndex >= state.queue.length - 1
      return { ...state, completedSets, completedExercises, phase: isLastExercise ? 'complete' : 'wait' }
    }

    case 'ADJUST': {
      if (!state || state.phase !== 'active') return state
      const { field, delta } = action
      if (field === 'weight') return { ...state, weight: Math.max(0, Math.round((state.weight + delta) * 2) / 2) }
      if (field === 'reps') return { ...state, reps: Math.min(100, Math.max(1, state.reps + delta)) }
      return state
    }

    case 'NEXT': {
      if (!state || state.phase !== 'wait') return state
      const exerciseFinished = state.completedSets.length >= state.sets
      if (!exerciseFinished) {
        return { ...state, curSet: state.curSet + 1, phase: 'active' }
      }
      const queueIndex = state.queueIndex + 1
      return {
        ...state,
        queueIndex,
        ...state.queue[queueIndex],
        curSet: 1,
        completedSets: [],
        phase: 'active',
      }
    }

    case 'RESET':
      return null

    default:
      return state
  }
}
