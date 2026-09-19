import BodyWeightForm from '../bodyWeight/BodyWeightForm'
import { useBodyScrollLock } from '../../lib/useBodyScrollLock'

export default function BodyWeightEntryModal({ open, onClose }) {
  useBodyScrollLock(open)

  if (!open) return null

  return (
    <div className="dlg-ov open" role="dialog" aria-modal="true">
      <div className="dlg dlg-tall">
        <div className="dlg-sheet-hdr">
          <button className="picker-x" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <BodyWeightForm />
      </div>
    </div>
  )
}
