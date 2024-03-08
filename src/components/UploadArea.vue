<template>
  <label for="upload-area"
         class="group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-gray-700">
    <input id="upload-area"
           type="file"
           class="sr-only"
           @change.stop.prevent="onChange">
    <UploadIcon class="size-10 mx-auto text-gray-400 dark:text-gray-600" />

    <span class="mt-2 block text-sm text-gray-800 dark:text-gray-200">
      <span class="group-hover:text-blue-700 text-blue-600">Browse</span> your device or drag-and-drop
    </span>
  </label>
</template>
<script setup lang="ts">
import UploadIcon from '@/icons/UploadIcon.vue'
import useEmitter from '@/hooks/useEmitter'

const emitter = useEmitter();

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target?.files) {
    emitter.emit('uploadAreaFilesSelected', {
      files: Array.from(target.files)
    })
  }
}
</script>
