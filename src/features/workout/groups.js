export const GROUPS = [
  { id:'chest',    name:{ ja:'胸',     en:'Chest',     ko:'가슴', zh:'胸',   es:'Pecho' } },
  { id:'back',     name:{ ja:'背中',   en:'Back',      ko:'등',   zh:'背',   es:'Espalda' } },
  { id:'shoulder', name:{ ja:'肩',     en:'Shoulders', ko:'어깨', zh:'肩',   es:'Hombros' } },
  { id:'arms',     name:{ ja:'腕',     en:'Arms',      ko:'팔',   zh:'臂',   es:'Brazos' } },
  { id:'legs',     name:{ ja:'脚',     en:'Legs',      ko:'다리', zh:'腿',   es:'Piernas' } },
  { id:'abs',      name:{ ja:'腹',     en:'Abs',       ko:'복근', zh:'腹',   es:'Abs' } },
  { id:'other',    name:{ ja:'その他', en:'Other',     ko:'기타', zh:'其他', es:'Otro' } },
]

export const GROUP_EX = {
  chest:    { ja:['ベンチプレス','ダンベルプレス','腕立て伏せ','インクラインベンチプレス','ダンベルフライ','チェストプレス（マシン）','ディップス'], en:['Bench Press','Dumbbell Press','Push-up','Incline Bench Press','Dumbbell Fly','Chest Press (Machine)','Dips'] },
  back:     { ja:['懸垂（チンニング）','ラットプルダウン','ダンベルロウ','デッドリフト','ベントオーバーロウ','シーテッドロウ'], en:['Pull-up','Lat Pulldown','Dumbbell Row','Deadlift','Bent Over Row','Seated Row'] },
  shoulder: { ja:['ショルダープレス','サイドレイズ','フロントレイズ','オーバーヘッドプレス','フェイスプル','アーノルドプレス'], en:['Shoulder Press','Side Raise','Front Raise','Overhead Press','Face Pull','Arnold Press'] },
  arms:     { ja:['アームカール','ダンベルカール','トライセップス','フレンチプレス','ハンマーカール','プリーチャーカール','スカルクラッシャー'], en:['Arm Curl','Dumbbell Curl','Triceps','French Press','Hammer Curl','Preacher Curl','Skull Crusher'] },
  legs:     { ja:['スクワット','レッグプレス','レッグカール','レッグエクステンション','ランジ','ブルガリアンスクワット','カーフレイズ'], en:['Squat','Leg Press','Leg Curl','Leg Extension','Lunge','Bulgarian Split Squat','Calf Raise'] },
  abs:      { ja:['クランチ','プランク','レッグレイズ','腹筋ローラー','サイドベンド'], en:['Crunch','Plank','Leg Raise','Ab Roller','Side Bend'] },
  other:    { ja:[], en:[] },
}

export function groupName(id, lang) {
  const g = GROUPS.find(g => g.id === id)
  return g ? (g.name[lang] || g.name.en) : id
}

// ja/ko/zh currently share the Japanese-language preset list (so ko/zh users
// see Japanese exercise names, not their own language) — a known
// inconsistency carried over verbatim from the original implementation
// rather than silently changed during this port.
export function exerciseList(group, records, lang) {
  const key = (lang === 'ja' || lang === 'ko' || lang === 'zh') ? 'ja' : 'en'
  let base
  if (group && group !== 'other') {
    base = GROUP_EX[group]?.[key] || []
  } else if (!group) {
    base = Object.values(GROUP_EX).flatMap(g => g[key] || [])
  } else {
    base = []
  }
  const past = [...new Set(
    records
      .filter(r => !group || (r.group || 'other') === group)
      .map(r => r.exercise)
  )]
  return [...new Set([...base, ...past])]
}
