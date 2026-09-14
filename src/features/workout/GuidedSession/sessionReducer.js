// Mirrors the original global `WS` object as a reducer: phase machine
// 'active' -> 'rest' -> 'wait' -> 'complete', plus curSet/completedSets.
// `state` is null whenever no guided session is running.
export function sessionReducer(state, action) {
  switch (action.type) {
    case 'START':
      return {
        ...action.payload, // exercise, weight, reps, sets, restSecs, group
        curSet: 1,
        phase: 'active',
        completedSets: [],
        paused: false,
      }

    case 'DONE_ACTIVE': {
      if (!state || state.phase !== 'active') return state
      const completedSets = [...state.completedSets, { set: state.curSet, weight: state.weight, reps: state.reps }]
      const isLastSet = state.curSet >= state.sets
      return { ...state, completedSets, phase: isLastSet ? 'complete' : 'rest' }
    }

    case 'REST_DONE':
      if (!state || state.phase !== 'rest') return state
      return { ...state, phase: 'wait' }

    case 'NEXT':
      if (!state || state.phase !== 'wait') return state
      return { ...state, curSet: state.curSet + 1, phase: 'active', paused: false }

    case 'TOGGLE_PAUSE':
      if (!state || state.phase !== 'rest') return state
      return { ...state, paused: !state.paused }

    case 'RESET':
      return null

    default:
      return state
  }
}
