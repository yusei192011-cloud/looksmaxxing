import ChoiceStep from './ChoiceStep'
import { GOAL_OPTIONS } from '../onboardingOptions'

export default function GoalStep({ goal, setGoal, onNext }) {
  return (
    <ChoiceStep
      icon="🎯"
      questionKey="goal_q"
      descKey="goal_desc"
      options={GOAL_OPTIONS}
      value={goal}
      keyPrefix="goal"
      onSelect={(v) => { setGoal(v); onNext() }}
    />
  )
}
