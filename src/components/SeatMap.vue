<template>
  <div class="seat-page">
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

    <!-- ================= MAIN ================= -->
    <div class="seat-container">
      <!-- ===== LEFT ===== -->
      <div class="seat-left">
        <div class="screen">MÀN HÌNH CHIẾU</div>

        <!-- ĐÈN CHIẾU -->
        <div class="projector-light"></div>

        <!-- SEATS -->
       <div class="seats">
  <div
    v-for="row in seatRows"
    :key="row.row"
    class="seat-row"
  >
    <div
      v-for="seat in row.seats"
      :key="seat.code"
      class="seat"
      :class="seatClass(seat)"
      @click="toggleSeat(seat)"
    >
      <img
        :src="seat.type === 'vip' ? seatVip : seatNormal"
        class="seat-svg"
        draggable="false"
      />

      <!-- 🔥 SỐ GHẾ -->
      <span class="seat-code">{{ seat.code }}</span>
      
    </div>
  </div>
</div>

         

        <!-- ===== SUMMARY BAR ===== -->
        <div class="summary-bar">
          <div class="summary-left">
            <div class="summary-item">
              <img :src="seatNormal" />
              <span>Ghế thường(70.000đ)</span>
            </div>
            <div class="summary-item">
              <img :src="seatVip" />
              <span>Ghế VIP(90.000đ)</span>
            </div>
          </div>

          <div class="summary-center">
  <div>
    {{ seatSummary.vip }} x 90.000 + {{ seatSummary.normal }} x 70.000
  </div>
  <strong>{{ totalPrice.toLocaleString() }} vnd</strong>
</div>


          <div class="summary-right">
            <div>Thời gian còn lại</div>
            <span class="countdown">{{ formattedTime }}</span>
          </div>
        </div>

        <!-- ===== LEGEND (để trống theo yêu cầu) ===== -->
        <div class="legend">
          <div></div>
          <div></div>
        </div>
      </div>

      <!-- ===== RIGHT ===== -->
      <div class="seat-right">

  <!-- POSTER -->
  <img
    v-if="movieInfo.poster"
    :src="movieInfo.poster"
    class="movie-poster"
  />

  <!-- INFO -->
  <div class="movie-info">
    <h2>{{ movieInfo.title }}</h2>
    <p>Thể Loại:&nbsp; {{ movieInfo.genre }}</p>
    <p> Thời Lượng: &nbsp; {{ movieInfo.duration }} phút</p>
    <p>Ngày Chiếu: &nbsp; {{ movieInfo.date }}</p>
    <p>Giờ Chiếu: &nbsp;{{ movieInfo.time }}</p>
  </div>

  <!-- GHẾ ĐÃ CHỌN -->
  <div class="selected-seats" v-if="selectedSeats.length">
    <h3> Ghế đã chọn</h3>

    <div class="seat-tags">
      <span
        v-for="s in selectedSeats"
        :key="s.code"
        class="seat-tag"
        :class="s.type"
      >
        {{ s.code }}
      </span>
    </div>
  </div>
<button
  type="button"
  class="btn-next"
  :disabled="!selectedSeats.length"
  @click.prevent="goCombo"
>
  TIẾP TỤC
</button>


      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from "vue"
import seatNormal from "../assets/seat-normal.svg"
import seatVip from "../assets/seat-vip.svg"
import { onMounted, onUnmounted } from "vue"
import { useRouter,useRoute } from "vue-router"

const router = useRouter()
const route = useRoute()

const movieInfo = {
  title: route.query.title ||"không rõ",
  genre: route.query.genre||"",
  duration: route.query.duration||"",
  poster: route.query.poster||"",
  date: route.query.date||"",
  time: route.query.time||""
}
const timeLeft = ref(300) // 5 phút = 300 giây
let timer = null

const formattedTime = computed(() => {
  const min = Math.floor(timeLeft.value / 60)
  const sec = timeLeft.value % 60
  return `${min}:${sec.toString().padStart(2, "0")}`
})

const seatSummary = computed(() => {
  const vip = selectedSeats.value.filter(s => s.type === "vip").length
  const normal = selectedSeats.value.filter(s => s.type === "normal").length
  return { vip, normal }
})


onMounted(() => {
  timer = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      clearInterval(timer)
      router.push("/") // quay về trang chủ
    }
  }, 1000)
})

onUnmounted(() => clearInterval(timer))


/* ================= DATA ================= */
const seatRows = ref(
  Array.from({ length: 8 }, (_, r) => ({
    row: String.fromCharCode(65 + r),
    seats: Array.from({ length: 12 }, (_, i) => ({
      code: `${String.fromCharCode(65 + r)}${i + 1}`,
      // 🔥 3 hàng đầu: thường | 5 hàng sau: VIP
      type: r < 3 ? "normal" : "vip",
      booked: false,
      selected: false
    }))
  }))
)


/* ================= LOGIC ================= */
const toggleSeat = (seat) => {
  if (seat.booked) return
  seat.selected = !seat.selected
}

const seatClass = (seat) => ({
  booked: seat.booked,
  selected: seat.selected
})

const selectedSeats = computed(() =>
  seatRows.value.flatMap(r => r.seats.filter(s => s.selected))
)

