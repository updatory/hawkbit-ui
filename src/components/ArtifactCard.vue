<template>
  <div
    class="flex flex-row items-center mb-2 justify-between bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-5 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
  >
    <div class="flex items-center gap-x-3">
      <span
        class="size-8 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg dark:border-neutral-700"
      >
        <BinaryFileIcon class="flex-shrink-0 size-5" />
      </span>
      <div>
        <p class="text-sm truncate font-medium text-gray-800 dark:text-white">
          {{ props.artifact.fileName.value }}
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-500">{{ fileSize }} KB</p>
      </div>
    </div>
    <div class="inline-flex items-center gap-x-2">
      <a class="text-gray-500 hover:text-gray-800" href="#" @click.stop.prevent="onDeleteClicked">
        <TrashIcon class="flex-shrink-0 size-4" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import useEmitter from '@/hooks/useEmitter'
import TrashIcon from '@/icons/TrashIcon.vue'
import BinaryFileIcon from '@/icons/BinaryFileIcon.vue'
import type Artifact from '@/models/Artifact'

const props = defineProps({
  artifact: { type: Object as PropType<Artifact>, required: true }
})

const emitter = useEmitter()

const fileSize = computed(() => {
  return Math.floor(props.artifact.fileSize.value / 1024)
})

const onDeleteClicked = () => {
  emitter.emit('artifactCardDeleteClicked', {
    artifact: props.artifact
  })
}
</script>
