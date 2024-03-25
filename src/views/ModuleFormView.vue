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
                v-model="module.name.value"
                :error="module.meta.validation.name.value"
                :disabled="!module.meta.isNew.value"
                required
              />
            </div>

            <div class="sm:col-span-2 space-y-2">
              <FormInput
                label="Version"
                v-model="module.version.value"
                :error="module.meta.validation.version.value"
                :disabled="!module.meta.isNew.value"
                required
              />
            </div>

            <div class="sm:col-span-2 space-y-2">
              <FormSelect
                label="Type"
                v-model="module.type.value"
                :options="moduleTypeOptions"
                :error="module.meta.validation.type.value"
                :disabled="!module.meta.isNew.value"
                required
              />
            </div>

            <div class="col-span-full space-y-2">
              <FormInput label="Vendor" v-model="module.vendor.value" />
            </div>

            <div class="col-span-full flex flex-row items-center justify-start gap-2">
              <FormSwitch :disabled="!module.meta.isNew.value" />
              <span class="text-sm text-gray-500 ms-3 dark:text-gray-400"
                >Enable files encryption</span
              >
            </div>

            <div class="space-y-2 col-span-full">
              <FormTextArea label="Description" v-model="module.description.value" />
            </div>

            <div class="col-span-full">
              <h5 class="text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">Metadata</h5>
            </div>

            <div class="space-y-2 col-span-full">
              <FormProperty
                v-for="property in module.properties.value"
                :key="property.meta.instanceId"
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
                  v-for="artifact in module.artifacts.value"
                  :key="artifact.meta.instanceId.value"
                  class="sm:col-span-3"
                >
                  <ArtifactCard :artifact="artifact" />
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
import { computed, onMounted, onUnmounted, ref, shallowRef } from 'vue'
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

const module = shallowRef(new Module({}))

const moduleTypeOptions = ref<Option[]>([])

onMounted(async () => {
  const moduleTypes = await ModuleType.getAll()
  moduleTypeOptions.value = moduleTypes.map((moduleType) => {
    return { text: moduleType.name, value: moduleType.key }
  })

  if (typeof route.params.id === 'string') {
    module.value = await Module.getById(route.params.id)
  } else {
    module.value = new Module({
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
    module.value.addArtifact(Artifact.fromFile(file))
  }
}

const onArtifactCardDeleteClicked = async (event: ArtifactCardDeleteClicked) => {
  module.value.removeArtifact(event.artifact)
}

const onSaveClicked = async () => {
  if (module.value.validate()) {
    await module.value.save()
    console.log('==> saved')
  }
}

const onAddProperty = () => {
  module.value.addProperty(new ModuleProperty({}))
}
</script>
