<template>
  <form>
    <div class="pt-4 p-4 sm:pt-2 sm:p-10">
      <!-- Grid -->
      <div class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
        <div class="col-span-full">
          <h5 class="text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">General</h5>
        </div>

        <div class="sm:col-span-2 space-y-2">
          <FormInput label="Name" v-model="name" :disabled="props.editMode" required/>
        </div>

        <div class="sm:col-span-2 space-y-2">
          <FormInput label="Version" v-model="version" :disabled="props.editMode" required />
        </div>

        <div class="sm:col-span-2 space-y-2">
          <FormSelect label="Type" v-model="type" :options="props.typeOptions" :disabled="props.editMode" required />
        </div>

        <div class="col-span-full space-y-2">
          <FormInput label="Vendor" v-model="vendor" />
        </div>

        <div class="col-span-full flex flex-row items-center justify-start gap-2">
          <FormSwitch :disabled="props.editMode"/>
          <span class="text-sm text-gray-500 ms-3 dark:text-gray-400">Enable artifact encryption</span>
        </div>

        <div class="space-y-2 col-span-full">
          <FormTextArea label="Description" v-model="description" />
        </div>

        <div class="col-span-full">
          <h5 class="text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">Metadata</h5>
        </div>

        <div class="space-y-2  col-span-full">
          <FormProperty/>
        </div>

        <div class="col-span-full">
          <SecondaryLinkButton label="Add property">
            <template #icon>
              <PlusCircleIcon class="w-5 h-5" />
            </template>
          </SecondaryLinkButton>
        </div>

      </div>
      <!-- End Grid -->
    </div>
  </form>
</template>
<script setup lang="ts">
import FormSwitch from '@/components/FormSwitch.vue'
import FormTextArea from '@/components/FormTextArea.vue'
import PlusCircleIcon from '@/icons/PlusCircleIcon.vue'
import FormInput from '@/components/FormInput.vue'
import FormSelect, { type Option } from '@/components/FormSelect.vue'
import FormProperty from '@/components/FormProperty.vue'
import SecondaryLinkButton from '@/components/SecondaryLinkButton.vue'

const name = defineModel<string | undefined>('name', { required: true })
const version = defineModel<string | undefined>('version',{ required: true })
const type = defineModel<string | undefined>('type', { required: true })
const vendor = defineModel<string | undefined>('vendor', { required: true })
const description = defineModel<string | undefined>('description', { required: true })

const props = defineProps({
  typeOptions: { type: Array<Option>, required: true },
  editMode: { type: Boolean, required: false, default: false},
})
</script>
