import { useLang } from '../../../i18n/LangContext'
import LongPressButton from '../../../components/LongPressButton'

const NCB_LARGE = { width: '48px', height: '48px', fontSize: '22px', fontWeight: '700', borderRadius: '12px' }

const clampHeight = (v) => Math.max(140, Math.min(210, Math.round(v)))
const clampWeight = (v) => Math.max(30, Math.min(150, Math.round(v * 2) / 2))

export default function HeightWeightStep({ heightCm, setHeightCm, weightKg, setWeightKg, onNext, onSkip }) {
  const { t } = useLang()
  return (
    <div className="onb-step">
      <div className="onb-icon">⚖️</div>
      <div className="onb-q">{t('heightweight_q')}</div>
      <div className="onb-desc">{t('heightweight_desc')}</div>

      <div className="sec-ttl" style={{ marginTop: '24px' }}>{t('height_label')}</div>
      <div className="wdisp">
        <LongPressButton className="ncb" style={NCB_LARGE} onPress={() => setHeightCm(h => clampHeight(h - 1))}>−</LongPressButton>
        <div className="wval">{heightCm}</div>
        <span className="wunit" style={{ marginLeft: '0' }}>cm</span>
        <LongPressButton className="ncb" style={NCB_LARGE} onPress={() => setHeightCm(h => clampHeight(h + 1))}>+</LongPressButton>
      </div>

      <div className="sec-ttl" style={{ marginTop: '16px' }}>{t('su_weight_label')}</div>
      <div className="wdisp">
        <LongPressButton className="ncb" style={NCB_LARGE} onPress={() => setWeightKg(w => clampWeight(w - 0.5))}>−</LongPressButton>
        <div className="wval">{weightKg.toFixed(1)}</div>
        <span className="wunit" style={{ marginLeft: '0' }}>kg</span>
        <LongPressButton className="ncb" style={NCB_LARGE} onPress={() => setWeightKg(w => clampWeight(w + 0.5))}>+</LongPressButton>
      </div>

      <div className="onb-actions" style={{ display: 'flex', gap: '8px' }}>
        <button className="btn btn-sec" style={{ flex: 1 }} onClick={onSkip}>{t('btn_skip')}</button>
        <button className="btn btn-start" style={{ flex: 1 }} onClick={onNext}>{t('btn_next')}</button>
      </div>
    </div>
  )
}
