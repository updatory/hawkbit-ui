<template>
  <div class="relative inline-block">
    <input type="checkbox" id="hs-large-switch-with-icons" class="peer relative w-[4.25rem] h-9 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600

  before:inline-block before:w-8 before:h-8 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200">
    <label for="hs-large-switch-with-icons" class="sr-only">switch</label>
    <span class="peer-checked:text-white text-gray-500 size-8 absolute top-0.5 start-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
      <PrivateIcon class="flex-shrink-0 size-4"/>
  </span>
    <span class="peer-checked:text-blue-600 text-gray-500 size-8 absolute top-0.5 end-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
      <PublicIcon class="flex-shrink-0 size-4"/>
  </span>
  </div>
</template>
<script setup lang="ts">
import PrivateIcon from '@/icons/PrivateIcon.vue'
import PublicIcon from '@/icons/PublicIcon.vue'
</script>
