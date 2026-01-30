<template>
  <div class="auth-backdrop" @click.self="$emit('close')">
    <div class="auth-box">
      <h2>Đăng nhập</h2>
      <p class="subtitle">Chào mừng bạn quay lại</p>

      <input placeholder="Email" v-model="email" />
      <input type="password" placeholder="Mật khẩu" v-model="password" />

      <button @click="login">Đăng nhập</button>

      <p class="switch" @click="$emit('close')">✕ Đóng</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 🔥 BẮT BUỘC PHẢI CÓ
const email = ref('')
const password = ref('')

const login = () => {
  // 👉 LOGIN ADMIN
  if (email.value === 'admin' && password.value === '123') {
    localStorage.setItem('admin_token', 'mock-admin-token')
    router.push('/admin')
    return
  }

  // 👉 LOGIN USER (mock)
  alert(`User đăng nhập: ${email.value}`)
}
</script>

<style scoped>
.auth-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.auth-box {
  width: 360px;
  padding: 28px;
  border-radius: 22px;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(12px);
  box-shadow: 0 20px 40px rgba(0,0,0,.2);
  text-align: center;
}

.subtitle {
  color: #777;
  font-size: 14px;
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 12px;
  border: 1px solid #ddd;
}

button {
  width: 100%;
  padding: 12px;
  border-radius: 30px;
  border: none;
  background: linear-gradient(135deg,#6e7cff,#9b5cff);
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.switch {
  margin-top: 14px;
  cursor: pointer;
  color: #6e7cff;
}
</style>
