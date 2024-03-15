<template>
  <li :class="{'sm:border-l': props.first, 'border-b-4': props.active, 'cursor-pointer': !props.wizard}"
      class="relative flex items-center justify-start gap-3 p-4 sm:ps-10 sm:border-r border-b-blue-600">
    <span v-if="props.wizard && !props.first"
          class="absolute -left-2 top-1/2 hidden size-4 -translate-y-1/2 rotate-45 border sm:block border-b-0 border-s-0 bg-white"/>
    <p>
      <span :class="{'text-blue-600': props.active}"
            class="block">
        {{ props.title }}
      </span>
      <span>{{ props.description }}</span>
    </p>
  </li>
</template>

<script setup lang="ts">
const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  active: { type: Boolean, required: false, default: false },
  first: { type: Boolean, required: false, default: false },
  wizard: { type: Boolean, required: false, default: false },
})
</script>
