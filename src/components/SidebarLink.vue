<style>
.router-link-active {
  @apply bg-gray-100 dark:bg-gray-900;
}
</style>
<template>
  <li>
    <router-link :to="props.href" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
      <div class="w-6 h-6">
        <slot name="icon"></slot>
      </div>
      {{ props.label }}
    </router-link>
  </li>
</template>

<script setup lang="ts">
const props = defineProps({
  href: { type: String, required: true },
  label: { type: String, required: true },
})
</script>
