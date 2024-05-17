<template>
  <div
    class="flex flex-col justify-center bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
  >
    <div class="p-4 md:p-5 flex justify-between items-center">
      <div>
        <h3 class="font-semibold text-gray-800 dark:text-white">{{ props.targetFilter.name }}</h3>
      </div>
      <slot name="actions"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import TargetFilter from '@/models/TargetFilter'

const props = defineProps({
  targetFilter: { type: TargetFilter, required: true }
})
</script>
