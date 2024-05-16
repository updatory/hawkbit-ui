<template>
  <td
    :class="{ 'pe-10': props.last, 'text-gray-800': highlight }"
    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200"
  >
    <slot></slot>
  </td>
</template>
<script setup lang="ts">
// 'text-gray-800': index === 0
const props = defineProps({
  last: { type: Boolean, required: false, default: false },
  highlight: { type: Boolean, required: false, default: false }
})
</script>
