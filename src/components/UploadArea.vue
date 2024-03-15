<template>
  <div>
    <label for="upload-area"
           class="group p-4 sm:p-16 block cursor-pointer text-center border-2 border-dotted border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-gray-700">
      <input id="upload-area"
             type="file"
             class="sr-only"
             @change.stop.prevent="onChange">
      <UploadIcon class="size-10 mx-auto text-gray-400 dark:text-gray-600" />
      <span class="mt-2 block text-sm font-bold text-stone-600 dark:text-gray-200">
        Drop your files here or <span class="group-hover:text-blue-700 text-blue-600">browse</span>
      </span>
    </label>
    <p class="mt-4 text-sm text-gray-500">Maximum upload file size: 5 GB</p>
  </div>
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
