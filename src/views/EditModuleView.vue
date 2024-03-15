<template>
  <PageSkeleton title="Edit module" :back-route-name="props.backRouteName">
    <template #actions>
      <PrimaryButton label="Save" @click.stop="onSaveClicked"/>
    </template>
    <template #content>
      <TabPanels>
        <template #panels>
          <TabPanel :active="activeTab === ModuleTab.Details"
                    title="Details"
                    description="Edit module details."
                    first
                    @click.stop="onDetailsClicked"/>
          <TabPanel :active="activeTab === ModuleTab.Files"
                    title="Files"
                    description="Manage module files."
                    @click.stop="onFilesClicked"/>
        </template>
      </TabPanels>
      <DetailsModuleTab v-if="activeTab === ModuleTab.Details"
                        v-model:name="name"
                        v-model:version="version"
                        v-model:type="type"
                        v-model:vendor="vendor"
                        v-model:description="description"
                        v-bind:type-options="typeOptions"
                        v-bind:edit-mode="true"/>
      <FilesModuleTab v-if="activeTab === ModuleTab.Files"
                      v-bind:artifacts="artifacts" />
    </template>
  </PageSkeleton>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import PrimaryButton from '@/components/PrimaryButton.vue'
import PageSkeleton from '@/components/PageSkeleton.vue'
import { inject, onMounted, onUnmounted, ref } from 'vue'
import type ModuleService from '@/services/ModuleService'
import TabPanels from '@/components/TabPanels.vue'
import TabPanel from '@/components/TabPanel.vue'
import DetailsModuleTab from '@/tabs/DetailsModuleTab.vue'
import type { Option } from '@/components/FormSelect.vue'
import FilesModuleTab from '@/tabs/FilesModuleTab.vue'
import type ArtifactService from '@/services/ArtifactService'
import useEmitter from '@/hooks/useEmitter'
import type UploadAreaFilesSelected from '@/events/UploadAreaFilesSelected'
import type ArtifactCardDeleteClicked from '@/events/ArtifactCardDeleteClicked'
import type Artifact from '@/models/Artifact'

const emitter = useEmitter()
const router = useRouter()
const route = useRoute()

const moduleService = inject('moduleService') as ModuleService
const artifactService = inject('artifactService') as ArtifactService

const props = defineProps({
  backRouteName: { type: String, required: true },
})

const moduleId = route.params.id as string

onMounted(async () => {
  emitter.on('uploadAreaFilesSelected', onUploadAreaFilesSelected)
  emitter.on('artifactCardDeleteClicked', onArtifactCardDeleteClicked)

  const moduleTypes = await moduleService.getTypes();
  typeOptions.value = moduleTypes.map(moduleType => {
    return { text: moduleType.name, value: moduleType.id }
  })
  type.value = moduleTypes[0].id

  moduleService.getById(moduleId).then(module => {
    name.value = module.name
    version.value = module.version
    type.value = module.type
    vendor.value = module.vendor
    description.value = module.description
    // encrypted.value = module.encrypted
  })

  artifactService.getAll(moduleId).then(results => {
    artifacts.value = results
  })
})

onUnmounted(() => {
  emitter.off('uploadAreaFilesSelected', onUploadAreaFilesSelected)
  emitter.off('artifactCardDeleteClicked', onArtifactCardDeleteClicked)
})

const name = ref<string>()
const version = ref<string>()
const type = ref<string>()
const typeOptions = ref<Option[]>([])
const vendor = ref<string>()
const description = ref<string>()
// const encrypted = ref(false)
const artifacts = ref<Artifact[]>([])

enum ModuleTab {
  Details,
  Files
}

const activeTab = ref(ModuleTab.Details)

const onSaveClicked = async () => {
  await moduleService.update(moduleId, {
    vendor: vendor.value,
    description: description.value,
  });

  await router.push({ name: props.backRouteName })
}

const onDetailsClicked = () => {
  activeTab.value = ModuleTab.Details
}

const onFilesClicked = () => {
  activeTab.value = ModuleTab.Files
}

const onUploadAreaFilesSelected = async (event: UploadAreaFilesSelected) => {
  await Promise.all(
    event.files.map(file => artifactService.create(moduleId, file))
  )
  artifacts.value = await artifactService.getAll(moduleId)
}

const onArtifactCardDeleteClicked = async (event: ArtifactCardDeleteClicked) => {
  await artifactService.remove(moduleId, event.artifactId);
  artifacts.value = await artifactService.getAll(moduleId);
}
</script>
