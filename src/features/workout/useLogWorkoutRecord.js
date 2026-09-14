import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'
import { queryKeys } from '../../data/queryClient'
import { fetchWorkoutRecords } from '../../data/queries'
import { useInsertWorkoutRecord } from '../../data/useWorkoutRecords'
import { getRank } from '../rank/rankLogic'
import { useRankUp } from '../rank/RankUpContext'

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

    await insertMutation.mutateAsync(rec)

    const after = await queryClient.fetchQuery({
      queryKey: queryKeys.workoutRecords,
      queryFn: () => fetchWorkoutRecords(supabase),
    })
    const newRank = getRank(after)
    if (newRank.level > prevLevel) {
      setTimeout(() => celebrate(newRank), 500)
    }
  }

  return { logWorkout, isPending: insertMutation.isPending }
}
