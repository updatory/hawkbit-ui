<template>
  <div class="flex flex-row justify-start">
    <PageSkeleton title="Target Filters">
      <template #title>
        <div class="flex flex-row items-center justify-start gap-2">
          <h3 class="text-xl dark:text-white">Target Filters</h3>
          <Badge>{{ state.targetFilters.length }}</Badge>
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
            <PrimaryButton label="New filter" @click.stop="onNewTargetClicked">
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
              <DataTableHeaderCell>Created At</DataTableHeaderCell>
            </DataTableHeaderRow>
          </template>
          <template #body>
            <template v-for="targetFilter in state.targetFilters" :key="targetFilter.instanceId">
              <DataTableBodyRow v-on:click="onTargetFilterClicked(targetFilter as TargetFilter)">
                <DataTableBodyCell highlight>{{ targetFilter.name }}</DataTableBodyCell>
                <DataTableBodyCell last
                  ><DateTime :value="targetFilter.createdAt!" />
                </DataTableBodyCell>
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
import TargetFilter from '@/models/TargetFilter'

const state = reactive<{
  targetFilters: TargetFilter[]
}>({
  targetFilters: []
})

onMounted(async () => {
  state.targetFilters = await TargetFilter.getAll()
})

const router = useRouter()

const onNewTargetClicked = () => {
  router.push('/target-filters/new')
}

const onTargetFilterClicked = (targetFilter: TargetFilter) => {
  router.push(`/target-filters/${targetFilter.id}/edit`)
}
</script>
