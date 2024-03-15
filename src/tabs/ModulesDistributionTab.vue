<template>
  <div class="pt-4 pb-4 px-4 sm:pt-2 sm:px-10">
    <div class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
      <div class="col-span-full mt-4">
        <div class="flex flex-row items-center justify-between">
          <div class="flex">
            <div class="flex bg-gray-100 hover:bg-gray-200 rounded-lg transition p-1 dark:bg-gray-700 dark:hover:bg-gray-600">
              <nav class="flex space-x-2" aria-label="Tabs" role="tablist">
                <button type="button" class="hs-tab-active:bg-white hs-tab-active:text-gray-700 hs-tab-active:dark:bg-gray-800 hs-tab-active:dark:text-gray-400 dark:hs-tab-active:bg-gray-800 py-1 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm text-gray-500 hover:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-white active" id="segment-item-1" data-hs-tab="#segment-1" aria-controls="segment-1" role="tab">
                  All
                </button>
                <button type="button" class="hs-tab-active:bg-white hs-tab-active:text-gray-700 hs-tab-active:dark:bg-gray-800 hs-tab-active:dark:text-gray-400 dark:hs-tab-active:bg-gray-800 py-1 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm text-gray-500 hover:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-white" id="segment-item-2" data-hs-tab="#segment-2" aria-controls="segment-2" role="tab">
                  Linked (1)
                </button>
              </nav>
            </div>
          </div>

          <div class="flex flex-row gap-2">
            <SearchInput />
            <SecondaryButton label="Sort by">
              <template #icon>
                <SortIcon />
              </template>
            </SecondaryButton>
            <SecondaryButton label="Filter">
              <template #icon>
                <FilterIcon />
              </template>
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  </div>
  <DataTable2 :schema="schema" :records="records" />
</template>
<script setup lang="ts">
import DataTable from '@/components/DataTable.vue'
import { computed, inject, onMounted, ref } from 'vue'
import type ModuleService from '@/services/ModuleService'
import DataTableFieldType from '@/models/DataTableFieldType'
import type Module from '@/models/Module'
import SecondaryButton from '@/components/SecondaryButton.vue'
import SortIcon from '@/icons/SortIcon.vue'
import SearchInput from '@/components/SearchInput.vue'
import FilterIcon from '@/icons/FilterIcon.vue'
import PlusIcon from '@/icons/PlusIcon.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import DataTable2 from '@/components/DataTable2.vue'

const moduleService = inject('moduleService') as ModuleService

const modules = ref<Module[]>([])

onMounted(() => {
  moduleService.getAll().then(data => {
    modules.value = data
  })
})

const schema = {
  fields: [
    { name: 'name', title: 'Name', type: DataTableFieldType.Text },
    { name: 'version', title: 'Version', type: DataTableFieldType.Text },
    { name: 'type', title: 'Type', type: DataTableFieldType.Text },
    { name: 'createdAt', title: 'Created At', type: DataTableFieldType.Date }
  ]
}

const records = computed(() => {
  return modules.value.map((module) => {
    return {
      id: module.id,
      values: [
        module.name,
        module.version,
        module.type,
        module.createdAt
      ]
    }
  })
})
</script>
