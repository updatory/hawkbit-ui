<template>
  <PageSkeleton title="Edit module">
    <template #actions>
      <div class="flex flex-row items-center gap-2">
        <SecondaryButton label="Cancel" @click.stop="onCancel" />
        <PrimaryButton label="Save" @click.stop="onSave" />
      </div>
    </template>
    <template #content>
      <form>
        <div class="pt-0 p-4 sm:pt-0 sm:p-7">
          <!-- Grid -->
          <div class="space-y-4 sm:space-y-6">

            <div class="space-y-2">
              <label for="af-submit-app-category"
                     class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">
                Type
              </label>

              <select v-model="type" id="af-submit-app-category"
                      class="py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                <option v-for="type in types" :value="type.value" :key="type.value">
                  {{ type.text }}
                </option>
              </select>
            </div>

            <div class="space-y-2">
              <label for="af-submit-app-project-name"
                     class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">
                Name
              </label>

              <input v-model="name" id="af-submit-app-project-name" type="text"
                     class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                     placeholder="">
            </div>

            <div class="space-y-2">
              <label for="af-submit-project-url"
                     class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">
                Version
              </label>

              <input v-model="version" id="af-submit-project-url" type="text"
                     class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                     placeholder="">
            </div>

            <div class="space-y-2">
              <label for="af-submit-app-description"
                     class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">
                Description
              </label>

              <textarea v-model="description"
                        id="af-submit-app-description"
                        class="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        rows="6"
                        placeholder=""></textarea>
            </div>

            <div class="space-y-2">
              <label for="af-submit-app-upload-images"
                     class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">
                Artifacts
              </label>

              <label for="af-submit-app-upload-images"
                     class="group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-gray-700">
                <input id="af-submit-app-upload-images" name="af-submit-app-upload-images" type="file" class="sr-only">
                <svg class="size-10 mx-auto text-gray-400 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg"
                     width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                        d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z" />
                  <path
                    d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                </svg>
                <span class="mt-2 block text-sm text-gray-800 dark:text-gray-200">
                Browse your device or <span class="group-hover:text-blue-700 text-blue-600">drag 'n drop'</span>
              </span>
                <span class="mt-1 block text-xs text-gray-500">
                Maximum file size is 2 MB
              </span>
              </label>
            </div>
          </div>
          <!-- End Grid -->
        </div>
      </form>
    </template>
  </PageSkeleton>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import PrimaryButton from '@/components/PrimaryButton.vue'
import PageSkeleton from '@/components/PageSkeleton.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'
import { inject, onMounted, ref } from 'vue'
import type ModuleService from '@/services/ModuleService'

const moduleService = inject('moduleService') as ModuleService
const router = useRouter()
const route = useRoute()

const types = [
  {
    text: 'Application',
    value: 'application'
  }, {
    text: 'OS',
    value: 'os'
  }
]

const name = ref('')
const version = ref('')
const type = ref(types[0].value)
const description = ref('')

onMounted(() => {
  const moduleId = route.params.id as string
  moduleService.getById(moduleId).then(module => {
    name.value = module.name
    version.value = module.version
    type.value = module.type
    description.value = module.description
  })
})

const onCancel = () => {
  router.push('/modules')
}

const onSave = async () => {
  await moduleService.create({
    type: type.value,
    name: name.value,
    version: version.value,
    description: description.value,
  });

  await router.push('/modules')
}
</script>
