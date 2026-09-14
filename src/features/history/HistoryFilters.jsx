import { useLang } from '../../i18n/LangContext'
import { GROUPS, groupName } from '../workout/groups'

export default function HistoryFilters({ histType, setHistType, histGroup, setHistGroup, period, setPeriod }) {
  const { t, lang } = useLang()

  return (
    <div className="sec">
      <div className="htype-row">
        <button className={`htb${histType === 'all' ? ' on' : ''}`} onClick={() => setHistType('all')}>{t('hf_all')}</button>
        <button className={`htb${histType === 'workout' ? ' on' : ''}`} onClick={() => setHistType('workout')}>{t('hf_workout')}</button>
        <button className={`htb sl${histType === 'weight' ? ' on' : ''}`} onClick={() => setHistType('weight')}>{t('hf_weight')}</button>
      </div>
      {histType === 'workout' && (
        <div style={{ marginTop: '8px' }}>
          <select id="hist-grp-select" value={histGroup} onChange={(e) => setHistGroup(e.target.value)}>
            <option value="">{t('fall_ex')}</option>
            {GROUPS.map(g => <option key={g.id} value={g.id}>{groupName(g.id, lang)}</option>)}
          </select>
        </div>
      )}
      <select className="fsel" value={period} onChange={(e) => setPeriod(e.target.value)}>
        <option value="7">{t('f7d')}</option>
        <option value="30">{t('f30d')}</option>
        <option value="90">{t('f90d')}</option>
        <option value="all">{t('fall')}</option>
      </select>
    </div>
  )
}
