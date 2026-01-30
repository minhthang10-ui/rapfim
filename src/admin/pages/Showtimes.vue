<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Manage Showtimes</h2>

    <table class="w-full border bg-white">
      <tr class="bg-gray-200">
        <th class="p-2">Movie</th>
        <th class="p-2">Room</th>
        <th class="p-2">Time</th>
        <th class="p-2">Action</th>
      </tr>

      <tr v-for="s in showtimes" :key="s.id">
        <td class="p-2">{{ s.movie }}</td>
        <td class="p-2">{{ s.room }}</td>
        <td class="p-2">{{ s.time }}</td>
        <td class="p-2 text-red-600 cursor-pointer"
            @click="remove(s.id)">
          Delete
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showtimes = ref([
  { id: 1, movie: 'Avatar', room: 'Room 1', time: '18:00' },
  { id: 2, movie: 'Avengers', room: 'Room 2', time: '20:30' },
])

const remove = id => {
  showtimes.value = showtimes.value.filter(s => s.id !== id)
}
</script>
