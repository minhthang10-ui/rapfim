<template>
  <div class="dashboard">

    <!-- TITLE -->
    <div class="dashboard-header">
      <h1>Tổng quan bảng điều khiển</h1>
      <p>Chào mừng trở lại! Đây là hiệu suất rạp chiếu của bạn hôm nay.</p>
    </div>

    <!-- STATS -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-top">
          <span>Tổng số phim</span>
          <span class="icon purple">🎞</span>
        </div>
        <h2>42</h2>
        <small class="green">+3 mới from last month</small>
      </div>

      <div class="stat-card">
        <div class="stat-top">
          <span>Vé bán hôm nay</span>
          <span class="icon blue">🎟</span>
        </div>
        <h2>486</h2>
        <small class="green">+12% from last month</small>
      </div>

      <div class="stat-card">
        <div class="stat-top">
          <span>Người dùng hoạt động</span>
          <span class="icon green">👥</span>
        </div>
        <h2>2,847</h2>
        <small class="green">+8% from last month</small>
      </div>

      <div class="stat-card">
        <div class="stat-top">
          <span>Doanh thu hôm nay</span>
          <span class="icon orange">$</span>
        </div>
        <h2>12.450.000đ</h2>
        <small class="green">+15% from last month</small>
      </div>
    </div>

    <!-- CHARTS -->
    <div class="chart-grid">

      <!-- LINE CHART -->
      <div class="chart-card">
        <h3>Doanh thu theo tháng</h3>
        <Line :data="lineData" :options="lineOptions" />
      </div>

      <!-- BAR CHART -->
      <div class="chart-card">
        <h3>Doanh số vé theo tuần</h3>
        <Bar :data="barData" :options="barOptions" />
      </div>

    </div>

  </div>
</template>

<script setup>
import { Line, Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
)

/* LINE CHART */
const lineData = {
  labels: ['T2','T3','T4','T5','T6','T7','CN'],
  datasets: [{
    data: [45000, 52000, 48000, 61000, 55000, 68000,71000],
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59,130,246,.15)',
    tension: 0.4,
    fill: true,
    pointRadius: 4
  }]
}

const lineOptions = {
  responsive: true,
  plugins: { legend: { display: false }},
  scales: {
    x: { grid: { display: false }},
    y: { grid: { color: '#e5e7eb' }}
  }
}

/* BAR CHART */
const barData = {
  labels: ['T2','T3','T4','T5','T6','T7','CN'],
  datasets: [{
    data: [120, 90, 140, 180, 260, 300, 240],
    backgroundColor: '#3b82f6',
    borderRadius: 6
  }]
}

const barOptions = {
  plugins: { legend: { display: false }},
  scales: {
    x: { grid: { display: false }},
    y: { grid: { color: '#e5e7eb' }}
  }
}
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
}

/* HEADER */
.dashboard-header h1 {
  font-size: 28px;
  margin-bottom: 6px;
}

.dashboard-header p {
  color: #6b7280;
  margin-bottom: 24px;
}

/* STATS */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 28px;
}

.stat-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(0,0,0,.06);
}

.stat-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #6b7280;
}

.stat-card h2 {
  font-size: 28px;
  margin: 14px 0 6px;
}

.green {
  color: #16a34a;
  font-size: 13px;
}

.icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.icon.purple { background: #ede9fe; color: #7c3aed; }
.icon.blue { background: #dbeafe; color: #2563eb; }
.icon.green { background: #dcfce7; color: #16a34a; }
.icon.orange { background: #ffedd5; color: #ea580c; }

/* CHARTS */
.chart-grid {
  display: grid;
  grid-template-columns: 2fr 1.5fr;
  gap: 20px;
}

.chart-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(0,0,0,.06);
}
</style>
