<template>
  <div
    class="flex flex-col justify-center bg-white border-2 border-dotted rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
  >
    <div class="p-4 md:p-5 flex justify-between items-center">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
