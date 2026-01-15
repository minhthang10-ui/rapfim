import { createRouter, createWebHistory } from 'vue-router'

import Index from '../components/index.vue'
import Schedule from '../components/lichchieu.vue'
import SeatMap from '../components/SeatMap.vue'
import Combo from'../components/combo.vue'
import Pay from'../components/Payment.vue'


const routes = [
  { path: '/', component: Index },
  { path: '/lich-chieu', component: Schedule },
  { path: '/chon-ghe', component: () => import('../components/SeatMap.vue') },
  {path:'/combo',component:() => import('../components/combo.vue')},
  {path:'/Payment',component:() => import('../components/Payment.vue')}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
