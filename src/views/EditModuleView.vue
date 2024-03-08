<template>
  <PageSkeleton :title="name" :back-route-name="props.backRouteName">
    <template #content>
      <form>
        <div class="pt-0 p-4 sm:pt-2 sm:p-10">
          <!-- Grid -->
          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <div class="space-y-2">
                <FormInput label="Name" v-model="name" disabled />
              </div>

              <div class="space-y-2">
                <FormInput label="Version" v-model="version" disabled />
              </div>

              <div class="space-y-2">
                <FormSelect label="Type" v-model="type" :options="types" disabled />
              </div>

              <div class="space-y-2">
                <FormInput label="Vendor" v-model="vendor" />
              </div>

              <div class="space-y-2">
                <FormTextArea label="Description" v-model="description" />
              </div>

              <div class="my-4 flex">
                <FormCheckbox label="Enable artifact encryption" v-model="encrypted" disabled />
              </div>

              <PrimaryButton @click="onModuleUpdate" class="mt-4" label="Update" />
            </div>

            <div class="sm:col-span-3 space-y-2">
              <p class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">
                Artifacts
              </p>
              <UploadArea />

              <ArtifactCard v-for="artifact in artifacts"
                            :key="artifact.id"
                            :artifact="artifact"/>
            </div>
          </div>
          <!-- End Grid -->
        </div>
      </form>
    </template>
  </PageSkeleton>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import PageSkeleton from '@/components/PageSkeleton.vue'
import { inject, onMounted, onUnmounted, ref } from 'vue'
import type ModuleService from '@/services/ModuleService'
import type ArtifactService from '@/services/ArtifactService'
import type Artifact from '@/models/Artifact'
import ArtifactCard from '@/components/ArtifactCard.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import FormInput from '@/components/FormInput.vue'
import FormTextArea from '@/components/FormTextArea.vue'
import FormSelect from '@/components/FormSelect.vue'
import FormCheckbox from '@/components/FormCheckbox.vue'
import UploadArea from '@/components/UploadArea.vue'
import useEmitter from '@/hooks/useEmitter'
import type UploadAreaFilesSelected from '@/events/UploadAreaFilesSelected'
import type ArtifactCardDeleteClicked from '@/events/ArtifactCardDeleteClicked'

const moduleService = inject('moduleService') as ModuleService
const artifactService = inject('artifactService') as ArtifactService

const emitter = useEmitter()
const route = useRoute()

const props = defineProps({
  backRouteName: { type: String, required: true },
})

const types = [
  {
    text: 'Application',
    value: 'application'
  }, {
    text: 'OS',
    value: 'os'
  }
]

const moduleId = route.params.id as string

const artifacts = ref<Artifact[]>([])
const name = ref('')
const version = ref('')
const type = ref(types[0].value)
const vendor = ref('')
const description = ref('')
const encrypted = ref(false)

onMounted(() => {
  emitter.on('uploadAreaFilesSelected', onUploadAreaFilesSelected)
  emitter.on('artifactCardDeleteClicked', onArtifactCardDeleteClicked)

  moduleService.getById(moduleId).then(module => {
    name.value = module.name
    version.value = module.version
    type.value = module.type
    vendor.value = module.vendor
    description.value = module.description
    encrypted.value = module.encrypted
  })

  artifactService.getAll(moduleId).then(results => {
    artifacts.value = results
  })
})

onUnmounted(() => {
  emitter.off('uploadAreaFilesSelected', onUploadAreaFilesSelected)
  emitter.off('artifactCardDeleteClicked', onArtifactCardDeleteClicked)
})

const onModuleUpdate = async () => {
  await moduleService.update(moduleId, {
    vendor: vendor.value,
    description: description.value,
  });
}

const onUploadAreaFilesSelected = async (event: UploadAreaFilesSelected) => {
  await Promise.all(
    event.files.map(file => artifactService.create(moduleId, file))
  )
  artifacts.value = await artifactService.getAll(moduleId)
}

const onArtifactCardDeleteClicked = async (event: ArtifactCardDeleteClicked) => {
  const moduleId = route.params.id as string;
  await artifactService.remove(moduleId, event.artifactId);
  artifacts.value = await artifactService.getAll(moduleId);
}
</script>
