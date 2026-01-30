<template>
  <div class="admin-wrapper">
    <AdminSidebar />

    <div class="admin-main">
      <AdminHeader />
      <div class="admin-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import AdminSidebar from '../components/AdminSidebar.vue'
import AdminHeader from '../components/AdminHeader.vue'
</script>

<style scoped>
.admin-wrapper {
  display: flex;
  height: 100vh;
  background: #f7f8fa;
}

.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.admin-content {
  padding: 24px;
  overflow-y: auto;
}
</style>
