<template>
  <div class="flex flex-row justify-start">
    <PageSkeleton title="Modules">
      <template #title>
        <div class="flex flex-row items-center justify-start gap-2">
          <h3 class="text-xl dark:text-white">Modules</h3>
          <Badge>21</Badge>
        </div>
      </template>
      <template #toolbar>
        <div class="flex flex-row items-center justify-between mt-4">
          <SearchInput />
          <div class="flex flex-row gap-2">
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
            <PrimaryButton label="New module" @click.stop="onNewModuleClicked">
              <template #icon>
                <PlusIcon />
              </template>
            </PrimaryButton>
          </div>
        </div>
      </template>
      <template #content>
        <DataTable :schema="schema" :records="records" />
      </template>
    </PageSkeleton>
    <router-view />
  </div>

</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import DataTable from '@/components/DataTable.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import PlusIcon from '@/icons/PlusIcon.vue'
import DataTableFieldType from '@/models/DataTableFieldType'
import { useRouter } from 'vue-router'
import { computed, inject, onMounted, onUnmounted, ref } from 'vue'
import type ModuleService from '@/services/ModuleService'
import type Module from '@/models/Module'
import useEmitter from '@/hooks/useEmitter'
import type DataTableRecordClicked from '@/events/DataTableRecordClicked'
import PageSkeleton from '@/components/PageSkeleton.vue'
import SearchInput from '@/components/SearchInput.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'
import FilterIcon from '@/icons/FilterIcon.vue'
import SortIcon from '@/icons/SortIcon.vue'
import IconButton from '@/components/IconButton.vue'
import BackIcon from '@/icons/BackIcon.vue'
import Badge from '@/components/Badge.vue'

const emitter = useEmitter();

const moduleService = inject('moduleService') as ModuleService

const modules = ref<Module[]>([])

onMounted(() => {
  emitter.on('dataTableRecordClicked', onDataTableRecordClicked);

  moduleService.getAll().then(data => {
    modules.value = data
  })
})

onUnmounted(() => {
  emitter.off('dataTableRecordClicked', onDataTableRecordClicked);
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

const router = useRouter()

const onNewModuleClicked = () => {
  router.push('/modules/new')
}

const onDataTableRecordClicked = (event: DataTableRecordClicked) => {
  router.push(`/modules/${event.recordId}/edit`)
}
</script>
