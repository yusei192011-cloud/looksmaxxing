// Mirrors the original global `WS` object as a reducer: phase machine
// 'active' -> 'rest' -> 'wait' -> 'complete', plus curSet/completedSets,
// now extended to run through a QUEUE of exercises (the Home screen's
// multi-exercise daily menu) instead of just one.
//
// `queue` is the immutable input list; `exercise/weight/reps/sets/
// restSecs/group` mirror queue[queueIndex] so every existing consumer
// (GuidedSessionOverlay's destructuring, the single-exercise call from
// WorkoutForm's "LET'S GO") keeps working unchanged — a single-exercise
// start is just `queue.length === 1`, not a different code path.
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
        paused: false,
      }
    }

    case 'DONE_ACTIVE': {
      if (!state || state.phase !== 'active') return state
      const completedSets = [...state.completedSets, { set: state.curSet, weight: state.weight, reps: state.reps }]
      const isLastSet = state.curSet >= state.sets
      if (!isLastSet) return { ...state, completedSets, phase: 'rest' }

      const completedExercises = [...state.completedExercises, {
        exercise: state.exercise, weight: state.weight, reps: state.reps, group: state.group, completedSets,
      }]
      const isLastExercise = state.queueIndex >= state.queue.length - 1
      return { ...state, completedSets, completedExercises, phase: isLastExercise ? 'complete' : 'rest' }
    }

    case 'REST_DONE':
      if (!state || state.phase !== 'rest') return state
      return { ...state, phase: 'wait' }

    case 'NEXT': {
      if (!state || state.phase !== 'wait') return state
      const exerciseFinished = state.completedSets.length >= state.sets
      if (!exerciseFinished) {
        return { ...state, curSet: state.curSet + 1, phase: 'active', paused: false }
      }
      const queueIndex = state.queueIndex + 1
      return {
        ...state,
        queueIndex,
        ...state.queue[queueIndex],
        curSet: 1,
        completedSets: [],
        phase: 'active',
        paused: false,
      }
    }

    case 'TOGGLE_PAUSE':
      if (!state || state.phase !== 'rest') return state
      return { ...state, paused: !state.paused }

    case 'RESET':
      return null

    default:
      return state
  }
}
