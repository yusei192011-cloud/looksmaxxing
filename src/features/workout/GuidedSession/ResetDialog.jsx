import { useLang } from '../../../i18n/LangContext'

export default function ResetDialog({ open, onSave, onDiscard, onCancel }) {
  const { t } = useLang()
  if (!open) return null

  return (
    <div className="dlg-ov open" role="dialog" aria-modal="true">
      <div className="dlg">
        <div className="dlg-ttl">{t('dlg_ttl')}</div>
        <div className="dlg-body">{t('dlg_body')}</div>
        <div className="dlg-acts">
          <button className="dbtn dbtn-save" onClick={onSave}>{t('dlg_save')}</button>
          <button className="dbtn dbtn-disc" onClick={onDiscard}>{t('dlg_disc')}</button>
          <button className="dbtn dbtn-cancel" onClick={onCancel}>{t('dlg_cancel')}</button>
        </div>
      </div>
    </div>
  )
}
