// Original minimal line-pictograms (not photos) so the exercise list gives a
// visual cue for the movement without depending on any external image
// asset or copying a specific app's imagery. Intentionally covers only the
// most common exercise per pattern for now — unmapped exercises render no
// icon rather than a wrong/generic one.
const ICONS = {
  bench_press: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="14" r="1.7" />
      <line x1="6.7" y1="14" x2="15" y2="14" />
      <line x1="15" y1="14" x2="18" y2="17.5" />
      <line x1="10" y1="10" x2="10" y2="14" />
      <line x1="13" y1="10" x2="13" y2="14" />
      <line x1="7.5" y1="10" x2="15.5" y2="10" />
      <circle cx="7.5" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  pushup: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="7" r="1.7" />
      <line x1="16.6" y1="8.2" x2="5" y2="17" />
      <line x1="12" y1="11.5" x2="12" y2="17" />
      <line x1="2" y1="19" x2="20" y2="19" />
    </svg>
  ),
  pullup: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="4" x2="20" y2="4" />
      <line x1="7" y1="4" x2="10.5" y2="9" />
      <line x1="17" y1="4" x2="13.5" y2="9" />
      <circle cx="12" cy="10.5" r="1.8" />
      <line x1="12" y1="12.3" x2="12" y2="16" />
      <line x1="12" y1="16" x2="9" y2="18" />
      <line x1="9" y1="18" x2="11" y2="20" />
      <line x1="12" y1="16" x2="15" y2="18" />
      <line x1="15" y1="18" x2="13" y2="20" />
    </svg>
  ),
  deadlift: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="5" r="1.6" />
      <line x1="13" y1="6.4" x2="8" y2="13" />
      <line x1="8" y1="13" x2="7" y2="19" />
      <line x1="8" y1="13" x2="11" y2="19" />
      <line x1="13" y1="6.4" x2="16" y2="14" />
      <line x1="12" y1="14" x2="19" y2="14" />
      <circle cx="12" cy="14" r="1" fill="currentColor" stroke="none" />
      <circle cx="19" cy="14" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  shoulder_press: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="1.7" />
      <line x1="12" y1="9.7" x2="12" y2="16" />
      <line x1="12" y1="16" x2="9" y2="20" />
      <line x1="12" y1="16" x2="15" y2="20" />
      <line x1="12" y1="11" x2="9" y2="8" />
      <line x1="9" y1="8" x2="9" y2="4" />
      <line x1="12" y1="11" x2="15" y2="8" />
      <line x1="15" y1="8" x2="15" y2="4" />
      <line x1="9" y1="4" x2="15" y2="4" />
    </svg>
  ),
  side_raise: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="6" r="1.7" />
      <line x1="12" y1="7.7" x2="12" y2="16" />
      <line x1="12" y1="16" x2="9" y2="20" />
      <line x1="12" y1="16" x2="15" y2="20" />
      <line x1="12" y1="10" x2="5" y2="10" />
      <line x1="12" y1="10" x2="19" y2="10" />
      <circle cx="5" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="19" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  arm_curl: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="6" r="1.7" />
      <line x1="12" y1="7.7" x2="12" y2="16" />
      <line x1="12" y1="16" x2="9" y2="20" />
      <line x1="12" y1="16" x2="15" y2="20" />
      <line x1="12" y1="10" x2="8" y2="14" />
      <line x1="12" y1="10" x2="16" y2="14" />
      <line x1="16" y1="14" x2="13" y2="9" />
      <circle cx="13" cy="9" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  triceps: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="6" r="1.7" />
      <line x1="12" y1="7.7" x2="12" y2="16" />
      <line x1="12" y1="16" x2="9" y2="20" />
      <line x1="12" y1="16" x2="15" y2="20" />
      <line x1="12" y1="10" x2="9" y2="12" />
      <line x1="12" y1="10" x2="15" y2="11" />
      <line x1="15" y1="11" x2="15" y2="16" />
    </svg>
  ),
  squat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4.5" r="1.5" />
      <line x1="8" y1="7.5" x2="16" y2="7.5" />
      <circle cx="8" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <line x1="12" y1="6" x2="12" y2="12" />
      <line x1="12" y1="12" x2="8" y2="15" />
      <line x1="8" y1="15" x2="9" y2="20" />
      <line x1="12" y1="12" x2="16" y2="15" />
      <line x1="16" y1="15" x2="15" y2="20" />
    </svg>
  ),
  leg_press: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" y1="19" x2="2" y2="10" />
      <line x1="2" y1="19" x2="12" y2="19" />
      <circle cx="3.7" cy="13" r="1.7" />
      <line x1="4.8" y1="14.4" x2="10" y2="17" />
      <line x1="10" y1="17" x2="14" y2="12" />
      <line x1="14" y1="12" x2="18" y2="12" />
      <line x1="18" y1="6" x2="18" y2="17" />
    </svg>
  ),
  crunch: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" y1="19" x2="22" y2="19" />
      <circle cx="16" cy="14.5" r="1.6" />
      <path d="M14.7 15.4 Q11 16.5 9.5 18.5" />
      <line x1="9.5" y1="18.5" x2="9.5" y2="19" />
      <line x1="9.5" y1="18.5" x2="5" y2="15" />
      <line x1="5" y1="15" x2="3" y2="19" />
    </svg>
  ),
  plank: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" y1="19" x2="22" y2="19" />
      <circle cx="19" cy="12" r="1.6" />
      <line x1="17.5" y1="13" x2="6" y2="17" />
      <line x1="9" y1="15.7" x2="9" y2="19" />
    </svg>
  ),
}

// Both the ja list (also shown to ko/zh users, see groups.js) and the en
// list map to the same icon id.
const NAME_TO_ICON = {
  'ベンチプレス': 'bench_press', 'Bench Press': 'bench_press',
  '腕立て伏せ': 'pushup', 'Push-up': 'pushup',
  '懸垂（チンニング）': 'pullup', 'Pull-up': 'pullup',
  'デッドリフト': 'deadlift', 'Deadlift': 'deadlift',
  'ショルダープレス': 'shoulder_press', 'Shoulder Press': 'shoulder_press',
  'サイドレイズ': 'side_raise', 'Side Raise': 'side_raise',
  'アームカール': 'arm_curl', 'Arm Curl': 'arm_curl',
  'トライセップス': 'triceps', 'Triceps': 'triceps',
  'スクワット': 'squat', 'Squat': 'squat',
  'レッグプレス': 'leg_press', 'Leg Press': 'leg_press',
  'クランチ': 'crunch', 'Crunch': 'crunch',
  'プランク': 'plank', 'Plank': 'plank',
}

export function hasExerciseIcon(name) {
  return !!NAME_TO_ICON[name]
}

export default function ExerciseIcon({ name, className }) {
  const id = NAME_TO_ICON[name]
  if (!id) return null
  return <span className={className}>{ICONS[id]}</span>
}
