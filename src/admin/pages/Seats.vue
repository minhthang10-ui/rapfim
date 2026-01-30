<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Seats</h2>

    <div class="grid grid-cols-8 gap-2">
      <div
        v-for="s in seats"
        :key="s.id"
        class="h-8 text-xs flex items-center justify-center rounded"
        :class="s.active ? 'bg-green-500 text-white' : 'bg-gray-300'"
        @click="toggle(s)"
      >
        {{ s.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const seats = ref(
  Array.from({ length: 32 }, (_, i) => ({
    id: i + 1,
    label: `A${i + 1}`,
    active: true,
  }))
)

const toggle = seat => {
  seat.active = !seat.active
}
</script>
