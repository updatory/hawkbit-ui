<template>
  <th
    scope="col"
    :class="{ 'w-1': props.fitContent }"
    class="px-6 py-3 text-start text-xs text-gray-500 uppercase text-nowrap"
  >
    <slot></slot>
  </th>
</template>
<script setup lang="ts">
const props = defineProps({
  fitContent: { type: Boolean, required: false, default: false }
})
</script>
