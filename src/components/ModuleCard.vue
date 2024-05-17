<template>
  <div
    class="flex flex-col justify-center bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
  >
    <div class="p-4 md:p-5 flex justify-between items-center">
      <div>
        <h3 class="font-semibold text-gray-800 dark:text-white">{{ props.module.name }}</h3>
        <p class="text-sm text-gray-500 dark:text-neutral-400">
          {{ props.module.version }}
        </p>
      </div>
      <slot name="actions"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import Module from '@/models/Module'

const props = defineProps({
  module: { type: Module, required: true }
})
</script>
