<template>
  <div class="w-full lg:ps-64">
    <PageHeader title="Modules">
      <template #actions>
        <PrimaryButton label="New module" @click.stop="onNewModuleClicked">
          <template #icon>
            <PlusIcon />
          </template>
        </PrimaryButton>
      </template>
    </PageHeader>
    <DataTable :schema="schema" :records="records" />
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
