<template>
  <button type="button" class="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
    <span class="flex-shrink-0 size-6">
      <slot name="icon"></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  label: { type: String, required: true },
})
</script>

