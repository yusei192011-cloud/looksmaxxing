import { useMemo, useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { useLang } from '../../i18n/LangContext'
import { useWorkoutRecords } from '../../data/useWorkoutRecords'
import { GROUPS, groupName } from '../workout/groups'
import { barChartOptions, barDataset, formatChartDate, lineChartOptions, lineDataset } from './chartConfig'

export default function WorkoutProgressChart() {
  const { t, lang } = useLang()
  const { data: records } = useWorkoutRecords()
  const [metric, setMetric] = useState('weight')
  const [exercise, setExercise] = useState('')

  const exerciseOptions = useMemo(() => {
    const byGroup = {}
    GROUPS.forEach(g => { byGroup[g.id] = new Set() })
    records.forEach(r => {
      const g = r.group || 'other'
      if (byGroup[g]) byGroup[g].add(r.exercise)
    })
    return GROUPS.map(g => ({ group: g, exercises: [...byGroup[g.id]] })).filter(g => g.exercises.length > 0)
  }, [records])

  const isGroupMetric = metric === 'group'

  let chartBody = null
  if (isGroupMetric) {
    const volumes = {}
    GROUPS.forEach(g => { volumes[g.id] = 0 })
    records.forEach(r => {
      const g = r.group || 'other'
      volumes[g] = (volumes[g] || 0) + (r.volume ?? r.weight * r.reps * r.sets)
    })
    const data = { labels: GROUPS.map(g => groupName(g.id, lang)), datasets: [barDataset(GROUPS.map(g => volumes[g.id]))] }
    chartBody = (
      <>
        <div className="chart-yl">Volume (kg·reps)</div>
        <div className="chart-wrap"><Bar data={data} options={barChartOptions} /></div>
      </>
    )
  } else if (exercise) {
    const filtered = records
      .filter(r => r.exercise === exercise)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
    const labels = filtered.map(r => formatChartDate(r.date))
    let values, yLabel
    if (metric === 'weight') { values = filtered.map(r => r.weight); yLabel = 'kg' }
    else if (metric === 'volume') { values = filtered.map(r => r.volume ?? r.weight * r.reps * r.sets); yLabel = 'kg·reps' }
    else { values = filtered.map(r => r.est1rm ?? Math.round(r.weight * (1 + r.reps / 30))); yLabel = 'kg (est.1RM)' }
    chartBody = (
      <>
        <div className="chart-yl">{yLabel}</div>
        <div className="chart-wrap"><Line data={{ labels, datasets: [lineDataset(values)] }} options={lineChartOptions} /></div>
      </>
    )
  }

  return (
    <>
      <div className="sec">
        {!isGroupMetric && (
          <select className="fsel" value={exercise} onChange={(e) => setExercise(e.target.value)}>
            <option value="">{t('sel_ex')}</option>
            {exerciseOptions.map(({ group, exercises }) => (
              <optgroup key={group.id} label={groupName(group.id, lang)}>
                {exercises.map(ex => <option key={ex} value={ex}>{ex}</option>)}
              </optgroup>
            ))}
          </select>
        )}
        <div className="mbtns">
          <button className={`mb${metric === 'weight' ? ' on' : ''}`} onClick={() => setMetric('weight')}>{t('m_weight')}</button>
          <button className={`mb${metric === 'volume' ? ' on' : ''}`} onClick={() => setMetric('volume')}>{t('m_volume')}</button>
          <button className={`mb${metric === '1rm' ? ' on' : ''}`} onClick={() => setMetric('1rm')}>1RM</button>
          <button className={`mb${metric === 'group' ? ' on' : ''}`} onClick={() => setMetric('group')}>{t('m_group')}</button>
        </div>
      </div>
      <div className="sec" style={{ borderBottom: 'none' }}>
        {chartBody}
      </div>
    </>
  )
}
