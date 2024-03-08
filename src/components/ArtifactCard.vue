<template>
  <div class="flex flex-row items-center mb-2 justify-between bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-5 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
    <div class="flex items-center gap-x-3">
      <span class="size-8 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg dark:border-neutral-700">
        <svg class="flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
      </span>
      <div>
        <p class="text-sm truncate font-medium text-gray-800 dark:text-white">{{ props.artifact.providedFilename }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-500">{{ Math.floor(props.artifact.size / 1024) }} KB</p>
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
import type Artifact from '@/models/Artifact'
import type { PropType } from 'vue'
import useEmitter from '@/hooks/useEmitter'
import TrashIcon from '@/icons/TrashIcon.vue'

const props = defineProps({
  artifact: { type: Object as PropType<Artifact>, required: true },
})

const emitter = useEmitter()

const onDeleteClicked = () => {
  emitter.emit('artifactCardDeleteClicked', {
    artifactId: props.artifact.id
  });
}
</script>
