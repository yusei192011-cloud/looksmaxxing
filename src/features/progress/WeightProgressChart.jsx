import { Line } from 'react-chartjs-2'
import { useLang } from '../../i18n/LangContext'
import { useBodyWeightRecords } from '../../data/useBodyWeightRecords'
import { lineChartOptions, lineDataset, formatChartDate } from './chartConfig'

export default function WeightProgressChart() {
  const { t } = useLang()
  const { data: records } = useBodyWeightRecords()

  const recent = [...records]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-30)

  if (!recent.length) {
    return (
      <div className="sec" style={{ borderBottom: 'none' }}>
        <div className="empty">
          <div className="empty-ic"><img src="muscle_body.png" alt="" style={{ width: 60, height: 60, objectFit: 'contain', opacity: 0.5 }} /></div>
          {t('empty')}
        </div>
      </div>
    )
  }

  const labels = recent.map(r => formatChartDate(r.date))
  const values = recent.map(r => r.weight)

  return (
    <div className="sec" style={{ borderBottom: 'none' }}>
      <div className="chart-yl">kg</div>
      <div className="chart-wrap"><Line data={{ labels, datasets: [lineDataset(values)] }} options={lineChartOptions} /></div>
    </div>
  )
}
