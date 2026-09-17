import { useMemo, useState } from 'react'
import { useLang } from '../../i18n/LangContext'
import { toLocalDateStr } from '../../lib/formatDate'

// Read-only overview by design (no day drill-down) — the ask was "see how
// much I trained this month at a glance", not a second record browser.
const STATUS_PRIORITY = { pain: 3, sore: 2, normal: 1, good: 0 }
const WEEKDAY_KEYS = ['cal_mon', 'cal_tue', 'cal_wed', 'cal_thu', 'cal_fri', 'cal_sat', 'cal_sun']
const LEGEND_STATUSES = ['good', 'normal', 'sore', 'pain']

function buildMonthCells(year, month) {
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7 // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = Array(firstWeekday).fill(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  return cells
}

function monthPrefix(year, month) {
  return `${year}-${String(month + 1).padStart(2, '0')}`
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

  const prevMonth = cursor.month === 0 ? { year: cursor.year - 1, month: 11 } : { year: cursor.year, month: cursor.month - 1 }
  const countThisMonth = useMemo(() => {
    const prefix = monthPrefix(cursor.year, cursor.month)
    return [...trainedDays].filter(d => d.startsWith(prefix)).length
  }, [trainedDays, cursor])
  const countPrevMonth = useMemo(() => {
    const prefix = monthPrefix(prevMonth.year, prevMonth.month)
    return [...trainedDays].filter(d => d.startsWith(prefix)).length
  }, [trainedDays, prevMonth.year, prevMonth.month])
  const delta = countThisMonth - countPrevMonth

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
          const condition = conditionByDay[dateStr]
          return (
            <div className="cal-cell" key={dateStr}>
              <span className="cal-daynum">{day}</span>
              <span className="cal-dots">
                {condition && <span className={`cal-dot cal-dot-cond-${condition}`} />}
              </span>
            </div>
          )
        })}
      </div>
      <div className="cal-legend">
        {LEGEND_STATUSES.map(status => (
          <span className="cal-legend-item" key={status}>
            <span className={`cal-dot cal-dot-cond-${status}`} />
            {t(`cond_${status}`)}
          </span>
        ))}
      </div>
      <div className="cal-summary">
        <div className="cal-summary-ic" />
        <div>
          <div className="cal-summary-ttl">
            {t('cal_summary_prefix')}{countThisMonth}{t('cal_summary_suffix')}
          </div>
          <div className="cal-summary-sub">
            {delta > 0 && <>{t('cal_delta_up_prefix')}{delta}{t('cal_delta_up_suffix')}</>}
            {delta === 0 && t('cal_delta_flat')}
            {delta < 0 && <>{t('cal_delta_down_prefix')}{Math.abs(delta)}{t('cal_delta_down_suffix')}</>}
          </div>
        </div>
      </div>
    </div>
  )
}
