import {
  BarElement, CategoryScale, Chart, Filler, LinearScale,
  LineElement, PointElement, Tooltip,
} from 'chart.js'

// react-chartjs-2 doesn't auto-register chart types the way the Chart.js
// UMD build (previously loaded via CDN) did — register once, here.
Chart.register(BarElement, CategoryScale, Filler, LinearScale, LineElement, PointElement, Tooltip)

const axisCommon = {
  ticks: { color: '#8A7A68', font: { size: 11 } },
  grid: { color: 'rgba(60,40,20,.06)' },
  border: { color: '#E8D6B8' },
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
    borderColor: '#E8703D',
    backgroundColor: 'rgba(232,112,61,.1)',
    pointBackgroundColor: '#E8703D',
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
    backgroundColor: 'rgba(232,112,61,.18)',
    borderColor: '#E8703D',
    borderWidth: 1,
    borderRadius: 4,
  }
}

export function formatChartDate(iso) {
  const d = new Date(iso)
  return `${d.getMonth() + 1}/${d.getDate()}`
}
