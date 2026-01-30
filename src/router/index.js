import { createRouter, createWebHistory } from 'vue-router'

/* ================= USER ================= */
const Index = () => import('../components/index.vue')
const Schedule = () => import('../components/lichchieu.vue')
const SeatMap = () => import('../components/SeatMap.vue')
const Combo = () => import('../components/combo.vue')
const Payment = () => import('../components/Payment.vue')

/* ================= ADMIN ================= */
const AdminLayout = () => import('../admin/layout/AdminLayout.vue')

const Dashboard = () => import('../admin/pages/Dashboard.vue')
const Movies = () => import('../admin/pages/Movies.vue')
const Showtimes = () => import('../admin/pages/Showtimes.vue')
const Rooms = () => import('../admin/pages/Rooms.vue')
const Seats = () => import('../admin/pages/Seats.vue')
const Combos = () => import('../admin/pages/Combos.vue')
const Orders = () => import('../admin/pages/Orders.vue')

/* ================= ADMIN GUARD ================= */
const adminGuard = (to, from, next) => {
  const token = localStorage.getItem('admin_token')
  if (!token && to.path !== '/admin/login') {
    next('/admin/login')
  } else {
    next()
  }
}

/* ================= ROUTES ================= */
const routes = [
  // -------- USER --------
  { path: '/', component: Index },
  { path: '/lich-chieu', component: Schedule },
  { path: '/chon-ghe', component: SeatMap },
  { path: '/combo', component: Combo },
  { path: '/payment', component: Payment },



  // -------- ADMIN --------
  {
    path: '/admin',
    component: AdminLayout,
    beforeEnter: adminGuard,
    children: [
      { path: '', component: Dashboard },
      { path: 'movies', component: Movies },
      { path: 'showtimes', component: Showtimes },
      { path: 'rooms', component: Rooms },
      { path: 'seats', component: Seats },
      { path: 'combos', component: Combos },
      { path: 'orders', component: Orders },
    ],
  },

  // -------- 404 --------
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

/* ================= ROUTER ================= */
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
