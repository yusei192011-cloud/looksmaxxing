import { useMemo, useState } from 'react'
import { useLang } from '../../i18n/LangContext'
import { useWorkoutRecords, useDeleteWorkoutRecord } from '../../data/useWorkoutRecords'
import { useBodyWeightRecords, useDeleteBodyWeightRecord } from '../../data/useBodyWeightRecords'
import HistoryFilters from './HistoryFilters'
import RecordCard from './RecordCard'

export default function HistoryPane() {
  const { t } = useLang()
  const [histType, setHistTypeState] = useState('all')
  const [histGroup, setHistGroup] = useState('')
  const [period, setPeriod] = useState('7')

  const setHistType = (type) => { setHistTypeState(type); setHistGroup('') }

  const { data: workoutRecords } = useWorkoutRecords()
  const { data: weightRecords } = useBodyWeightRecords()
  const deleteWorkout = useDeleteWorkoutRecord()
  const deleteWeight = useDeleteBodyWeightRecord()

  const filtered = useMemo(() => {
    const wRecs = workoutRecords.map(r => ({ ...r, _type: 'workout' }))
    const bRecs = weightRecords.map(r => ({ ...r, _type: 'weight' }))
    let all
    if (histType === 'workout') all = wRecs
    else if (histType === 'weight') all = bRecs
    else all = [...wRecs, ...bRecs]
    if (histGroup && histType === 'workout') all = all.filter(r => (r.group || 'other') === histGroup)
    all.sort((a, b) => new Date(b.date) - new Date(a.date))
    const cut = period === 'all' ? null : Date.now() - Number(period) * 864e5
    return all.filter(r => !cut || new Date(r.date).getTime() >= cut)
  }, [workoutRecords, weightRecords, histType, histGroup, period])

  const handleDelete = (record) => {
    if (record._type === 'weight') deleteWeight.mutate(record.id)
    else deleteWorkout.mutate(record.id)
  }

  return (
    <div id="pane-history" className="pane on" role="tabpanel">
      <HistoryFilters
        histType={histType} setHistType={setHistType}
        histGroup={histGroup} setHistGroup={setHistGroup}
        period={period} setPeriod={setPeriod}
      />
      <div className="sec" style={{ borderBottom: 'none', paddingTop: '8px' }}>
        {filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-ic"><img src="muscle_body.png" alt="" style={{ width: 60, height: 60, objectFit: 'contain', opacity: 0.5 }} /></div>
            {t('empty')}
          </div>
        ) : (
          filtered.map(r => (
            <RecordCard key={`${r._type}-${r.id}`} record={r} onDelete={() => handleDelete(r)} />
          ))
        )}
      </div>
    </div>
  )
}
