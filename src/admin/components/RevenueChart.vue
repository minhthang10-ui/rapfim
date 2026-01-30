<template>
  <div class="chart-card">
    <h3>Doanh thu theo tháng</h3>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)

const chartData = {
  labels: ['T1','T2','T3','T4','T5','T6','T7'],
  datasets: [
    {
      label: 'Doanh thu (triệu)',
      data: [120, 190, 300, 250, 220, 310, 400],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99,102,241,0.15)',
      tension: 0.4,
      fill: true,
      pointRadius: 5
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false }
  },
  scales: {
    y: {
      grid: { color: '#eee' }
    },
    x: {
      grid: { display: false }
    }
  }
}
</script>

<style scoped>
.chart-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(0,0,0,.06);
}
</style>
