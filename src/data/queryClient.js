import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()

export const queryKeys = {
  workoutRecords: ['workoutRecords'],
  bodyWeightRecords: ['bodyWeightRecords'],
  userProfile: ['userProfile'],
  conditionCheckins: ['conditionCheckins'],
}
