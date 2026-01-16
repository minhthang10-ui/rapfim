<template>
  <div class="combo-page">

    <!-- ================= HEADER ================= -->
    <header class="header">
      <div class="logo">CINEMA</div>

      <nav class="nav-center">
        <router-link to="/">Trang chủ</router-link>
        <router-link to="/lich-chieu">Lịch chiếu</router-link>
        <router-link to="/">Phim</router-link>
        <router-link to="/">Ưu đãi</router-link>
      </nav>

      <div class="nav-right">
        <button class="nav-btn">Đăng nhập</button>
        <button class="nav-btn primary">Đăng ký</button>
      </div>
    </header>

    <!-- ================= COMBO ================= -->
    <div class="combo-container">

      <!-- ===== LEFT ===== -->
      <div class="combo-left">
        <div class="combo-title"> Chọn Combo</div>

        <table class="combo-table">
          <thead>
            <tr>
              <th>Combo</th>
              <th>Số lượng</th>
              <th>Giá</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="c in combos" :key="c.id">
              <td>
                <div class="combo-item">
                  <img :src="c.image" />
                  <div>
                    <div class="combo-name">{{ c.name }}</div>
                    <div class="combo-desc">{{ c.desc }}</div>
                  </div>
                </div>
              </td>

              <td>
                <div class="combo-qty">
                  <button @click="c.qty--" :disabled="c.qty === 0">-</button>
                  <span>{{ c.qty }}</span>
                  <button class="plus" @click="c.qty++">+</button>
                </div>
              </td>

              <td>{{ (c.price * c.qty).toLocaleString() }} đ</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- ===== RIGHT ===== -->
      <div class="payment-box">
        <div class="payment-movie">
          <img :src="movie.poster" />
          <h3>{{ movie.title }}</h3>
        </div>

        <div class="payment-info">
          <p> Thể loại: {{ movie.genre }}</p>
          <p> Thời lượng:{{ movie.duration }} phút</p>
          <p> Ngày Chiếu:{{ movie.date }}</p>
          <p> Giờ:{{ movie.time }}</p>
          <p> Ghế: {{ movie.seats }}</p>
        </div>

        <div class="payment-line">
          <span>Tiền ghế</span>
          <strong>{{ movie.seatTotal.toLocaleString() }} đ</strong>
        </div>

        <div class="payment-line">
          <span>Tiền combo</span>
          <strong>{{ comboTotal.toLocaleString() }} đ</strong>
        </div>

        <div class="payment-total">
          <span>Tổng cộng</span>
          <span>{{ (movie.seatTotal + comboTotal).toLocaleString() }} đ</span>
        </div>

        <div class="payment-actions">
          <button class="btn-back" @click="$router.back()">⬅ Quay lại</button>
          <button class="btn-pay"@click="goPayment">💳 Thanh toán</button>
        </div>
      </div>

    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue"
import { useRouter, useRoute } from "vue-router"

const router = useRouter()
const route = useRoute()

/* ================= MOVIE ================= */
const movie = ref({
  title: route.query.title || "",
  genre: route.query.genre || "",
  duration: route.query.duration || "",
  poster: route.query.poster || "",
  date: route.query.date || "",
  time: route.query.time || "",
  seats: route.query.seats || "",
  seatTotal: Number(route.query.seatTotal || 0)
})

/* ================= COMBOS ================= */
const combos = ref([
  {
    id: 1,
    name: "Combo Bắp Ngọt",
    desc: "1 bắp + 1 nước",
    price: 80000,
    image: new URL("../assets/489561712_1136822865151149_7785954946284724675_n.jpg", import.meta.url).href,
    qty: 0
  },
  {
    id: 2,
    name: "SNOOPY SPORT",
    desc: "01 Ly nước Snoopy Sport 2025 (không kèm nước) 01 Coca-cola 32oz 01 Bắp ngọt lớn 44oz",
    price: 249000,
    image: new URL("../assets/68ff1e054a96c_1761549829.png", import.meta.url).href,
    qty: 0
  },
  {
    id: 3,
    name: "Combo Couple",
    desc: "1 bắp lớn + 2 nước",
    price: 120000,
    image :new URL("../assets/6465deb2716d7_1684397746.png", import.meta.url).href,
    qty: 0
  }
])

/* ================= TOTAL ================= */
const comboTotal = computed(() =>
  combos.value.reduce((sum, c) => sum + c.price * c.qty, 0)
)

const grandTotal = computed(() =>
  movie.value.seatTotal + comboTotal.value
)

/* ================= PAYMENT ================= */
const goPayment = () => {
  router.push({
    path: "/payment",
    query: {
      ...route.query,
      comboTotal: comboTotal.value,
      total: grandTotal.value
    }
  })
}
</script>




<style>
/* ================= PAGE ================= */
.combo-page {
  min-height: 100vh;
  background: #f5f6f8;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI";
}

/* ================= HEADER ================= */
.header {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 32px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,.05);
}

.logo {
  font-weight: 900;
  font-size: 20px;
}

.nav-center {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 24px;
}

.nav-center a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.nav-right {
  display: flex;
  gap: 12px;
}

.nav-btn {
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
}

.nav-btn.primary {
  background: #0b5ed7;
  color: #fff;
  border: none;
}

/* ================= COMBO ================= */
.combo-container {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 32px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px;
}

.combo-left,
.payment-box {
  background: #fff;
  border-radius: 14px;
  padding: 24px;
}

.combo-title {
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 20px;
}

.combo-table {
  width: 100%;
  border-collapse: collapse;
}

.combo-table th {
  text-align: left;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #666;
}

.combo-table td {
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}

.combo-item {
  display: flex;
  gap: 14px;
  align-items: center;
}

.combo-item img {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
}

.combo-name {
  font-weight: 700;
}

.combo-desc {
  font-size: 14px;
  color: #666;
}

.combo-qty {
  display: flex;
  gap: 10px;
  align-items: center;
}

.combo-qty button {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.combo-qty .plus {
  background: #0b5ed7;
  color: #fff;
}

.payment-movie {
  text-align: center;
}

.payment-movie img {
  max-width: 220px;
  border-radius: 12px;
  margin-bottom: 10px;
}

.payment-line,
.payment-total {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
}

.payment-total {
  font-size: 18px;
  font-weight: 800;
  color: #0b5ed7;
  border-top: 1px dashed #ddd;
  padding-top: 14px;
}

.payment-actions {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-back {
  background: #eee;
  height: 42px;
  border-radius: 8px;
  border: none;
}

.btn-pay {
  background: #0b5ed7;
  color: #fff;
  height: 44px;
  border-radius: 10px;
  border: none;
  font-size: 16px;
}
</style>
