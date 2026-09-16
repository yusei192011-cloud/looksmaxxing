import { useState } from 'react'
import { useLang } from '../../i18n/LangContext'
import { useUpsertUserProfile } from '../../data/useUserProfile'
import { useInsertBodyWeightRecord } from '../../data/useBodyWeightRecords'

export const TOTAL_STEPS = 7

export function useOnboardingWizard({ onComplete }) {
  const { t } = useLang()
  const [stepIndex, setStepIndex] = useState(0)

  const [nickname, setNickname] = useState('')
  const [experience, setExperience] = useState(null)
  const [bodyType, setBodyType] = useState(null)
  const [goal, setGoal] = useState(null)
  const [frequency, setFrequency] = useState(3)
  const [heightCm, setHeightCm] = useState(170)
  const [weightKg, setWeightKg] = useState(65)

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const upsertProfile = useUpsertUserProfile()
  const insertBodyWeight = useInsertBodyWeightRecord()

  const next = () => setStepIndex(i => Math.min(i + 1, TOTAL_STEPS - 1))
  const back = () => setStepIndex(i => Math.max(i - 1, 0))
  const skip = () => next()

  const submit = async () => {
    setSubmitting(true)
    setSubmitError('')
    try {
      await upsertProfile.mutateAsync({ nickname, experience, bodyType, goal, frequency, heightCm, weightKg })
      // Decision: onboarding weight also seeds the first body_weight_records
      // row, so the Progress tab's weight chart starts consistent with it
      // rather than the two living as disconnected numbers.
      await insertBodyWeight.mutateAsync(weightKg)
      onComplete?.()
    } catch {
      setSubmitError(t('onboarding_save_error'))
    } finally {
      setSubmitting(false)
    }
  }

  return {
    stepIndex, totalSteps: TOTAL_STEPS, next, back, skip,
    nickname, setNickname,
    experience, setExperience,
    bodyType, setBodyType,
    goal, setGoal,
    frequency, setFrequency,
    heightCm, setHeightCm,
    weightKg, setWeightKg,
    submitting, submitError, submit,
  }
}
