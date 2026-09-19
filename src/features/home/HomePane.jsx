import { useState } from 'react'
import { useLang } from '../../i18n/LangContext'
import { useWorkoutRecords } from '../../data/useWorkoutRecords'
import { useUserProfile } from '../../data/useUserProfile'
import { useConditionCheckins, useUpsertConditionCheckin } from '../../data/useConditionCheckins'
import { todayLocalDate } from '../../lib/formatDate'
import WorkoutForm from '../workout/WorkoutForm'
import HomeHeader from './HomeHeader'
import TodayWorkoutCard from './TodayWorkoutCard'
import AiCoachCardStub from './AiCoachCardStub'
import WeeklyProgressGrid from './WeeklyProgressGrid'
import RecoveryList from './RecoveryList'
import PreWorkoutCheckinModal from './PreWorkoutCheckinModal'
import { useHomeMenu } from './useHomeMenu'
import { computeStreak } from './streak'
import { sessionsThisWeek, totalVolumeThisWeek } from './weeklyStats'

export default function HomePane({ onStartWorkout }) {
  const { t, lang } = useLang()
  const [view, setView] = useState('menu')
  const [checkinOpen, setCheckinOpen] = useState(false)
  const { data: records } = useWorkoutRecords()
  const { data: profile } = useUserProfile()
  const { data: checkins } = useConditionCheckins()
  const upsertCheckin = useUpsertConditionCheckin()
  const frequency = profile?.frequency ?? 3
  const { menu, regenerate } = useHomeMenu({ records, frequency, lang, profile })
  const today = todayLocalDate()

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

  const hasCheckinToday = (group) => checkins.some(c => c.group === group && c.date === today)

  const handleStart = () => {
    if (!menu.exercises.length) return
    if (!hasCheckinToday(menu.targetGroup)) {
      setCheckinOpen(true)
      return
    }
    onStartWorkout({ queue: menu.exercises })
  }

  const handleCheckinSelect = (status) => {
    upsertCheckin.mutate({ group: menu.targetGroup, status, date: today })
    setCheckinOpen(false)
    // good/normal: proceed with today's already-generated plan immediately.
    // sore/pain: don't auto-start — the checkin invalidation regenerates the
    // menu (excluding this group) and the updated card is shown so the user
    // can see what changed before tapping start again.
    if (status === 'good' || status === 'normal') {
      onStartWorkout({ queue: menu.exercises })
    }
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
      <PreWorkoutCheckinModal
        open={checkinOpen}
        onSelect={handleCheckinSelect}
        onClose={() => setCheckinOpen(false)}
      />
      <div className="home-credit">
        <a href="https://bryllim.github.io/workout-guide/" target="_blank" rel="noopener noreferrer">{t('credit_exercise_icons')}</a>
      </div>
    </div>
  )
}
