import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'
import { queryKeys } from '../../data/queryClient'
import { fetchWorkoutRecords } from '../../data/queries'
import { useInsertWorkoutRecord } from '../../data/useWorkoutRecords'
import { getRank } from '../rank/rankLogic'
import { useRankUp } from '../rank/RankUpContext'
import { enqueue, isNetworkError } from '../../data/outbox'

// Shared by Quick Log and the guided-workout session's save step: insert a
// record, then detect whether that pushed the user into a new rank and
// trigger the celebration overlay if so — logic both entry points relied on
// independently before this port.
export function useLogWorkoutRecord() {
  const queryClient = useQueryClient()
  const insertMutation = useInsertWorkoutRecord()
  const { celebrate } = useRankUp()

  const logWorkout = async (rec) => {
    const before = queryClient.getQueryData(queryKeys.workoutRecords) || []
    const prevLevel = getRank(before).level

    try {
      await insertMutation.mutateAsync(rec)
    } catch (err) {
      if (!isNetworkError(err)) throw err
      enqueue(rec)
      const now = new Date().toISOString()
      queryClient.setQueryData(queryKeys.workoutRecords, (old = []) => [{
        id: `pending-${now}-${old.length}`, date: now, exercise: rec.exercise, weight: rec.weight, reps: rec.reps,
        sets: rec.sets, group: rec.group, volume: rec.weight * rec.reps * rec.sets,
        est1rm: Math.round(rec.weight * (1 + rec.reps / 30)),
      }, ...old])
      return { queued: true }
    }

    const after = await queryClient.fetchQuery({
      queryKey: queryKeys.workoutRecords,
      queryFn: () => fetchWorkoutRecords(supabase),
    })
    const newRank = getRank(after)
    if (newRank.level > prevLevel) {
      setTimeout(() => celebrate(newRank), 500)
    }
    return { queued: false }
  }

  return { logWorkout, isPending: insertMutation.isPending }
}
