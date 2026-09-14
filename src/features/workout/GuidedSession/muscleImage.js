const MUSCLE_IMGS = ['chest', 'shoulder', 'arms', 'abs', 'legs', 'back']
const TRICEPS_EX = ['トライセップス', 'フレンチプレス', 'スカルクラッシャー', 'Triceps', 'French Press', 'Skull Crusher']

export function muscleImageFor(group, exercise) {
  if (group === 'arms' && TRICEPS_EX.includes(exercise)) return 'muscle_arms2.png'
  const name = MUSCLE_IMGS.includes(group) ? group : 'body'
  return `muscle_${name}.png`
}
