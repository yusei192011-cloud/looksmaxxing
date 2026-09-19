import { useLang } from '../../i18n/LangContext'
import { groupName } from '../workout/groups'
import { useState } from 'react'
import ExerciseIcon, { slugForExercise } from '../workout/exerciseIcons'
import ExerciseFormCard from '../workout/ExerciseFormCard'

export default function TodayWorkoutCard({ menu, onStart, onChangeMenu, onManual }) {
  const { t, lang } = useLang()
  const [formEx, setFormEx] = useState(null)
  const { targetGroup, dayLabel, exercises, restDay, adjustedForCondition } = menu

  if (restDay) {
    return (
      <div className="sec">
        <div className="home-menu-card">
          <div className="home-menu-label">{t('todays_workout')}</div>
          <div className="home-rest-msg">{t('checkin_rest_day')}</div>
        </div>
        <div className="home-sub-actions">
          <button className="btn btn-sec" onClick={onManual}>{t('manual_mode')}</button>
        </div>
      </div>
    )
  }

  return (
    <div className="sec">
      <div className="home-menu-card">
        <div className="home-menu-header">
          <div>
            <div className="home-menu-label">{t('todays_workout')}</div>
            <div className="home-menu-target">{groupName(targetGroup, lang)}</div>
          </div>
          <div className="home-day-badge">Day {dayLabel.day} / {dayLabel.of}</div>
        </div>
        {adjustedForCondition && <div className="home-condition-note">{t('checkin_adjusted_note')}</div>}
        {exercises.length > 0 && <div className="home-adapted-note">{t('menu_adapted_note')}</div>}
        <div className="home-menu-list">
          {exercises.map((ex, i) => (
            <div
              className={`home-menu-row${slugForExercise(ex.exercise) ? ' tappable' : ''}`}
              key={ex.exercise}
              onClick={slugForExercise(ex.exercise) ? () => setFormEx(ex.exercise) : undefined}
            >
              <span className="home-menu-num">{i + 1}</span>
              <ExerciseIcon name={ex.exercise} className="ex-ic" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="home-menu-ex-name">{ex.exercise}</div>
                <div className="home-menu-ex-detail">{ex.weight > 0 ? `${ex.weight}kg` : t('bodyweight_label')} × {ex.reps}{t('u_reps')} × {ex.sets}{t('u_sets')}</div>
                {ex.reason && ex.reason !== 'first' && <div className={`home-menu-reason reason-${ex.reason}`}>{t(`menu_reason_${ex.reason}`)}</div>}
              </div>
              {slugForExercise(ex.exercise) && <span className="home-menu-chev">›</span>}
            </div>
          ))}
        </div>
        <button className="btn btn-start" onClick={onStart}>{t('start_workout')}</button>
      </div>
      <ExerciseFormCard exercise={formEx} onClose={() => setFormEx(null)} />
      <div className="home-sub-actions">
        <button className="btn btn-sec" onClick={onChangeMenu}>{t('change_menu')}</button>
        <button className="btn btn-sec" onClick={onManual}>{t('manual_mode')}</button>
      </div>
    </div>
  )
}
