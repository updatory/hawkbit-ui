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

            <div class="sm:col-span-3 space-y-2">
              <FormInput
                label="Name"
                v-model="state.distribution.name"
                :error="state.distribution.nameError"
                :disabled="!state.distribution.isNew"
                required
              />
            </div>

            <div class="sm:col-span-3 space-y-2">
              <FormInput
                label="Version"
                v-model="state.distribution.version"
                :error="state.distribution.versionError"
                :disabled="!state.distribution.isNew"
                required
              />
            </div>

            <div class="col-span-full">
              <h5 class="text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">
                Modules <span class="text-red-400">*</span>
              </h5>
            </div>

            <div
              class="sm:col-span-3 space-y-2"
              v-for="module in state.distribution.modules as Module[]"
              :key="module.instanceId"
            >
              <ModuleCard :module="module" class="h-20 border-blue-600">
                <template #actions>
                  <SecondaryLinkButton label="Delete" @click.stop="onModuleRemoved(module)" />
                </template>
              </ModuleCard>
            </div>

            <div class="space-y-2 col-span-3">
              <EmptyCard class="h-20">
                <template #actions>
                  <SecondaryLinkButton label="Add module" @click="onAddModuleClicked">
                    <template #icon>
                      <PlusCircleIcon class="w-5 h-5" />
                    </template>
                  </SecondaryLinkButton>
                </template>
              </EmptyCard>

              <p v-if="state.distribution.modulesError" class="text-sm text-red-600">
                {{ state.distribution.modulesError }}
              </p>
            </div>

            <div class="space-y-2 col-span-full">
              <FormTextArea label="Description" v-model="state.distribution.description" />
            </div>
          </div>
          <!-- End Grid -->

          <div class="flex justify-end py-3">
            <PrimaryButton class="" label="Save" @click.stop="onSaveClicked" />
          </div>
        </div>
      </form>
    </template>
  </PageSkeleton>
  <Modal
    v-if="state.showSelectModuleModal"
    title="Select module"
    :close="onSelectModuleModalClosed"
  >
    <template #content>
      <div class="flex flex-col space-y-2">
        <ModuleCard
          :module="module"
          v-for="module in state.modules as Module[]"
          :key="module.instanceId"
        >
          <template #actions>
            <SecondaryLinkButton label="Select" @click.stop="onModuleAdded(module as Module)" />
          </template>
        </ModuleCard>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import PrimaryButton from '@/components/PrimaryButton.vue'
import PageSkeleton from '@/components/PageSkeleton.vue'
import { computed, onMounted, reactive } from 'vue'
import FormTextArea from '@/components/FormTextArea.vue'
import FormInput from '@/components/FormInput.vue'
import Distribution from '@/models/Distribution'
import SecondaryLinkButton from '@/components/SecondaryLinkButton.vue'
import Modal from '@/components/Modal.vue'
import Module from '@/models/Module'
import ModuleCard from '@/components/ModuleCard.vue'
import PlusCircleIcon from '@/icons/PlusCircleIcon.vue'
import EmptyCard from '@/components/EmptyCard.vue'

const route = useRoute()
const router = useRouter()

const props = defineProps({
  backRouteName: { type: String, required: true }
})

const title = computed(() => {
  return route.params.id ? 'Edit distribution' : 'New distribution'
})

const state = reactive<{
  distribution: Distribution
  modules: Module[]
  showSelectModuleModal: boolean
}>({
  distribution: new Distribution({}),
  modules: [],
  showSelectModuleModal: false
})

onMounted(async () => {
  if (typeof route.params.id === 'string') {
    state.distribution = await Distribution.getById(route.params.id)
  }

  state.modules = await Module.getAll()
})

const onSaveClicked = async () => {
  if (await state.distribution.validate()) {
    await state.distribution.save()
    await router.push({ name: props.backRouteName })
  }
}

const onAddModuleClicked = () => {
  state.showSelectModuleModal = true
}

const onSelectModuleModalClosed = () => {
  state.showSelectModuleModal = false
}

const onModuleAdded = (module: Module) => {
  state.distribution.addModule(module)
  state.showSelectModuleModal = false
}

const onModuleRemoved = (module: Module) => {
  state.distribution.removeModule(module)
}
</script>
