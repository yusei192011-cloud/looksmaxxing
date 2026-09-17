import { useState } from 'react'

export const W_PRESETS = [5,10,15,20,25,30,35,40,50,60,70,80,90,100,110,120,140,160]

export function useWorkoutForm() {
  const [group, setGroup] = useState('')
  const [exercise, setExercise] = useState('')
  const [weight, setWeightState] = useState(60)
  const [reps, setReps] = useState(10)
  const [sets, setSets] = useState(3)

  const setWeight = (w) => setWeightState(Math.max(0, Math.round(w * 2) / 2))
  const adjWeight = (d) => setWeight(weight + d)
  const adjReps = (d) => setReps(r => Math.max(1, Math.min(100, r + d)))
  const adjSets = (d) => setSets(s => Math.max(1, Math.min(20, s + d)))

  return {
    group, setGroup: (g) => { setGroup(g); setExercise('') },
    exercise, setExercise,
    weight, setWeight, adjWeight,
    reps, setReps, adjReps,
    sets, setSets, adjSets,
  }
}
