<template>
  <aside class="sidebar">
    <h2 class="logo">Quản trị rạp chiếu</h2>

    <nav>
      <RouterLink to="/admin" exact-active-class="active">
        🧩 Bảng điều khiển
      </RouterLink>
      <RouterLink to="/admin/movies">🎬 Phim</RouterLink>
      <RouterLink to="/admin/showtimes">🕒 Lịch chiếu</RouterLink>
      <RouterLink to="/admin/rooms">🏢 Phòng chiếu</RouterLink>
      <RouterLink to="/admin/seats">💺 Ghế ngồi</RouterLink>
      <RouterLink to="/admin/orders">🎟 Vé</RouterLink>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 260px;
  background: #ffffff;
  border-right: 1px solid #eee;
  padding: 24px;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 32px;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

a {
  padding: 12px 16px;
  border-radius: 10px;
  color: #333;
  text-decoration: none;
  font-weight: 500;
}

a.active {
  background: #2563eb;
  color: #fff;
}
</style>
