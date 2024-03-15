<template>
  <div class="pt-4 p-4 sm:pt-2 sm:p-10">
    <div class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
      <div class="col-span-full">
        <UploadArea class="mt-4" />
      </div>
      <div v-for="artifact in props.artifacts" :key="artifact.id"
           class="sm:col-span-3">
        <ArtifactCard :artifact="artifact" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import UploadArea from '@/components/UploadArea.vue'
import ArtifactCard from '@/components/ArtifactCard.vue'
import type Artifact from '@/models/Artifact'
import type { PropType } from 'vue'

const props = defineProps({
  artifacts: { type: Array as PropType<Artifact[]>, required: true },
})
</script>
