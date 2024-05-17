<template>
  <div class="flex flex-row justify-start">
    <PageSkeleton title="Targets">
      <template #title>
        <div class="flex flex-row items-center justify-start gap-2">
          <h3 class="text-xl dark:text-white">Targets</h3>
          <Badge>{{ state.targets.length }}</Badge>
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
            <PrimaryButton label="New target" @click.stop="onNewTargetClicked">
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
              <DataTableHeaderCell fit-content>ID</DataTableHeaderCell>
              <DataTableHeaderCell>Name</DataTableHeaderCell>
              <DataTableHeaderCell>Created At</DataTableHeaderCell>
            </DataTableHeaderRow>
          </template>
          <template #body>
            <template v-for="target in state.targets" :key="target.instanceId">
              <DataTableBodyRow v-on:click="onTargetClicked(target as Target)">
                <DataTableBodyCell>{{ target.id }}</DataTableBodyCell>
                <DataTableBodyCell highlight>{{ target.name }}</DataTableBodyCell>
                <DataTableBodyCell last><DateTime :value="target.createdAt!" /></DataTableBodyCell>
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
import Target from '@/models/Target'

const state = reactive<{
  targets: Target[]
}>({
  targets: []
})

onMounted(async () => {
  state.targets = await Target.getAll()
})

const router = useRouter()

const onNewTargetClicked = () => {
  router.push('/targets/new')
}

const onTargetClicked = (target: Target) => {
  router.push(`/targets/${target.id}/edit`)
}
</script>
