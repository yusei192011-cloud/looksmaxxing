import { useState } from 'react'
import { useLang } from '../../i18n/LangContext'
import { useWorkoutRecords } from '../../data/useWorkoutRecords'
import { useUserProfile } from '../../data/useUserProfile'
import WorkoutForm from '../workout/WorkoutForm'
import HomeHeader from './HomeHeader'
import TodayWorkoutCard from './TodayWorkoutCard'
import AiCoachCardStub from './AiCoachCardStub'
import WeeklyProgressGrid from './WeeklyProgressGrid'
import RecoveryList from './RecoveryList'
import { useHomeMenu } from './useHomeMenu'
import { computeStreak } from './streak'
import { sessionsThisWeek, totalVolumeThisWeek } from './weeklyStats'

export default function HomePane({ onStartWorkout }) {
  const { t, lang } = useLang()
  const [view, setView] = useState('menu')
  const { data: records } = useWorkoutRecords()
  const { data: profile } = useUserProfile()
  const frequency = profile?.frequency ?? 3
  const { menu, regenerate } = useHomeMenu({ records, frequency, lang })

  if (view === 'manual') {
    return (
      <div id="pane-home" className="pane on">
        <div className="sec" style={{ paddingBottom: 0 }}>
          <button className="auth-ghost-btn" style={{ padding: '4px 0' }} onClick={() => setView('menu')}>{t('back_to_menu')}</button>
        </div>
        <WorkoutForm onStartWorkout={onStartWorkout} />
      </div>
    )
  }

  const handleStart = () => {
    if (menu.exercises.length) onStartWorkout({ queue: menu.exercises })
  }

  return (
    <div id="pane-home" className="pane on">
      <div className="sec">
        <HomeHeader nickname={profile?.nickname ?? ''} streak={computeStreak(records)} />
      </div>
      <TodayWorkoutCard
        menu={menu}
        onStart={handleStart}
        onChangeMenu={regenerate}
        onManual={() => setView('manual')}
      />
      <AiCoachCardStub />
      <WeeklyProgressGrid
        sessions={sessionsThisWeek(records)}
        frequency={frequency}
        volume={totalVolumeThisWeek(records)}
      />
      <RecoveryList records={records} />
    </div>
  )
}
