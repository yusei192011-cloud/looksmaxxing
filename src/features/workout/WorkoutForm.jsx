import { useMemo, useRef, useState } from 'react'
import { useLang } from '../../i18n/LangContext'
import { useDrumPicker } from '../../components/DrumPicker/DrumPickerContext'
import { useToast } from '../../components/Toast'
import LongPressButton from '../../components/LongPressButton'
import { useWorkoutRecords } from '../../data/useWorkoutRecords'
import { useLogWorkoutRecord } from './useLogWorkoutRecord'
import { GROUPS, exerciseList, groupName } from './groups'
import { useWorkoutForm, W_PRESETS } from './useWorkoutForm'
import { trainMsg } from './trainMessages'

const NCB_LARGE = { width: '48px', height: '48px', fontSize: '22px', fontWeight: '700', borderRadius: '12px' }

export default function WorkoutForm({ onStartWorkout }) {
  const { t, lang } = useLang()
  const { openPicker } = useDrumPicker()
  const { showToast } = useToast()
  const { data: records } = useWorkoutRecords()
  const { logWorkout, isPending } = useLogWorkoutRecord()
  const form = useWorkoutForm()
  const exInputRef = useRef(null)

  const [exerciseError, setExerciseError] = useState(false)
  const [presetsOpen, setPresetsOpen] = useState(false)
  const [acOpen, setAcOpen] = useState(false)
  const [savedFlash, setSavedFlash] = useState(false)
  const acBlurTimer = useRef(null)

  const acItems = useMemo(() => {
    const list = exerciseList(form.group, records, lang)
    const v = form.exercise.trim().toLowerCase()
    return v ? list.filter(p => p.toLowerCase().includes(v)) : list
  }, [form.group, form.exercise, records, lang])

  const flashExerciseError = () => {
    exInputRef.current?.focus()
    setExerciseError(true)
    setTimeout(() => setExerciseError(false), 1500)
  }

  const pickExercise = (name) => {
    form.setExercise(name)
    setAcOpen(false)
  }

  const openWeightPicker = () => {
    const items = []
    for (let v = 0; v <= 200; v += 0.5) items.push({ label: v % 1 === 0 ? String(v) : v.toFixed(1), value: v })
    const idx = Math.max(0, items.findIndex(i => i.value === form.weight))
    openPicker({ title: t('sec_weight'), drums: [{ items, current: idx, suffix: 'kg' }], onConfirm: ([v]) => form.setWeight(v) })
  }

  const openRepsOrSetsPicker = (kind) => {
    const isReps = kind === 'r'
    const max = isReps ? 100 : 20
    const cur = isReps ? form.reps : form.sets
    const items = Array.from({ length: max }, (_, i) => ({ label: String(i + 1), value: i + 1 }))
    openPicker({
      title: t(isReps ? 'lbl_reps' : 'lbl_sets'),
      drums: [{ items, current: cur - 1, suffix: t(isReps ? 'u_reps' : 'u_sets') }],
      onConfirm: ([v]) => (isReps ? form.setReps(v) : form.setSets(v)),
    })
  }

  const openRestPicker = () => {
    const left5 = Array.from({ length: 13 }, (_, i) => ({ label: String(i * 5), value: i * 5 }))
    const min1 = Array.from({ length: 10 }, (_, i) => ({ label: String(i), value: i }))
    const sec5 = [0,5,10,15,20,25,30,35,40,45,50,55].map(v => ({ label: String(v).padStart(2,'0'), value: v }))
    const roundedSec = Math.min(55, Math.round((form.restSecs % 60) / 5) * 5)
    const remainMins = Math.floor((form.restSecs - roundedSec) / 60)
    const leftMins = Math.min(60, Math.floor(remainMins / 5) * 5)
    const midMins = Math.min(9, remainMins - leftMins)
    openPicker({
      title: t('sec_rest'),
      drums: [
        { items: left5, current: leftMins / 5, label: '×5分' },
        { items: min1, current: midMins, label: '分' },
        { items: sec5, current: roundedSec / 5, label: '秒' },
      ],
      onConfirm: ([lv, mv, rv]) => form.setRestSecs(lv * 60 + mv * 60 + rv),
    })
  }

  const handleQuickLog = async () => {
    const exercise = form.exercise.trim()
    if (!exercise) { flashExerciseError(); return }
    await logWorkout({ exercise, weight: form.weight, reps: form.reps, sets: form.sets, group: form.group || 'other' })
    setSavedFlash(true)
    setTimeout(() => setSavedFlash(false), 1500)
    showToast(lang === 'ja' ? trainMsg() : '✓ Saved!')
  }

  const handleStart = () => {
    const exercise = form.exercise.trim()
    if (!exercise) { flashExerciseError(); return }
    onStartWorkout({
      exercise, weight: form.weight, reps: form.reps, sets: form.sets,
      restSecs: form.restSecs, group: form.group || 'other',
    })
  }

  return (
    <div id="sub-workout" className="subpane on">
      <div className="sec">
        <select
          id="grp-select"
          value={form.group}
          onChange={(e) => form.setGroup(e.target.value)}
          style={{ borderColor: form.group ? 'var(--ac)' : undefined }}
        >
          <option value="">{t('grp_placeholder')}</option>
          {GROUPS.map(g => <option key={g.id} value={g.id}>{groupName(g.id, lang)}</option>)}
        </select>
        <div className="sec-ttl" style={{ marginTop: '10px' }}>{t('sec_exercise')}</div>
        <div className="ac-wrap">
          <input
            ref={exInputRef}
            type="text"
            id="ex-inp"
            className="inp"
            autoComplete="off"
            style={{ paddingRight: '38px', borderColor: exerciseError ? 'var(--danger)' : undefined }}
            placeholder={t('ph_ex')}
            value={form.exercise}
            onChange={(e) => { form.setExercise(e.target.value); setAcOpen(true) }}
            onFocus={() => setAcOpen(true)}
            onBlur={() => { acBlurTimer.current = setTimeout(() => setAcOpen(false), 160) }}
          />
          {form.exercise && (
            <button
              className="ex-clear"
              style={{ display: 'block' }}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => { form.setExercise(''); exInputRef.current?.focus() }}
            >✕</button>
          )}
          {acOpen && acItems.length > 0 && (
            <div className="ac-list open">
              {acItems.map(name => (
                <div key={name} className="ac-item" onMouseDown={() => pickExercise(name)}>{name}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="sec">
        <div className="sec-ttl">{t('sec_weight')}</div>
        <div id="wbox">
          <div className="wdisp">
            <LongPressButton className="ncb" style={NCB_LARGE} onPress={() => form.adjWeight(-0.5)}>−</LongPressButton>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="wval" onClick={openWeightPicker}>{form.weight % 1 === 0 ? form.weight : form.weight.toFixed(1)}</div>
              <span className="val-hint">タップで選択</span>
            </div>
            <span className="wunit">kg</span>
            <LongPressButton className="ncb" style={NCB_LARGE} onPress={() => form.adjWeight(0.5)}>+</LongPressButton>
          </div>
          <div className="wpresets">
            <button className="wpl-toggle" onClick={() => setPresetsOpen(o => !o)}>
              <span className="wpl-toggle-lbl">{t('wpl_preset')}</span>
              <span className="wpl-cur">{(form.weight % 1 === 0 ? form.weight : form.weight.toFixed(1))}kg</span>
              <span className="wpl-arrow" style={{ transform: presetsOpen ? 'rotate(180deg)' : undefined }}>▾</span>
            </button>
            <div className="wpbtns" style={{ display: presetsOpen ? 'flex' : 'none' }}>
              {W_PRESETS.map(w => (
                <button key={w} className={`wpb${w === form.weight ? ' on' : ''}`} onClick={() => form.setWeight(w)}>{w}</button>
              ))}
            </div>
            <div className="wadj" style={{ display: presetsOpen ? 'flex' : 'none' }}>
              <LongPressButton className="ab m" onPress={() => form.adjWeight(-5)}>−5</LongPressButton>
              <LongPressButton className="ab m" onPress={() => form.adjWeight(-2.5)}>−2.5</LongPressButton>
              <LongPressButton className="ab m" onPress={() => form.adjWeight(-1)}>−1</LongPressButton>
              <LongPressButton className="ab p" onPress={() => form.adjWeight(1)}>+1</LongPressButton>
              <LongPressButton className="ab p" onPress={() => form.adjWeight(2.5)}>+2.5</LongPressButton>
              <LongPressButton className="ab p" onPress={() => form.adjWeight(5)}>+5</LongPressButton>
            </div>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="rs-row">
          <div className="nc">
            <div className="nc-l">{t('lbl_reps')}</div>
            <div className="nc-row">
              <LongPressButton className="ncb" onPress={() => form.adjReps(-1)}>−</LongPressButton>
              <div>
                <div className="ncv" onClick={() => openRepsOrSetsPicker('r')}>{form.reps}</div>
                <div className="ncu">{t('u_reps')}</div>
                <span className="val-hint">タップで選択</span>
              </div>
              <LongPressButton className="ncb" onPress={() => form.adjReps(1)}>+</LongPressButton>
            </div>
          </div>
          <div className="nc">
            <div className="nc-l">{t('lbl_sets')}</div>
            <div className="nc-row">
              <LongPressButton className="ncb" onPress={() => form.adjSets(-1)}>−</LongPressButton>
              <div>
                <div className="ncv" onClick={() => openRepsOrSetsPicker('s')}>{form.sets}</div>
                <div className="ncu">{t('u_sets')}</div>
                <span className="val-hint">タップで選択</span>
              </div>
              <LongPressButton className="ncb" onPress={() => form.adjSets(1)}>+</LongPressButton>
            </div>
          </div>
        </div>
      </div>

      <div className="sec" style={{ padding: '8px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', letterSpacing: '2px', color: 'var(--t2)', fontWeight: '600', whiteSpace: 'nowrap', flexShrink: '0' }}>{t('sec_rest')}</span>
          <div style={{ textAlign: 'right' }}>
            <div className="rest-val" onClick={openRestPicker}>{form.restLabel}</div>
            <span className="val-hint">タップで選択</span>
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: '10px', paddingBottom: '6px', borderBottom: 'none' }}>
        <button className="btn btn-start" onClick={handleStart}><span>{t('btn_start')}</span></button>
        <button className="btn btn-log" onClick={handleQuickLog} disabled={isPending} style={savedFlash ? { color: 'var(--green)' } : undefined}>
          {savedFlash ? '✓ SAVED' : t('btn_log')}
        </button>
      </div>
    </div>
  )
}
