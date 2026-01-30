<template>
  <header class="header">
    <h1>{{ title }}</h1>

    <div class="right">
      <span class="admin">👤 Admin</span>
      <button @click="logout">Đăng xuất</button>
    </div>
  </header>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const titleMap = {
  '/admin': 'Tổng quan bảng điều khiển',
  '/admin/movies': 'Phim',
  '/admin/orders': 'Quản lý vé',
}

const title = titleMap[route.path] || 'Admin'

const logout = () => {
  localStorage.removeItem('admin_token')
  router.push('/')
}
</script>

<style scoped>
.header {
  height: 72px;
  background: #fff;
  border-bottom: 1px solid #eee;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-size: 22px;
}

.right {
  display: flex;
  align-items: center;
  gap: 16px;
}

button {
  background: #ef4444;
  border: none;
  padding: 8px 14px;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
}
</style>
