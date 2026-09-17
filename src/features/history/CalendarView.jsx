import { useMemo, useState } from 'react'
import { useLang } from '../../i18n/LangContext'
import { toLocalDateStr } from '../../lib/formatDate'

// Read-only overview by design (no day drill-down) — the ask was "see how
// much I trained this month at a glance", not a second record browser.
const STATUS_PRIORITY = { pain: 3, sore: 2, normal: 1, good: 0 }
const WEEKDAY_KEYS = ['cal_mon', 'cal_tue', 'cal_wed', 'cal_thu', 'cal_fri', 'cal_sat', 'cal_sun']

function buildMonthCells(year, month) {
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7 // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = Array(firstWeekday).fill(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  return cells
}

export default function CalendarView({ records, checkins }) {
  const { t } = useLang()
  const [cursor, setCursor] = useState(() => {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  })

  const trainedDays = useMemo(
    () => new Set(records.map(r => toLocalDateStr(new Date(r.date)))),
    [records],
  )

  const conditionByDay = useMemo(() => {
    const map = {}
    for (const c of checkins) {
      const prev = map[c.date]
      if (!prev || STATUS_PRIORITY[c.status] > STATUS_PRIORITY[prev]) map[c.date] = c.status
    }
    return map
  }, [checkins])

  const cells = useMemo(() => buildMonthCells(cursor.year, cursor.month), [cursor])
  const monthLabel = `${cursor.year}.${String(cursor.month + 1).padStart(2, '0')}`

  const goPrev = () => setCursor(c => (c.month === 0 ? { year: c.year - 1, month: 11 } : { year: c.year, month: c.month - 1 }))
  const goNext = () => setCursor(c => (c.month === 11 ? { year: c.year + 1, month: 0 } : { year: c.year, month: c.month + 1 }))

  return (
    <div className="cal-wrap">
      <div className="cal-nav">
        <button className="cal-nav-btn" onClick={goPrev} aria-label="prev month">‹</button>
        <div className="cal-month-label">{monthLabel}</div>
        <button className="cal-nav-btn" onClick={goNext} aria-label="next month">›</button>
      </div>
      <div className="cal-grid cal-weekdays">
        {WEEKDAY_KEYS.map(k => <div className="cal-wd" key={k}>{t(k)}</div>)}
      </div>
      <div className="cal-grid">
        {cells.map((day, i) => {
          if (day === null) return <div className="cal-cell empty" key={`e${i}`} />
          const dateStr = `${cursor.year}-${String(cursor.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const trained = trainedDays.has(dateStr)
          const condition = conditionByDay[dateStr]
          return (
            <div className="cal-cell" key={dateStr}>
              <span className="cal-daynum">{day}</span>
              <span className="cal-dots">
                {trained && <span className="cal-dot cal-dot-trained" />}
                {condition && <span className={`cal-dot cal-dot-cond-${condition}`} />}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
