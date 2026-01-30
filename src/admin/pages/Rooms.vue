<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Rooms</h2>

    <ul class="bg-white rounded shadow">
      <li v-for="r in rooms" :key="r.id"
        class="p-3 border-b flex justify-between">
        {{ r.name }} ({{ r.seats }} seats)
        <span class="text-red-600 cursor-pointer"
              @click="remove(r.id)">Delete</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const rooms = ref([
  { id: 1, name: 'Room 1', seats: 40 },
  { id: 2, name: 'Room 2', seats: 32 },
])

const remove = id => {
  rooms.value = rooms.value.filter(r => r.id !== id)
}
</script>
