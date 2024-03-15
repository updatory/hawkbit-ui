<template>
  <PageSkeleton title="New module" :back-route-name="props.backRouteName">
    <template #actions>
      <PrimaryButton v-if="activeTab === ModuleTab.Details" label="Next" @click.stop="onNextClicked"/>
      <PrimaryButton v-if="activeTab === ModuleTab.Files" label="Save" @click.stop="onSaveClicked"/>
    </template>
    <template #content>
      <TabPanels>
        <template #panels>
          <TabPanel :active="activeTab === ModuleTab.Details"
                    title="Details"
                    description="Create new module."
                    wizard
                    first />
          <TabPanel :active="activeTab === ModuleTab.Files"
                    title="Files"
                    description="Upload files to module."
                    wizard />
        </template>
      </TabPanels>
      <DetailsModuleTab v-if="activeTab === ModuleTab.Details"
                        v-model:name="name"
                        v-model:version="version"
                        v-model:type="type"
                        v-model:vendor="vendor"
                        v-model:description="description"
                        v-bind:type-options="typeOptions" />
      <FilesModuleTab v-if="activeTab === ModuleTab.Files"
                      v-bind:artifacts="artifacts" />
    </template>
  </PageSkeleton>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
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

const moduleService = inject('moduleService') as ModuleService
const artifactService = inject('artifactService') as ArtifactService

const props = defineProps({
  backRouteName: { type: String, required: true },
})

onMounted(async () => {
  emitter.on('uploadAreaFilesSelected', onUploadAreaFilesSelected)
  emitter.on('artifactCardDeleteClicked', onArtifactCardDeleteClicked)

  const moduleTypes = await moduleService.getTypes();
  typeOptions.value = moduleTypes.map(moduleType => {
    return { text: moduleType.name, value: moduleType.id }
  })
  type.value = moduleTypes[0].id
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

const newModuleId = ref<string>()

enum ModuleTab {
  Details,
  Files
}

const activeTab = ref(ModuleTab.Details)

const onNextClicked = async () => {
  const newModule = await moduleService.create({
    type: type.value,
    name: name.value,
    version: version.value,
    vendor: vendor.value,
    description: description.value,
    // encrypted: encrypted.value
  });

  newModuleId.value = newModule.id
  activeTab.value = ModuleTab.Files
}

const onSaveClicked = async () => {
  await router.push({ name: props.backRouteName })
}

const onUploadAreaFilesSelected = async (event: UploadAreaFilesSelected) => {
  await Promise.all(
    event.files.map(file => artifactService.create(newModuleId.value!, file))
  )
  artifacts.value = await artifactService.getAll(newModuleId.value!)
}

const onArtifactCardDeleteClicked = async (event: ArtifactCardDeleteClicked) => {
  await artifactService.remove(newModuleId.value!, event.artifactId);
  artifacts.value = await artifactService.getAll(newModuleId.value!);
}

</script>
