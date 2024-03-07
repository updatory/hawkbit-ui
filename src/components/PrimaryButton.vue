<template>
  <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
    <span v-if="slots.icon" class="flex-shrink-0 size-4">
      <slot name="icon"></slot>
    </span>
    {{ props.label}}
  </button>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'

const slots = useSlots()

const props = defineProps({
  label: { type: String, required: true },
})
</script>

