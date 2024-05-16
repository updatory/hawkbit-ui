<template>
  <div class="flex flex-row justify-start">
    <PageSkeleton title="Modules">
      <template #title>
        <div class="flex flex-row items-center justify-start gap-2">
          <h3 class="text-xl dark:text-white">Modules</h3>
          <Badge>{{ state.modules.length }}</Badge>
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
        <DataTable>
          <template #header>
            <DataTableHeaderRow>
              <DataTableHeaderCell>Name</DataTableHeaderCell>
              <DataTableHeaderCell>Version</DataTableHeaderCell>
              <DataTableHeaderCell>Type</DataTableHeaderCell>
              <DataTableHeaderCell>Created At</DataTableHeaderCell>
            </DataTableHeaderRow>
          </template>
          <template #body>
            <template v-for="module in state.modules" :key="module.instanceId">
              <DataTableBodyRow v-on:click="onModuleClicked(module as Module)">
                <DataTableBodyCell highlight>{{ module.name }}</DataTableBodyCell>
                <DataTableBodyCell>{{ module.version }}</DataTableBodyCell>
                <DataTableBodyCell>{{ module.type }}</DataTableBodyCell>
                <DataTableBodyCell last><DateTime :value="module.createdAt!" /></DataTableBodyCell>
              </DataTableBodyRow>
            </template>
          </template>
        </DataTable>
      </template>
    </PageSkeleton>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue'
import PlusIcon from '@/icons/PlusIcon.vue'
import { useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue'
import Module from '@/models/Module'
import PageSkeleton from '@/components/PageSkeleton.vue'
import SearchInput from '@/components/SearchInput.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'
import FilterIcon from '@/icons/FilterIcon.vue'
import SortIcon from '@/icons/SortIcon.vue'
import Badge from '@/components/Badge.vue'
import DataTableHeaderRow from '@/components/DataTableHeaderRow.vue'
import DataTableHeaderCell from '@/components/DataTableHeaderCell.vue'
import DataTableBodyCell from '@/components/DataTableBodyCell.vue'
import DataTable from '@/components/DataTable.vue'
import DataTableBodyRow from '@/components/DataTableBodyRow.vue'
import DateTime from '@/components/DateTime.vue'

const state = reactive<{
  modules: Module[]
}>({
  modules: []
})

onMounted(async () => {
  state.modules = await Module.getAll()
})

const router = useRouter()

const onNewModuleClicked = () => {
  router.push('/modules/new')
}

const onModuleClicked = (module: Module) => {
  router.push(`/modules/${module.id}/edit`)
}
</script>
