import { useLang } from '../../i18n/LangContext'
import { useOnboardingWizard } from './useOnboardingWizard'
import NicknameStep from './steps/NicknameStep'
import ExperienceStep from './steps/ExperienceStep'
import BodyTypeStep from './steps/BodyTypeStep'
import GoalStep from './steps/GoalStep'
import FrequencyStep from './steps/FrequencyStep'
import HeightWeightStep from './steps/HeightWeightStep'
import ConfirmStep from './steps/ConfirmStep'

export default function SetupWizard({ onComplete }) {
  const { t } = useLang()
  const wizard = useOnboardingWizard({ onComplete })
  const { stepIndex, totalSteps, back } = wizard

  const steps = [
    <NicknameStep key="nickname" nickname={wizard.nickname} setNickname={wizard.setNickname} onNext={wizard.next} />,
    <ExperienceStep key="experience" experience={wizard.experience} setExperience={wizard.setExperience} onNext={wizard.next} />,
    <BodyTypeStep key="bodytype" bodyType={wizard.bodyType} setBodyType={wizard.setBodyType} onNext={wizard.next} />,
    <GoalStep key="goal" goal={wizard.goal} setGoal={wizard.setGoal} onNext={wizard.next} />,
    <FrequencyStep key="frequency" frequency={wizard.frequency} setFrequency={wizard.setFrequency} onNext={wizard.next} />,
    <HeightWeightStep
      key="heightweight"
      heightCm={wizard.heightCm} setHeightCm={wizard.setHeightCm}
      weightKg={wizard.weightKg} setWeightKg={wizard.setWeightKg}
      onNext={wizard.next} onSkip={wizard.skip}
    />,
    <ConfirmStep key="confirm" wizard={wizard} />,
  ]

  return (
    <div className="onb-screen">
      <div className="onb-header">
        {stepIndex > 0 && <button className="auth-back-btn" onClick={back} aria-label="Back">←</button>}
        <div className="onb-step-label">{t('step_label')} {stepIndex + 1} / {totalSteps}</div>
        <div className="onb-progress-bar"><div className="onb-progress-fill" style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }} /></div>
      </div>
      <div className="onb-step-wrap" key={stepIndex}>
        {steps[stepIndex]}
      </div>
    </div>
  )
}
