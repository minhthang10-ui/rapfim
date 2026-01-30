<template>
  <div>
    <div class="page-header">
      <h2>Phim</h2>
      <button>＋ Thêm phim</button>
    </div>

    <div class="movie-grid">
      <div class="movie-card" v-for="m in movies" :key="m.id">
        <img :src="m.poster" />
        <h3>{{ m.title }}</h3>
        <p>{{ m.genre }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const movies = [
  {
    id: 1,
    title: 'Hành trình cuối cùng',
    genre: 'Hành động',
    poster: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4'
  },
  {
    id: 2,
    title: 'Giấc mơ vũ trụ',
    genre: 'Khoa học',
    poster: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee'
  }
]
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

button {
  background: #111827;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.movie-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,.08);
}

.movie-card img {
  width: 100%;
  height: 260px;
  object-fit: cover;
}

.movie-card h3 {
  margin: 12px;
}

.movie-card p {
  margin: 0 12px 16px;
  color: #666;
}
</style>
