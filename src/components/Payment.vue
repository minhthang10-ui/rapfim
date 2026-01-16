<template>
  <div class="payment-page">
    <h2> Thanh toán</h2>

    <div class="amount">
      Tổng tiền cần thanh toán:
      <strong>{{ total.toLocaleString() }} đ</strong>
    </div>
<div class="payment-timer">
   Giữ vé: <strong>{{ formattedTime }}</strong>
</div>

    <!-- QR -->
    <div class="qr-box">
      <img :src="qrUrl" />
      <p>Quét mã bằng Momo / Banking</p>
    </div>

    <button class="btn-back" @click="$router.back()">⬅ Quay lại</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import QRCode from "qrcode"

const route = useRoute()
const router = useRouter()

/* ===== TỔNG TIỀN ===== */
const total = Number(route.query.total || 0)
const qrUrl = ref("")

/* ================= VIETQR ================= */
const bankId = "TCB"                 // Techcombank
const accountNo = "2912062007"        // STK nhận tiền
const accountName = "TỐNG MINH THẮNG"
const desc = "Thanh toan ve xem phim"

/* ===== COUNTDOWN GIỮ VÉ ===== */
const timeLeft = ref(300) // 5 phút
let timer = null

const formattedTime = computed(() => {
  const min = Math.floor(timeLeft.value / 60)
  const sec = timeLeft.value % 60
  return `${min}:${sec.toString().padStart(2, "0")}`
})

onMounted(async () => {
  /* ===== TẠO QR ===== */
  const vietQR = `https://img.vietqr.io/image/${bankId}-${accountNo}-compact2.png?amount=${total}&addInfo=${encodeURIComponent(desc)}&accountName=${encodeURIComponent(accountName)}`
  qrUrl.value = vietQR

  /* ===== ĐẾM NGƯỢC ===== */
  timer = setInterval(() => {
    timeLeft.value--

    if (timeLeft.value <= 0) {
      clearInterval(timer)
      alert("⛔ Hết thời gian giữ vé, vui lòng đặt lại!")
      router.push("/") // quay về trang chủ
    }
  }, 1000)
})

onUnmounted(() => clearInterval(timer))
</script>


<style>
.payment-page {
  min-height: 100vh;
  background: #f5f6f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
}

.amount {
  font-size: 18px;
  margin-bottom: 20px;
}

.qr-box {
  background: #fff;
  padding: 20px;
  border-radius: 14px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0,0,0,.08);
}

.qr-box img {
  width: 260px;
}

.btn-back {
  margin-top: 20px;
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  background: #eee;
}
</style>