const totalPrice = computed(() =>
  selectedSeats.value.reduce(
    (sum, s) => sum + (s.type === "vip" ? 90000 : 70000),
    0
  )
)
const goCombo = () => {
  console.log("GO COMBO CLICKED") // 🔥 test click

  router.push({
    path: "/combo", // ⚠️ KHUYẾN NGHỊ dùng name
    query: {
      title: movieInfo.title,
      genre: movieInfo.genre,
      duration: movieInfo.duration,
      poster: movieInfo.poster,
      date: movieInfo.date,
      time: movieInfo.time,
      seats: selectedSeats.value.map(s => s.code).join(","),
      seatTotal: totalPrice.value
    }
  })
}


</script>



<style scoped>
/* ================= PAGE ================= */
.seat-page {
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

/* ================= LAYOUT ================= */
.seat-container {
  display: flex;
  gap: 32px;
  padding: 32px;
}

.seat-left {
 position: relative;
}

.seat-right {
  flex: 1;
  background: #fff;
  padding: 24px;
  border-radius: 14px;
}

/* ================= SCREEN ================= */
.screen {
  height: 40px;
  background: linear-gradient(to bottom, #5dade2, #aed6f1);
  border-radius: 0 0 80px 80px;
  text-align: center;
  line-height: 40px;
  margin-bottom: 28px;
  font-weight: 700;
  color: #0b3c5d;
}

/* ================= SEATS ================= */
.seats {
     position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.seat-row {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.seat {
   width: 48px;          /* 🔥 TO HƠN */
  height: 42px;
   position: relative;

}
.seat-code {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 17px;
  font-weight: 700;
  color: #0099FF;
  pointer-events: none;
  user-select: none;
}
.seat:hover {
  transform: translateY(-3px) scale(1.05);
}

.seat.vip {
  background: #b0b7c3;
}

.seat.vip .seat-code {
  color: #2c3e50;
}
.seat.selected .seat-code {
  color: #fff;
}

/* Đã đặt */
.seat.booked .seat-code {
  color: #999;
}
.seat.booked {
  background: #eee;
  cursor: not-allowed;
  opacity: .4;
}

.seat.selected {
  background: #e53935;
  color: #fff;
}

/* ================= LEGEND ================= */
.legend {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  font-size: 14px;
}

.seat.demo {
  pointer-events: none;
}

/* ================= TOTAL ================= */
.total {
  margin-top: 22px;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 600;
}

/* ================= RIGHT ================= */
.seat-right img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 14px;
}

.seat-right h3 {
  margin-bottom: 12px;
}

.btn-next {
  width: 100%;
  margin-top: 20px;
  height: 44px;
  background: #0b5ed7;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.btn-next:disabled {
  background: #ccc;
  cursor: not-allowed;
}




/* Ghế hover */
.seat:hover {
  transform: translateY(-4px) scale(1.06);
}

/* Ghế đã đặt */
.seat.booked {
  opacity: .35;
  pointer-events: none;
}

/* Ghế đang chọn */
.seat.selected {
  transform: scale(1.2);
  filter: drop-shadow(0 6px 14px rgba(229,57,53,.6));
}


.seat-svg {
  width: 100%;
  height: 100%;
  display: block;
}
.seat-right img {
  width: 100%;
  max-width: 260px;        /* 🔥 giới hạn chiều ngang */
  max-height: 360px;       /* 🔥 giới hạn chiều cao */
  object-fit: cover;
  border-radius: 10px;
  margin: 0 auto 16px;     /* canh giữa + cách dưới */
  display: block;
}
.seat-container {
  display: grid;
  grid-template-columns: 1fr 340px; /* ghế | thông tin phim */
  gap: 32px;
  align-items: flex-start;
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
}


/* Legend */
.legend {
  display: flex;
  gap: 24px;
  margin-top: 20px;
  font-size: 14px;
}

.legend-svg {
  width: 26px;
  vertical-align: middle;
  margin-right: 6px;
}
.summary-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border: 1px solid #eee;
  padding: 14px 20px;
  border-radius: 12px;
  margin-bottom: 24px;
}

.summary-left {
  display: flex;
  gap: 18px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
}

.summary-item img {
  width: 26px;
}

.summary-center {
  text-align: center;
  font-size: 15px;
}

.summary-center strong {
  color: #0b5ed7;
  font-size: 18px;
}

.summary-right {
  text-align: center;
  font-weight: 600;
}

.countdown {
  font-size: 28px;
 
}


/* ===== ĐÈN CHIẾU ===== */
.projector-light {
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  width: 520px;
  height: 420px;
   pointer-events: none;
  background: radial-gradient(
    ellipse at top,
    rgba(173,216,230,0.45),
    rgba(173,216,230,0.18),
    transparent 70%
  );
  filter: blur(8px);
  pointer-events: none;
  z-index: 1;
  animation: lightPulse 3.5s ease-in-out infinite;
}

@keyframes lightPulse {
  0% {
    opacity: 0.25;
    transform: translateX(-50%) scaleY(0.95);
  }
  50% {
    opacity: 0.6;
    transform: translateX(-50%) scaleY(1.05);
  }
  100% {
    opacity: 0.25;
    transform: translateX(-50%) scaleY(0.95);
  }
}

.movie-poster {
  width: 100%;
  max-width: 260px;
  border-radius: 12px;
  margin-bottom: 16px;
  object-fit: cover;
}

.selected-seats {
  margin-top: 20px;
}

.seat-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.seat-tag {
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  background: #eee;
}

.seat-tag.vip {
  background: #ffd54f;
  color: #000;
}

.seat-tag.normal {
  background: #e53935;
  color: #fff;
}


</style>
