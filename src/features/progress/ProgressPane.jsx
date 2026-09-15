import { useState } from 'react'
import { useLang } from '../../i18n/LangContext'
import WorkoutProgressChart from './WorkoutProgressChart'
import WeightProgressChart from './WeightProgressChart'

export default function ProgressPane() {
  const { t } = useLang()
  const [section, setSection] = useState('workout')

  return (
    <div id="pane-progress" className="pane on">
      <div className="prog-tabs" style={{ margin: '12px 16px 0' }}>
        <button className={`ptb${section === 'workout' ? ' on' : ''}`} onClick={() => setSection('workout')}>{t('hf_workout')}</button>
        <button className={`ptb sl${section === 'weight' ? ' on' : ''}`} onClick={() => setSection('weight')}>{t('hf_weight')}</button>
      </div>
      {section === 'workout' ? <WorkoutProgressChart /> : <WeightProgressChart />}
    </div>
  )
}
