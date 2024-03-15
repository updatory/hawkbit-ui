<template>
  <div class="border-b">
    <h2 class="sr-only">Steps</h2>
    <div>
      <ol class="mx-4 bg-white sm:mx-10 grid grid-cols-1 overflow-hidden text-sm text-gray-500 sm:grid-cols-2">
        <slot name="panels"></slot>
      </ol>
    </div>
  </div>

</template>
<script setup lang="ts">
import UploadIcon from '@/icons/UploadIcon.vue'
import DocumentIcon from '@/icons/DocumentIcon.vue'
import PencilIcon from '@/icons/PencilIcon.vue'
</script>
