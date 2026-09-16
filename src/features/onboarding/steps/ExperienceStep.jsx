import ChoiceStep from './ChoiceStep'
import { EXPERIENCE_OPTIONS } from '../onboardingOptions'

export default function ExperienceStep({ experience, setExperience, onNext }) {
  return (
    <ChoiceStep
      icon="🏋️"
      questionKey="experience_q"
      descKey="experience_desc"
      options={EXPERIENCE_OPTIONS}
      value={experience}
      keyPrefix="exp"
      onSelect={(v) => { setExperience(v); onNext() }}
    />
  )
}
