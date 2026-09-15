import {
  BarElement, CategoryScale, Chart, Filler, LinearScale,
  LineElement, PointElement, Tooltip,
} from 'chart.js'

// react-chartjs-2 doesn't auto-register chart types the way the Chart.js
// UMD build (previously loaded via CDN) did — register once, here.
Chart.register(BarElement, CategoryScale, Filler, LinearScale, LineElement, PointElement, Tooltip)

const axisCommon = {
  ticks: { color: '#555', font: { size: 11 } },
  grid: { color: 'rgba(255,255,255,.04)' },
  border: { color: '#242424' },
}

export const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { x: axisCommon, y: axisCommon },
}

export const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { ...axisCommon, ticks: { ...axisCommon.ticks, font: { size: 10 } } },
    y: axisCommon,
  },
}

export function lineDataset(data) {
  return {
    data,
    borderColor: '#667eea',
    backgroundColor: 'rgba(102,126,234,.08)',
    pointBackgroundColor: '#fff',
    pointRadius: 4,
    pointHoverRadius: 6,
    borderWidth: 2,
    tension: 0.3,
    fill: true,
  }
}

export function barDataset(data) {
  return {
    data,
    backgroundColor: 'rgba(102,126,234,.15)',
    borderColor: '#667eea',
    borderWidth: 1,
    borderRadius: 4,
  }
}

export function formatChartDate(iso) {
  const d = new Date(iso)
  return `${d.getMonth() + 1}/${d.getDate()}`
}
