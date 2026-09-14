import { useLang } from '../../i18n/LangContext'
import { formatRelativeDate } from '../../lib/formatDate'
import BarbellIcon from '../../components/icons/BarbellIcon'
import { groupName } from '../workout/groups'

export default function RecordCard({ record, onDelete }) {
  const { t, lang } = useLang()

  if (record._type === 'weight') {
    return (
      <div className="rc" style={{ borderColor: 'rgba(var(--ac-rgb),.25)', borderLeft: '3px solid var(--ac)' }}>
        <div className="ri" style={{ background: 'rgba(var(--ac-rgb),.15)' }}>⚖️</div>
        <div className="rinfo">
          <div className="rex" style={{ color: 'var(--ac)' }}>{record.weight} kg</div>
        </div>
        <div>
          <div className="rdate">{formatRelativeDate(record.date, t)}</div>
        </div>
        <button className="rc-del" onClick={() => onDelete(record.id)} aria-label="Delete record">✕</button>
      </div>
    )
  }

  const group = record.group || 'other'
  const showGroupLabel = group !== 'other'

  return (
    <div className="rc" style={{ borderLeft: '3px solid var(--ac)' }}>
      <div className="ri"><BarbellIcon /></div>
      <div className="rinfo">
        <div className="rex">{record.exercise}</div>
        {showGroupLabel && <div style={{ fontSize: '12px', color: 'var(--t3)', marginTop: '1px' }}>{groupName(group, lang)}</div>}
        <div className="rdet">{record.weight}kg × {record.reps}reps × {record.sets}sets</div>
      </div>
      <div>
        <div className="rmt">{record.weight}kg</div>
        <div className="rdate">{formatRelativeDate(record.date, t)}</div>
      </div>
      <button className="rc-del" onClick={() => onDelete(record.id)} aria-label="Delete record">✕</button>
    </div>
  )
}
