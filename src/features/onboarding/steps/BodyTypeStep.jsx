import ChoiceStep from './ChoiceStep'
import { BODY_TYPE_OPTIONS } from '../onboardingOptions'

export default function BodyTypeStep({ bodyType, setBodyType, onNext }) {
  return (
    <ChoiceStep
      icon="🧍"
      questionKey="bodytype_q"
      descKey="bodytype_desc"
      options={BODY_TYPE_OPTIONS}
      value={bodyType}
      keyPrefix="bt"
      onSelect={(v) => { setBodyType(v); onNext() }}
    />
  )
}
