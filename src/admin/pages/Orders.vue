<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Orders</h2>

    <table class="w-full bg-white border">
      <tr class="bg-gray-200">
        <th class="p-2">Customer</th>
        <th class="p-2">Movie</th>
        <th class="p-2">Total</th>
        <th class="p-2">Status</th>
      </tr>

      <tr v-for="o in orders" :key="o.id">
        <td class="p-2">{{ o.customer }}</td>
        <td class="p-2">{{ o.movie }}</td>
        <td class="p-2">{{ o.total }}đ</td>
        <td class="p-2">{{ o.status }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const orders = ref([
  { id: 1, customer: 'Nguyen Van A', movie: 'Avatar', total: 150000, status: 'Paid' },
  { id: 2, customer: 'Tran Thi B', movie: 'Avengers', total: 120000, status: 'Pending' },
])
</script>
