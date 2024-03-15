<template>
  <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg text-gray-500 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
    <slot name="icon"/>
    {{ props.label }}
  </button>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
})
</script>
