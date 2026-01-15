<template>
  <div class="app">

    <!-- ================= HEADER ================= -->
    <header class="header">
      <div class="logo">CINEMA</div>

      <nav class="nav-center">
        <router-link to="/">Trang chủ</router-link>
        <router-link to="/lich-chieu" class="active">Lịch chiếu</router-link>
        <router-link to="/">Phim</router-link>
        <router-link to="/">Ưu đãi</router-link>
      </nav>

      <div class="nav-right">
        <button class="nav-btn" @click="showLogin = true">Đăng nhập</button>
        <button class="nav-btn primary" @click="showRegister = true">Đăng ký</button>
      </div>
    </header>

    <!-- ================= CONTENT ================= -->
    <div class="schedule-page">

      <!-- DATE TABS -->
      <div class="date-tabs">
        <div
          v-for="d in dates"
          :key="d.day"
          class="date-item"
          :class="{ active: d.day === selectedDate }"
          @click="selectedDate = d.day"
        >
          <span class="day">{{ d.day }}</span>
          <span class="sub">/{{ d.month }} - {{ d.label }}</span>
        </div>
      </div>

      <div class="note">🕙 Suất chiếu muộn từ 22h00</div>

      <!-- ================= MOVIE LIST ================= -->
      <div
        class="movie-row"
        v-for="movie in movies"
        :key="movie.id"
      >
        <!-- POSTER -->
        <div class="poster" @click="openTrailer(movie.trailerId)">
          <img :src="movie.poster" />
          <span class="tag">{{ movie.tag }}</span>
        </div>

        <!-- INFO -->
       
          <div class="info">
  <h2>{{ movie.title }}</h2>

  <div class="meta">
    🎭 {{ movie.genre }} · ⏱ {{ movie.duration }} phút
  </div>

  <h4>{{ movie.format }}</h4>

 <div class="times">
  <div
    v-for="t in movie.times"
    :key="t.time"
    class="time-box"
    :class="{ late: t.late }"
    @click="goSeat(movie, t)"
  >
    <strong>{{ t.time }}</strong>
    <span>{{ t.seats }} ghế trống</span>
  </div>
</div>

</div>

        
      </div>

    </div>

    <!-- ================= TRAILER OVERLAY ================= -->
    <div
      v-if="showTrailer"
      class="trailer-overlay"
      @click.self="closeTrailer"
    >
      <div class="trailer-box">
        <button class="close-btn" @click="closeTrailer">✕</button>

        <iframe
          :src="currentTrailer"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
      </div>
    </div>

  </div>
</template>


<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router'

const router = useRouter()
const movies = ref([
  {
    id: 1,
    title: "Con Kẻ Ba Nghe",
    poster: new URL("../assets/con_ke_ba_nghe.jpg", import.meta.url).href,
    trailerId: "8QYwOWO4jCQ",
    tag: "T13",
    genre: "Tâm lý, Gia đình",
    duration:111,
    showTrailer: false,
     times: [
      { time: "6:00", seats: 140 },
      { time: "9:00", seats: 100 }
    ]
  },
  {
    id: 2,
    title: "Mai",
    poster: new URL("../assets/poster-Mai-scaled.jpg", import.meta.url).href,
    trailerId: "EX6clvId19s",
    tag: "T16",
    genre: "Tình cảm, Hài",
    duration:131,
     showTrailer: false,
      times: [
      { time: "14:00", seats: 168 },
      { time: "18:00", seats: 120 },
      { time: "22:00", seats: 80, late: true }
    ]
  },
  {
    id: 3,
    title: "THIÊN ĐƯỜNG MÁU",
    poster: new URL("../assets/Thien-duong-mau-poster.png", import.meta.url).href,
    trailerId: "46ASchtBIbE",
    tag: "T13",
    genre: "Hành Động",
    duration:113,
     showTrailer: false,
      times: [
      { time: "16:00", seats: 140 },
      { time: "20:00", seats: 100 }
    ]
  }
])
const showTrailer = ref(false)
const currentTrailer = ref("")

const openTrailer = (trailerId) => {
  currentTrailer.value = `https://www.youtube.com/embed/${trailerId}?autoplay=1`
  showTrailer.value = true
}

const closeTrailer = () => {
  showTrailer.value = false
  currentTrailer.value = ""
}

//de bt dat fim gi


/* HEADER STATE */
const isDark = ref(false);
const showLogin = ref(false);
const showRegister = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
};

/* LỊCH CHIẾU */
const selectedDate = ref(14);

const dates = ref([
  { day: 14, month: "01", label: "T4" },
  { day: 15, month: "01", label: "T5" },
  { day: 16, month: "01", label: "T6" },
  { day: 17, month: "01", label: "T7" },
  { day: 18, month: "01", label: "CN" },
]);

