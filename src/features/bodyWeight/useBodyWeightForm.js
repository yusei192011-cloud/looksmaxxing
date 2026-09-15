import { useEffect, useRef, useState } from 'react'
import { loadTargetWeight, saveTargetWeight } from './targetWeight'

const clamp = (v) => Math.round(Math.max(20, Math.min(300, v)) * 10) / 10

// `latestRecordedWeight` seeds the body-weight field from the user's most
// recent saved record (once, on first load) instead of always starting at
// a hardcoded default — matching the original's `init()` behavior.
export function useBodyWeightForm(latestRecordedWeight) {
  const [bodyWeight, setBodyWeightState] = useState(70.0)
  const [targetWeight, setTargetWeightState] = useState(loadTargetWeight)
  const seededRef = useRef(false)

  useEffect(() => {
    if (seededRef.current || latestRecordedWeight === undefined) return
    seededRef.current = true
    setBodyWeightState(latestRecordedWeight)
  }, [latestRecordedWeight])

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
