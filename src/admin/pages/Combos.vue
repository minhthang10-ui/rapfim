<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Combos</h2>

    <table class="w-full bg-white border">
      <tr class="bg-gray-200">
        <th class="p-2">Name</th>
        <th class="p-2">Price</th>
        <th class="p-2">Action</th>
      </tr>

      <tr v-for="c in combos" :key="c.id">
        <td class="p-2">{{ c.name }}</td>
        <td class="p-2">{{ c.price }}đ</td>
        <td class="p-2 text-red-600"
            @click="remove(c.id)">Delete</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const combos = ref([
  { id: 1, name: 'Popcorn + Coke', price: 60000 },
  { id: 2, name: 'Combo Family', price: 120000 },
])

const remove = id => {
  combos.value = combos.value.filter(c => c.id !== id)
}
</script>
