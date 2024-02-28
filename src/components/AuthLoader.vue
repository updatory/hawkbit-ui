<style>
@tailwind components;

@layer components {
  #sapp {
    @apply w-full max-w-md mx-auto p-6;
  }

  bodys {
    @apply dark:bg-slate-900 bg-gray-100 flex h-full items-center py-16;
  }
}
</style>

<script setup lang="ts">
function reload() {
  window.location.reload()
}
</script>

<template>
  <div
    class="max-w-md mx-auto my-16 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="p-4 sm:p-7">
      <div class="text-center">
        <img src="../assets/logo.png" alt="hawkBit" class="block w-auto h-10 mx-auto mb-5" />

        <h1><a href="#" @click="reload">Sign-in to continue</a></h1>
      </div>
    </div>
  </div>
</template>
