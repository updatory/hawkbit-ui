<template>
  <div class="flex items-center">
    <input
      type="checkbox"
      id="hs-small-switch"
      class="relative w-11 h-6 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 before:inline-block before:size-5 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200"
    />
    <label for="hs-small-switch" class="text-sm text-gray-500 ms-3">{{ props.label }}</label>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  label: { type: String, required: true },
  disabled: { type: Boolean, default: false }
})
</script>
