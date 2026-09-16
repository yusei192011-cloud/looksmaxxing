import { useLang } from '../../../i18n/LangContext'

export default function NicknameStep({ nickname, setNickname, onNext }) {
  const { t } = useLang()
  const valid = nickname.trim().length > 0 && nickname.trim().length <= 20

  return (
    <div className="onb-step">
      <div className="onb-icon">👤</div>
      <div className="onb-q">{t('nickname_q')}</div>
      <div className="onb-desc">{t('nickname_desc')}</div>
      <input
        className="inp onb-nickname-inp"
        type="text"
        placeholder={t('nickname_placeholder')}
        value={nickname}
        onChange={e => setNickname(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && valid && onNext()}
        maxLength={20}
        autoFocus
      />
      <div className="onb-actions">
        <button className="btn btn-start" onClick={onNext} disabled={!valid}>{t('btn_next')}</button>
      </div>
    </div>
  )
}
