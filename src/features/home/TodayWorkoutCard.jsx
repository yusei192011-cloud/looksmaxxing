import { useLang } from '../../i18n/LangContext'
import { groupName } from '../workout/groups'

export default function TodayWorkoutCard({ menu, onStart, onChangeMenu, onManual }) {
  const { t, lang } = useLang()
  const { targetGroup, dayLabel, exercises } = menu

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
        <div className="home-menu-list">
          {exercises.map((ex, i) => (
            <div className="home-menu-row" key={ex.exercise}>
              <span className="home-menu-num">{i + 1}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="home-menu-ex-name">{ex.exercise}</div>
                <div className="home-menu-ex-detail">{ex.weight}kg × {ex.reps}{t('u_reps')} × {ex.sets}{t('u_sets')}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-start" onClick={onStart}>{t('start_workout')}</button>
      </div>
      <div className="home-sub-actions">
        <button className="btn btn-sec" onClick={onChangeMenu}>{t('change_menu')}</button>
        <button className="btn btn-sec" onClick={onManual}>{t('manual_mode')}</button>
      </div>
    </div>
  )
}
