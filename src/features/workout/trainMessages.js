const TRAIN_MSGS = [
  '💪 ナイス！その1回が未来の自分を作る！',
  '🔥 記録しました！継続は力なり！',
  '👊 いい追い込みだ！明日も頑張ろう！',
  '⚡ 記録完了！着実に成長してるぞ！',
  '🏆 お疲れ様！今日もやりきった！',
]

export function trainMsg() {
  return TRAIN_MSGS[Math.floor(Math.random() * TRAIN_MSGS.length)]
}
