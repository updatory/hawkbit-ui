<template>
  <header class="sticky top-0 inset-x-0 sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-4 dark:bg-gray-800 dark:border-gray-700">
    <nav class="flex basis-full items-center w-full mx-auto px-4 sm:px-6 md:px-10" aria-label="Global">
      <div class="w-full">
        <div class="flex flex-row items-center justify-between gap-2">
          <div class="flex flex-row items-center justify-start gap-2">
            <h3 class="text-2xl dark:text-white">{{ props.title }}</h3>
          </div>
          <slot name="actions"></slot>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const props = defineProps({
  title: { type: String, required: true },
})
</script>
