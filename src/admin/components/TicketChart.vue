<template>
  <div class="chart-card">
    <h3>Vé bán theo tuần</h3>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
)

const chartData = {
  labels: ['T2','T3','T4','T5','T6','T7','CN'],
  datasets: [
    {
      data: [120, 90, 150, 200, 180, 260, 230],
      backgroundColor: '#3b82f6',
      borderRadius: 6
    }
  ]
}

const chartOptions = {
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: { grid: { display: false }},
    y: { grid: { color: '#eee' }}
  }
}
</script>
