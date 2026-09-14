export const RANK_IMGS = ['', 'rank1_bronze.png', 'rank2_silver.png', 'rank3_gold.png', 'rank4_platinum.png', 'rank5_master.png']

// Single source of truth for the rank thresholds — the pre-rewrite code
// defined this table three times (RANK_DEFS, the if-chain in getRank(),
// and RANK_FROM) and could drift out of sync between them.
export const RANK_DEFS = [
  { level:1, name:'LR1', nameEn:'LR1', color:'#cd7f32', req:'1〜7日',   reqEn:'1-7 days' },
  { level:2, name:'LR2', nameEn:'LR2', color:'#c0c0c0', req:'8〜30日',  reqEn:'8-30 days' },
  { level:3, name:'LR3', nameEn:'LR3', color:'#ffd700', req:'31〜90日', reqEn:'31-90 days' },
  { level:4, name:'LR4', nameEn:'LR4', color:'#00e5ff', req:'91〜180日', reqEn:'91-180 days' },
  { level:5, name:'LR5', nameEn:'LR5', color:'#b44aff', req:'181日〜',  reqEn:'181+ days' },
]

export const RANK_FROM = [0, 1, 8, 31, 91, 181]

const NO_RANK = { level:0, name:'なし', nameEn:'NONE', color:'#767676', days:0, next:1 }

// Counts distinct calendar days that have at least one workout record.
export function getRank(records) {
  const uniqueDays = new Set(records.map(r => new Date(r.date).toLocaleDateString())).size

  for (let i = RANK_DEFS.length - 1; i >= 0; i--) {
    const def = RANK_DEFS[i]
    if (uniqueDays >= RANK_FROM[def.level]) {
      const next = RANK_FROM[def.level + 1] ?? null
      return { ...def, days: uniqueDays, next }
    }
  }
  return { ...NO_RANK, days: uniqueDays }
}
