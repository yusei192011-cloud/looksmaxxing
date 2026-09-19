// Exercise reference illustrations. Vector line-art adapted from the
// Everkinetic exercise pose library via the "Workout Guide" project
// (https://bryllim.github.io/workout-guide/), licensed CC BY-SA 4.0 — see
// the credit in HomePane.jsx. Files live in public/exercise-icons/, one per
// slug, 3 frames per exercise, cropped and recolored (white on the app's
// accent color; originals are white-on-transparent). Both the ja list (also shown to ko/zh users, see groups.js)
// and the en list map to the same slug.
const NAME_TO_SLUG = {
  'ベンチプレス': 'bench-press', 'Bench Press': 'bench-press',
  'ダンベルプレス': 'dumbbell-bench-press', 'Dumbbell Press': 'dumbbell-bench-press',
  '腕立て伏せ': 'push-up', 'Push-up': 'push-up',
  'インクラインベンチプレス': 'incline-bench-press', 'Incline Bench Press': 'incline-bench-press',
  'ダンベルフライ': 'dumbbell-fly', 'Dumbbell Fly': 'dumbbell-fly',
  'チェストプレス（マシン）': 'machine-chest-press', 'Chest Press (Machine)': 'machine-chest-press',
  'ディップス': 'dip', 'Dips': 'dip',

  '懸垂（チンニング）': 'pull-up', 'Pull-up': 'pull-up',
  'ラットプルダウン': 'lat-pulldown', 'Lat Pulldown': 'lat-pulldown',
  'ダンベルロウ': 'one-arm-dumbbell-row', 'Dumbbell Row': 'one-arm-dumbbell-row',
  'デッドリフト': 'deadlift', 'Deadlift': 'deadlift',
  'ベントオーバーロウ': 'dumbbell-bent-over-row', 'Bent Over Row': 'dumbbell-bent-over-row',
  'シーテッドロウ': 'seated-row', 'Seated Row': 'seated-row',

  'ショルダープレス': 'seated-dumbbell-press', 'Shoulder Press': 'seated-dumbbell-press',
  'サイドレイズ': 'lateral-raise', 'Side Raise': 'lateral-raise',
  'フロントレイズ': 'front-raise', 'Front Raise': 'front-raise',
  'オーバーヘッドプレス': 'overhead-press', 'Overhead Press': 'overhead-press',
  'フェイスプル': 'face-pull', 'Face Pull': 'face-pull',
  'アーノルドプレス': 'arnold-press', 'Arnold Press': 'arnold-press',

  'アームカール': 'bicep-curl', 'Arm Curl': 'bicep-curl',
  'ダンベルカール': 'bicep-curl', 'Dumbbell Curl': 'bicep-curl',
  'トライセップス': 'tricep-pushdown', 'Triceps': 'tricep-pushdown',
  'フレンチプレス': 'overhead-tricep-extension', 'French Press': 'overhead-tricep-extension',
  'ハンマーカール': 'hammer-curl', 'Hammer Curl': 'hammer-curl',
  'プリーチャーカール': 'preacher-curl', 'Preacher Curl': 'preacher-curl',
  'スカルクラッシャー': 'skull-crusher', 'Skull Crusher': 'skull-crusher',

  'スクワット': 'squat', 'Squat': 'squat',
  'レッグプレス': 'leg-press', 'Leg Press': 'leg-press',
  'レッグカール': 'leg-curl', 'Leg Curl': 'leg-curl',
  'レッグエクステンション': 'leg-extension', 'Leg Extension': 'leg-extension',
  'ランジ': 'walking-lunge', 'Lunge': 'walking-lunge',
  'ブルガリアンスクワット': 'bulgarian-split-squat', 'Bulgarian Split Squat': 'bulgarian-split-squat',
  'カーフレイズ': 'calf-raise', 'Calf Raise': 'calf-raise',

  'クランチ': 'crunch', 'Crunch': 'crunch',
  'プランク': 'plank', 'Plank': 'plank',
  'レッグレイズ': 'lying-leg-raise', 'Leg Raise': 'lying-leg-raise',
  '腹筋ローラー': 'ab-wheel', 'Ab Roller': 'ab-wheel',
  'サイドベンド': 'dumbbell-side-bend', 'Side Bend': 'dumbbell-side-bend',
}

export function slugForExercise(name) {
  return NAME_TO_SLUG[name] || null
}

export default function ExerciseIcon({ name, className, onClick }) {
  const slug = NAME_TO_SLUG[name]
  if (!slug) return null
  const img = <img src={`exercise-icons/${slug}-1.svg`} alt="" />
  return onClick
    ? <button type="button" className={className} onClick={onClick}>{img}</button>
    : <span className={className}>{img}</span>
}
