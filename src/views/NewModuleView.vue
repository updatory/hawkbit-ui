<template>
  <PageSkeleton title="New module" :back-route-name="props.backRouteName">
    <template #content>
      <form>
        <div class="pt-4 p-4 sm:pt-2 sm:p-10">
          <!-- Grid -->
          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-2 space-y-2">
              <FormInput label="Name" v-model="name" required />
            </div>

            <div class="sm:col-span-2 space-y-2">
              <FormInput label="Version" v-model="version" required />
            </div>

            <div class="sm:col-span-2 space-y-2">
              <FormSelect label="Type" v-model="type" :options="types" required />
            </div>

            <div class="col-span-full space-y-2">
              <FormInput label="Vendor" v-model="vendor" />
            </div>

            <div class="space-y-2 col-span-full">
              <FormTextArea label="Description" v-model="description" />
            </div>

            <div class="col-span-full flex">
              <FormCheckbox label="Enable artifact encryption" v-model="encrypted" />
            </div>
          </div>

          <PrimaryButton label="Create" @click.stop="onCreateClicked" class="mt-8"/>
          <!-- End Grid -->
        </div>
      </form>
    </template>
  </PageSkeleton>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import PrimaryButton from '@/components/PrimaryButton.vue'
import PageSkeleton from '@/components/PageSkeleton.vue'
import { inject, onMounted, ref } from 'vue'
import type ModuleService from '@/services/ModuleService'
import FormInput from '@/components/FormInput.vue'
import FormSelect, { type Option } from '@/components/FormSelect.vue'
import FormTextArea from '@/components/FormTextArea.vue'
import FormCheckbox from '@/components/FormCheckbox.vue'

const moduleService = inject('moduleService') as ModuleService
const router = useRouter()

const props = defineProps({
  backRouteName: { type: String, required: true },
})

const name = ref<string>()
const version = ref<string>()
const type = ref<string>()
const types = ref<Option[]>([])
const vendor = ref<string>()
const description = ref<string>()
const encrypted = ref(false)

onMounted(async () => {
  const moduleTypes = await moduleService.getTypes();
  types.value = moduleTypes.map(moduleType => {
    return { text: moduleType.name, value: moduleType.id }
  })
  type.value = moduleTypes[0].id
})

const onCreateClicked = async () => {
  await moduleService.create({
    type: type.value,
    name: name.value,
    version: version.value,
    vendor: vendor.value,
    description: description.value,
    encrypted: encrypted.value
  });

  await router.push({ name: props.backRouteName })
}
</script>
