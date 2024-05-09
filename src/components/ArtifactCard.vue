<template>
  <!-- File Uploading Progress Form -->
  <div class="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-5">
    <!-- Uploading File Content -->
    <div class="mb-2 flex justify-between items-center">
      <div class="flex items-center gap-x-3">
        <span
          class="size-8 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg"
        >
          <BinaryFileIcon class="flex-shrink-0 size-5" />
        </span>
        <div>
          <p :class="{ 'text-red-500': failed }" class="text-sm font-medium text-gray-800">
            {{ props.artifact.fileName }}
          </p>
          <p class="text-xs text-gray-500">{{ fileSize }} KB</p>
        </div>
      </div>
      <div class="inline-flex items-center gap-x-2">
        <ErrorIcon v-if="failed" class="flex-shrink-0 size-4 text-red-500" />
        <SuccessIcon v-if="completed" class="flex-shrink-0 size-4 text-teal-500" />
        <a class="text-gray-500 hover:text-gray-800" href="#" @click.stop.prevent="onDeleteClicked">
          <TrashIcon class="flex-shrink-0 size-4" />
        </a>
      </div>
    </div>
    <!-- End Uploading File Content -->

    <!-- Progress Bar -->
    <div class="flex items-center gap-x-3 whitespace-nowrap">
      <div
        class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow="1"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          :class="{
            'bg-teal-500': completed,
            'bg-red-500': failed,
            'bg-blue-600': !completed && !failed
          }"
          :style="{
            width: `${progress}%`
          }"
          class="flex flex-col justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap transition duration-500"
        ></div>
      </div>
    </div>
    <!-- End Progress Bar -->
  </div>
  <!-- End File Uploading Progress Form -->
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import useEmitter from '@/hooks/useEmitter'
import TrashIcon from '@/icons/TrashIcon.vue'
import BinaryFileIcon from '@/icons/BinaryFileIcon.vue'
import type Artifact from '@/models/Artifact'
import ErrorIcon from '@/icons/ErrorIcon.vue'
import SuccessIcon from '@/icons/SuccessIcon.vue'
import UploadState from '@/models/UploadState'

const props = defineProps({
  artifact: { type: Object as PropType<Artifact>, required: true }
})

const emitter = useEmitter()

const fileSize = computed(() => {
  return Math.floor(props.artifact.fileSize / 1024)
})

const failed = computed(() => {
  return props.artifact.uploadState === UploadState.Failed
})

const completed = computed(() => {
  return props.artifact.uploadState === UploadState.Completed
})

const progress = computed(() => {
  return props.artifact.uploadState === UploadState.Completed ? 100 : props.artifact.uploadProgress
})

const onDeleteClicked = () => {
  emitter.emit('artifactCardDeleteClicked', {
    artifact: props.artifact
  })
}
</script>
