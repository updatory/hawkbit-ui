<template>
  <PageSkeleton title="New distribution" :back-route-name="props.backRouteName">
    <template #actions>
      <PrimaryButton
        v-if="activeTab === ModuleTab.Details"
        label="Next"
        @click.stop="onNextClicked"
      />
      <PrimaryButton
        v-if="activeTab === ModuleTab.Modules"
        label="Save"
        @click.stop="onSaveClicked"
      />
    </template>
    <template #content>
      <TabPanels>
        <template #panels>
          <TabPanel
            :active="activeTab === ModuleTab.Details"
            title="Details"
            description="Create new distribution."
            wizard
            first
          />
          <TabPanel
            :active="activeTab === ModuleTab.Modules"
            title="Modules"
            description="Link modules."
            wizard
          />
        </template>
      </TabPanels>
      <DetailsDistributionTab
        v-if="activeTab === ModuleTab.Details"
        v-model:name="name"
        v-model:version="version"
        v-model:description="description"
        v-bind:type-options="typeOptions"
      />
      <ModulesDistributionTab v-if="activeTab === ModuleTab.Modules" />
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
import DetailsDistributionTab from '@/tabs/DetailsDistributionTab.vue'
import ModulesDistributionTab from '@/tabs/ModulesDistributionTab.vue'

const emitter = useEmitter()
const router = useRouter()

const moduleService = inject('moduleService') as ModuleService

const props = defineProps({
  backRouteName: { type: String, required: true }
})

onMounted(async () => {
  const moduleTypes = await moduleService.getTypes()
  typeOptions.value = moduleTypes.map((moduleType) => {
    return { text: moduleType.name, value: moduleType.id }
  })
  type.value = moduleTypes[0].id
})

onUnmounted(() => {})

const name = ref<string>()
const version = ref<string>()
const type = ref<string>()
const typeOptions = ref<Option[]>([])
const description = ref<string>()

// const newDistributionId = ref<string>()

enum ModuleTab {
  Details,
  Modules
}

const activeTab = ref(ModuleTab.Details)

const onNextClicked = async () => {
  // const newModule = await moduleService.create({
  //   type: type.value,
  //   name: name.value,
  //   version: version.value,
  //   vendor: vendor.value,
  //   description: description.value,
  //   // encrypted: encrypted.value
  // });
  //
  // newModuleId.value = newModule.id
  activeTab.value = ModuleTab.Modules
}

const onSaveClicked = async () => {
  await router.push({ name: props.backRouteName })
}
</script>
