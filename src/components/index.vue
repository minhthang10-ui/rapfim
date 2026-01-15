<template>
  <div class="app">

    <!-- HEADER -->
    <header class="header">
      <div class="logo">CINEMA</div>

      <nav class="nav-center">
        <router-link to="/">Trang chủ</router-link>
        <router-link to="/lich-chieu">Lịch chiếu</router-link>
        <router-link to="/">Phim</router-link>
        <router-link to="/">Ưu đãi</router-link>
      </nav>

      <div class="nav-right">
        <button class="nav-btn" @click="openLogin">Đăng nhập</button>
        <button class="nav-btn primary" @click="openRegister">Đăng ký</button>
      </div>
    </header>

    <!-- SLIDER -->
    <section class="hero-slider">
  <div
    class="slides"
    :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
  >
    <img
      v-for="(s, i) in slides"
      :key="i"
      :src="s"
      class="slide"
    />
  </div>

  <button class="slider-btn prev" @click="prevSlide">‹</button>
  <button class="slider-btn next" @click="nextSlide">›</button>
</section>


    <!-- MOVIES -->
    <section class="section">
      <div class="tabs">
        <button :class="{active:tab==='now'}" @click="tab='now'">Đang chiếu</button>
        <button :class="{active:tab==='soon'}" @click="tab='soon'">Sắp chiếu</button>
        <button :class="{active:tab==='special'}" @click="tab='special'">Đặc biệt</button>
      </div>

      <div class="movies">
        <div class="movie" v-for="m in filteredMovies" :key="m.id">
          <img :src="m.poster" />
          <div class="overlay">
            <h4>{{ m.title }}</h4>
            <router-link to="/lich-chieu">
              <button>Xem lịch chiếu</button>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- MODAL -->
    <Teleport to="body">
      <Login
        v-if="showLogin"
        @close="closeLogin"
      />
      <Register
        v-if="showRegister"
        @close="closeRegister"
      />
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

/* ================= MODAL ================= */
const showLogin = ref(false)
const showRegister = ref(false)

const openLogin = () => {
  showRegister.value = false
  showLogin.value = true
}

const openRegister = () => {
  showLogin.value = false
  showRegister.value = true
}

const closeLogin = () => showLogin.value = false
const closeRegister = () => showRegister.value = false

watch([showLogin, showRegister], ([l, r]) => {
  document.body.classList.toggle('modal-open', l || r)
})

/* ================= SLIDER ================= */
const slides = [
  new URL('../assets/tdm.jpg', import.meta.url).href,
  new URL('../assets/mai.jpg', import.meta.url).href,
  new URL('../assets/1702wx621h-1-094011-130126-38.jpg', import.meta.url).href,
]


const currentSlide = ref(0)
let timer = null

const nextSlide = () =>
  currentSlide.value = (currentSlide.value + 1) % slides.length

const prevSlide = () =>
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length

onMounted(() => {
  timer = setInterval(nextSlide, 4000)
})

onUnmounted(() => clearInterval(timer))

/* ================= MOVIES ================= */
const tab = ref('now')

const movies = [
  { id:1, title:'Con Kể Ba Nghe', type:'now', poster:new URL('../assets/con_ke_ba_nghe.jpg',import.meta.url).href },
  { id:2, title:'Mai', type:'soon', poster:new URL('../assets/poster-Mai-scaled.jpg',import.meta.url).href },
  { id:3, title:'Thiên Đường Máu', type:'special', poster:new URL('../assets/Thien-duong-mau-poster.png',import.meta.url).href }
]

const filteredMovies = computed(() =>
  movies.filter(m => m.type === tab.value)
)
</script>

<style scoped>
/* ===== APP ===== */
.app {
  background:#fff;
  min-height:100vh;
}

/* ===== HEADER ===== */
.header{
  position:sticky;
  top:0;
  z-index:999;
  display:grid;
  grid-template-columns:200px 1fr 260px;
  align-items:center;
  padding:16px 40px;
  background:white;
  box-shadow:0 2px 10px rgba(0,0,0,.05);
}

.logo{font-weight:700;font-size:22px}

.nav-center{
  display:flex;
  justify-content:center;
  gap:30px;
}

.nav-center a{
  text-decoration:none;
  font-weight:500;
  color:#222;
}

.nav-right{
  display:flex;
  justify-content:flex-end;
  gap:14px;
}

.nav-btn{
  border:none;
  background:none;
  font-weight:500;
  cursor:pointer;
}

.nav-btn.primary{
  padding:6px 16px;
  border-radius:20px;
  background:#6e7cff;
  color:white;
}

/* ===== SLIDER ===== */
.hero-slider {
  height: 70vh;
  position: relative;
  overflow: hidden;
}
.hero-slider:hover .slide {
  transform: scale(1);
}
.hero-slider::after {
  content:'';
  position:absolute;
  inset:0;
  background:linear-gradient(
    to bottom,
    rgba(0,0,0,.15),
    rgba(0,0,0,.6)
  );
  pointer-events:none;
}


/* container trượt */
.slides {
  display: flex;
  height: 100%;
  transition: transform 1.2s cubic-bezier(0.77, 0, 0.18, 1);
  will-change: transform;
}

/* từng slide */
.slide {
  min-width: 100%;
  height: 100%;
  object-fit: cover;
   transform: scale(1.05);
  transition: transform 4s ease;
}

.slider-btn{
  position:absolute;
  top:50%;
  transform:translateY(-50%);
  background:rgba(0,0,0,.5);
  color:#fff;
  border:none;
  width:48px;
  height:48px;
  border-radius:50%;
  cursor:pointer;
}

.prev{left:30px}
.next{right:30px}

/* ===== MOVIES ===== */
.section{padding:40px}

.tabs{
  display:flex;
  justify-content:center;
  gap:16px;
  margin-bottom:30px;
}

.tabs button{
  padding:10px 22px;
  border-radius:20px;
  border:1px solid #ddd;
  background:#fff;
  cursor:pointer;
}

.tabs .active{
  background:#6e7cff;
  color:white;
}

.movies{
  display:grid;
  grid-template-columns:repeat(auto-fill,220px);
  justify-content:center;
  gap:24px;
}

.movie{
  box-shadow:0 10px 20px rgba(0,0,0,.1);
  border-radius:16px;
  overflow:hidden;
  background:#fff;
}

.movie img{
  width:100%;
  height:320px;
  object-fit:cover;
}

.overlay{
  padding:12px;
  text-align:center;
}

.overlay button{
  margin-top:8px;
  padding:6px 14px;
  border-radius:16px;
  border:none;
  background:#6e7cff;
  color:white;
  cursor:pointer;
}

/* ===== MODAL FIX ===== */
body.modal-open{
  overflow:hidden;
}
</style>
