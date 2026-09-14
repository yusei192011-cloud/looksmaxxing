import { useState } from 'react'
import { loadTargetWeight, saveTargetWeight } from './targetWeight'

const clamp = (v) => Math.round(Math.max(20, Math.min(300, v)) * 10) / 10

export function useBodyWeightForm() {
  const [bodyWeight, setBodyWeightState] = useState(70.0)
  const [targetWeight, setTargetWeightState] = useState(loadTargetWeight)

  const setBodyWeight = (v) => setBodyWeightState(clamp(v))
  const adjBodyWeight = (d) => setBodyWeight(bodyWeight + d)

  const setTargetWeight = (v) => {
    const clamped = clamp(v)
    setTargetWeightState(clamped)
    saveTargetWeight(clamped)
  }
  const adjTargetWeight = (d) => setTargetWeight(targetWeight + d)

  return { bodyWeight, setBodyWeight, adjBodyWeight, targetWeight, setTargetWeight, adjTargetWeight }
}
