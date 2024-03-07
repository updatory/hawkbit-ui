<template>
  <div class="w-full lg:ps-64">
    <PageHeader title="Modules">
      <template #actions>
        <PrimaryButton label="New module" @click.stop="onNewModule">
          <template #icon>
            <PlusIcon />
          </template>
        </PrimaryButton>
      </template>
    </PageHeader>
    <DataTable :schema="schema" :records="records" :handleRecordClicked="handleRecordClicked"/>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import DataTable from '@/components/DataTable.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import PlusIcon from '@/icons/PlusIcon.vue'
import DataTableFieldType from '@/models/DataTableFieldType'
import { useRouter } from 'vue-router'
import { computed, inject, onMounted, ref } from 'vue'
import type ModuleService from '@/services/ModuleService'
import type Module from '@/models/Module'

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
    { name: 'description', title: 'Description', type: DataTableFieldType.Text },
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
        module.description,
        module.createdAt
      ]
    }
  })
})

const router = useRouter()

const onNewModule = () => {
  router.push('/modules/new')
}

const handleRecordClicked = (recordId: string) => {
  router.push(`/modules/${recordId}/edit`)
}
</script>
