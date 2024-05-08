<template>
  <PageSkeleton :title="title" :back-route-name="props.backRouteName">
    <template #content>
      <form>
        <div class="pt-4 p-4 sm:pt-2 sm:p-10">
          <!-- Grid -->
          <div class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
            <div class="col-span-full">
              <h5 class="text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">General</h5>
            </div>

            <div class="sm:col-span-2 space-y-2">
              <FormInput
                label="Name"
                v-model="state.module.name"
                :error="state.module.nameError"
                :disabled="!state.module.isNew"
                required
              />
            </div>

            <div class="sm:col-span-2 space-y-2">
              <FormInput
                label="Version"
                v-model="state.module.version"
                :error="state.module.versionError"
                :disabled="!state.module.isNew"
                required
              />
            </div>

            <div class="sm:col-span-2 space-y-2">
              <FormSelect
                label="Type"
                v-model="state.module.type"
                :options="moduleTypeOptions"
                :error="state.module.typeError"
                :disabled="!state.module.isNew"
                required
              />
            </div>

            <div class="col-span-full space-y-2">
              <FormInput label="Vendor" v-model="state.module.vendor" />
            </div>

            <div class="col-span-full flex flex-row items-center justify-start gap-2">
              <FormSwitch :disabled="!state.module.isNew" />
              <span class="text-sm text-gray-500 ms-3 dark:text-gray-400"
                >Enable files encryption</span
              >
            </div>

            <div class="space-y-2 col-span-full">
              <FormTextArea label="Description" v-model="state.module.description" />
            </div>

            <div class="col-span-full">
              <h5 class="text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">Metadata</h5>
            </div>

            <div class="space-y-2 col-span-full">
              <FormProperty
                v-for="property in state.module.properties"
                :key="property.instanceId"
              />
            </div>

            <div class="col-span-full">
              <SecondaryLinkButton label="Add property" @click="onAddProperty">
                <template #icon>
                  <PlusCircleIcon class="w-5 h-5" />
                </template>
              </SecondaryLinkButton>
            </div>

            <div class="col-span-full">
              <h5 class="text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">Files</h5>
            </div>

            <div class="col-span-full">
              <div class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                <div class="col-span-full">
                  <UploadArea />
                </div>
                <div
                  v-for="artifact in state.module.artifacts"
                  :key="artifact.instanceId"
                  class="sm:col-span-3"
                >
                  <ArtifactCard :artifact="artifact as Artifact" />
                </div>
              </div>
            </div>
          </div>
          <!-- End Grid -->
        </div>
      </form>
      <PrimaryButton label="Save" @click.stop="onSaveClicked" />
    </template>
  </PageSkeleton>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import PrimaryButton from '@/components/PrimaryButton.vue'
import PageSkeleton from '@/components/PageSkeleton.vue'
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import FormProperty from '@/components/FormProperty.vue'
import UploadArea from '@/components/UploadArea.vue'
import FormSelect, { type Option } from '@/components/FormSelect.vue'
import ArtifactCard from '@/components/ArtifactCard.vue'
import FormSwitch from '@/components/FormSwitch.vue'
import SecondaryLinkButton from '@/components/SecondaryLinkButton.vue'
import PlusCircleIcon from '@/icons/PlusCircleIcon.vue'
import FormTextArea from '@/components/FormTextArea.vue'
import FormInput from '@/components/FormInput.vue'
import useEmitter from '@/hooks/useEmitter'
import type UploadAreaFilesSelected from '@/events/UploadAreaFilesSelected'
import type ArtifactCardDeleteClicked from '@/events/ArtifactCardDeleteClicked'
import Module from '@/models/Module'
import Artifact from '@/models/Artifact'
import ModuleType from '@/models/ModuleType'
import ModuleProperty from '@/models/ModuleProperty'

// const router = useRouter()
const route = useRoute()

const props = defineProps({
  backRouteName: { type: String, required: true }
})

const title = computed(() => {
  return route.params.id ? 'Edit module' : 'New module'
})

const state = reactive<{
  module: Module
}>({
  module: new Module({})
})

const moduleTypeOptions = ref<Option[]>([])

onMounted(async () => {
  const moduleTypes = await ModuleType.getAll()
  moduleTypeOptions.value = moduleTypes.map((moduleType) => {
    return { text: moduleType.name, value: moduleType.key }
  })

  if (typeof route.params.id === 'string') {
    state.module = await Module.getById(route.params.id)
  } else {
    state.module = new Module({
      type: moduleTypes[0].key
    })
  }
})

const emitter = useEmitter()

onMounted(async () => {
  emitter.on('uploadAreaFilesSelected', onUploadAreaFilesSelected)
  emitter.on('artifactCardDeleteClicked', onArtifactCardDeleteClicked)
})

onUnmounted(() => {
  emitter.off('uploadAreaFilesSelected', onUploadAreaFilesSelected)
  emitter.off('artifactCardDeleteClicked', onArtifactCardDeleteClicked)
})

const onUploadAreaFilesSelected = async (event: UploadAreaFilesSelected) => {
  for (const file of event.files) {
    state.module.addArtifact(Artifact.fromFile(file))
  }
}

const onArtifactCardDeleteClicked = async (event: ArtifactCardDeleteClicked) => {
  state.module.removeArtifact(event.artifact)
}

const onSaveClicked = async () => {
  if (await state.module.validate()) {
    await state.module.save()
    console.log('==> saved')
  }
}

const onAddProperty = () => {
  state.module.addProperty(new ModuleProperty({}))
}
</script>
