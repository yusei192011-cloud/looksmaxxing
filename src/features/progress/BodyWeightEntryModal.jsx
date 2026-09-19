import BodyWeightForm from '../bodyWeight/BodyWeightForm'
import { useBodyScrollLock } from '../../lib/useBodyScrollLock'
import { useSheetSwipeClose } from '../../lib/useSheetSwipeClose'

export default function BodyWeightEntryModal({ open, onClose }) {
  useBodyScrollLock(open)
  const sheetRef = useSheetSwipeClose(open, onClose, { zone: 'top' })

  if (!open) return null

  return (
    <div className="dlg-ov open" role="dialog" aria-modal="true">
      <div className="dlg dlg-tall" ref={sheetRef}>
        <div className="dlg-sheet-hdr">
          <button className="picker-x" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <BodyWeightForm />
      </div>
    </div>
  )
}