const times = ref([
  { time: "14:00", seats: 168 },
  { time: "16:00", seats: 167 },
  { time: "18:00", seats: 168 },
  { time: "20:00", seats: 109 },
  { time: "21:00", seats: 111 },
  { time: "22:00", seats: 168, late: true },
  { time: "23:00", seats: 119, late: true },
]);
const goSeat = (movie, time) => {
  router.push({
    path: "/chon-ghe",
    query: {
      movieId: movie.id,
      title: movie.title,
      genre: movie.genre,
      duration: movie.duration,
      poster: movie.poster,
      date: selectedDate.value,
      time: time.time
    }
  })
}


</script>

<style scoped>
/* ===== APP ===== */
.app {
  background: #fff;
  min-height: 100vh;
  font-family: system-ui, -apple-system, BlinkMacSystemFont;
}

/* ===== HEADER (GIỐNG INDEX) ===== */
.header {
  position: sticky;
  top: 0;
  z-index: 999;
  display: grid;
  grid-template-columns: 200px 1fr 260px;
  align-items: center;
  padding: 16px 40px;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,.05);
}

.logo {
  font-size: 22px;
  font-weight: 700;
  color:black;
}

.nav-center {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.nav-center a {
  text-decoration: none;
  font-weight: 500;
  color: #222;
}

.nav-center a.active {
  color: #6e7cff;
}

.nav-right {
  display: flex;
  justify-content: flex-end;
  gap: 14px;
}

.nav-btn {
  border: none;
  background: none;
  font-weight: 500;
  cursor: pointer;
}

.nav-btn.primary {
  padding: 6px 16px;
  border-radius: 20px;
  background: #6e7cff;
  color: white;
}

/* ===== SCHEDULE PAGE ===== */
.schedule-page {
  max-width: 1200px;
  margin: auto;
  padding: 40px 24px;
}

/* ===== DATE TABS (GIỐNG TAB PHIM) ===== */
.date-tabs {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 24px;
}

.date-item {
  cursor: pointer;
  text-align: center;
  padding: 10px 18px;
  border-radius: 18px;
  border: 1px solid #ddd;
  transition: .25s ease;
}

.date-item:hover {
  border-color: #6e7cff;
}

.date-item.active {
  background: #6e7cff;
  color: white;
  border-color: #6e7cff;
}

.date-item .day {
  font-size: 20px;
  font-weight: 600;
}

.date-item .sub {
  font-size: 12px;
  opacity: .8;
}

/* ===== NOTE ===== */
.note {
  margin: 16px 0 32px;
  text-align: center;
  color: #555;
}

/* ===== MOVIE ROW ===== */
.movie-row {
  display: flex;
  gap: 32px;
  padding: 32px 0;
  border-top: 1px solid #eee;
}

.poster {
  position: relative;
  width: 220px;
  flex-shrink: 0;
}

.poster img {
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0,0,0,.15);
}

.play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 42px;
  color: white;
  background: rgba(0,0,0,.35);
  border-radius: 16px;
}

.tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #6e7cff;
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
}

/* ===== INFO ===== */
.info h2 {
  color: #6e7cff;
  margin-bottom: 6px;
}

.meta {
  color: #666;
  margin-bottom: 12px;
}

/* ===== TIME BOX (GIỐNG BUTTON PHIM) ===== */
.times {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
}

.time-box {
  background: white;
  border: 1px solid #ddd;
  padding: 14px;
  border-radius: 14px;
  text-align: center;
  cursor: pointer;
  transition: .25s ease;
}

.time-box:hover {
  border-color: #6e7cff;
  transform: translateY(-2px);
}

.time-box strong {
  display: block;
  font-size: 16px;
  color: #333;
}

.time-box span {
  font-size: 12px;
  color: #666;
}

.time-box.late {
  background: #eef1ff;
  border-color: #6e7cff;
}
.poster {
  position: relative;
  width: 220px;
  height: 330px;
  cursor: pointer;
}

.poster img,
.poster iframe {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  object-fit: cover;
}

.poster iframe {
  background: black;
}

.poster::after {
  content: "▶";
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 42px;
  color: white;
  background: rgba(0,0,0,.35);
  border-radius: 16px;
  opacity: 0;
  transition: .25s;
  pointer-events: none;
}

.poster:hover::after {
  opacity: 1;
}
.trailer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 99999; /* 🔥 CỰC KỲ QUAN TRỌNG */
  display: flex;
  align-items: center;
  justify-content: center;
}
.trailer-box {
  width: 860px;
  max-width: 90%;
  aspect-ratio: 16 / 9;
  background: black;
  border-radius: 16px;
  position: relative;
}

.trailer-box iframe {
  width: 100%;
  height: 100%;
  border-radius: 16px;
}
.close-btn {
  position: absolute;
  top: -16px;
  right: -16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: white;
  cursor: pointer;
  font-size: 18px;
  z-index: 100000;
}

</style>
