import { useState } from 'react'
import { useLang } from '../../i18n/LangContext'
import { useDrumPicker } from '../../components/DrumPicker/DrumPickerContext'
import { useToast } from '../../components/Toast'
import LongPressButton from '../../components/LongPressButton'
import { useBodyWeightRecords, useInsertBodyWeightRecord } from '../../data/useBodyWeightRecords'
import { useBodyWeightForm } from './useBodyWeightForm'
import WeightProgress from './WeightProgress'

const NCB_LARGE = { width: '48px', height: '48px', fontSize: '22px', fontWeight: '700', borderRadius: '12px' }

function weightPickerDrums(current) {
  const ints = Array.from({ length: 281 }, (_, i) => ({ label: String(i + 20), value: i + 20 }))
  const decs = [0,1,2,3,4,5,6,7,8,9].map(v => ({ label: String(v), value: v }))
  const intPart = Math.floor(current)
  const decPart = Math.round((current - intPart) * 10)
  return [{ items: ints, current: intPart - 20 }, { items: decs, current: decPart }]
}

export default function BodyWeightForm() {
  const { t } = useLang()
  const { openPicker } = useDrumPicker()
  const { showToast } = useToast()
  const { data: records } = useBodyWeightRecords()
  const insertMutation = useInsertBodyWeightRecord()
  const form = useBodyWeightForm()
  const [savedFlash, setSavedFlash] = useState(false)

  const editBodyWeight = () => {
    openPicker({
      title: t('sec_bodyweight'), sep: '.',
      drums: weightPickerDrums(form.bodyWeight),
      onConfirm: ([iv, dv]) => form.setBodyWeight(iv + dv / 10),
    })
  }

  const editTargetWeight = () => {
    openPicker({
      title: t('sec_targetweight'), sep: '.',
      drums: weightPickerDrums(form.targetWeight),
      onConfirm: ([iv, dv]) => form.setTargetWeight(iv + dv / 10),
    })
  }

  const handleSave = async () => {
    await insertMutation.mutateAsync(form.bodyWeight)
    setSavedFlash(true)
    setTimeout(() => setSavedFlash(false), 1500)
    showToast(t('weightSaved'))
  }

  return (
    <div id="sub-weight" className="subpane on">
      <div className="sec">
        <div className="sec-ttl">{t('sec_bodyweight')}</div>
        <div className="wdisp">
          <LongPressButton className="ncb" style={NCB_LARGE} onPress={() => form.adjBodyWeight(-0.1)}>−</LongPressButton>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="wval" onClick={editBodyWeight}>{form.bodyWeight.toFixed(1)}</div>
          </div>
          <span className="wunit" style={{ marginLeft: '0' }}>kg</span>
          <LongPressButton className="ncb" style={NCB_LARGE} onPress={() => form.adjBodyWeight(0.1)}>+</LongPressButton>
        </div>
      </div>
      <div className="sec">
        <div className="sec-ttl">{t('sec_targetweight')}</div>
        <div className="wdisp">
          <LongPressButton className="ncb" style={NCB_LARGE} onPress={() => form.adjTargetWeight(-0.1)}>−</LongPressButton>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="wval" onClick={editTargetWeight}>{form.targetWeight.toFixed(1)}</div>
          </div>
          <span className="wunit" style={{ marginLeft: '0' }}>kg</span>
          <LongPressButton className="ncb" style={NCB_LARGE} onPress={() => form.adjTargetWeight(0.1)}>+</LongPressButton>
        </div>
      </div>
      <div className="sec">
        <WeightProgress bodyWeight={form.bodyWeight} targetWeight={form.targetWeight} records={records} />
      </div>
      <div className="sec" style={{ borderBottom: 'none' }}>
        <button
          className="btn btn-weight"
          onClick={handleSave}
          disabled={insertMutation.isPending}
          style={savedFlash ? { background: 'var(--green)', color: '#000' } : undefined}
        >
          {savedFlash ? t('weightSaved') : t('btn_weight_save')}
        </button>
      </div>
    </div>
  )
}
