import { lazy, Suspense, useState } from 'react'
import { useLang } from '../i18n/LangContext'
import LangSwitcher from '../components/LangSwitcher'
import WorkoutForm from '../features/workout/WorkoutForm'
import BodyWeightForm from '../features/bodyWeight/BodyWeightForm'
import HistoryPane from '../features/history/HistoryPane'
import StatusPane from '../features/status/StatusPane'
import RankBadge from '../features/rank/RankBadge'
import RankModal from '../features/rank/RankModal'
import { useGuidedSession } from '../features/workout/GuidedSession/useGuidedSession'
import GuidedSessionOverlay from '../features/workout/GuidedSession/GuidedSessionOverlay'
import { useOneTimeGestureSetup } from './useOneTimeGestureSetup'

// Chart.js is a large dependency only needed once the user actually opens
// the Progress tab — code-split it out of the main bundle.
const ProgressPane = lazy(() => import('../features/progress/ProgressPane'))

const TOP_TABS = ['record', 'history', 'progress', 'status']

export default function AppShell() {
  const { t } = useLang()
  const [tab, setTab] = useState('record')
  const [sub, setSub] = useState('workout')
  const [rankModalOpen, setRankModalOpen] = useState(false)
  const guidedSession = useGuidedSession()
  const sessionActive = !!guidedSession.session
  useOneTimeGestureSetup()

  return (
    <>
      <div id="flash" />
      <div id="hdr">
        <div id="hdr-title">
          <div id="wo-dot" className={sessionActive ? 'on' : ''} />
          LOOKSMAXXING
        </div>
        <RankBadge onClick={() => setRankModalOpen(true)} />
        <LangSwitcher />
      </div>

      <div id="tabs" role="tablist">
        {TOP_TABS.map(id => (
          <button
            key={id}
            id={`tb-${id}`}
            role="tab"
            aria-selected={tab === id}
            aria-controls={`pane-${id}`}
            className={`tb${tab === id ? ' on' : ''}`}
            disabled={sessionActive}
            onClick={() => setTab(id)}
          >
            {t(`tab_${id}`)}
          </button>
        ))}
      </div>

      <div id="pane-record" className={`pane${tab === 'record' ? ' on' : ''}`} role="tabpanel">
        <div className="subtabs" role="tablist">
          <button role="tab" aria-selected={sub === 'workout'} className={`stb${sub === 'workout' ? ' on' : ''}`} onClick={() => setSub('workout')}>{t('tab_record')}</button>
          <button role="tab" aria-selected={sub === 'weight'} className={`stb sl${sub === 'weight' ? ' on' : ''}`} onClick={() => setSub('weight')}>{t('tab_weight')}</button>
        </div>
        <div style={{ display: sub === 'workout' ? 'block' : 'none' }}>
          <WorkoutForm onStartWorkout={guidedSession.start} />
        </div>
        <div style={{ display: sub === 'weight' ? 'block' : 'none' }}>
          <BodyWeightForm />
        </div>
      </div>

      {tab === 'history' && <HistoryPane />}
      {tab === 'progress' && (
        <Suspense fallback={null}>
          <ProgressPane />
        </Suspense>
      )}
      {tab === 'status' && <StatusPane />}

      <GuidedSessionOverlay guidedSession={guidedSession} />
      <RankModal open={rankModalOpen} onClose={() => setRankModalOpen(false)} />
    </>
  )
}
