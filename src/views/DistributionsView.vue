<template>
  <div class="flex flex-row justify-start">
    <PageSkeleton title="Distributions">
      <template #title>
        <div class="flex flex-row items-center justify-start gap-2">
          <h3 class="text-xl dark:text-white">Distributions</h3>
          <Badge>{{ state.distributions.length }}</Badge>
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
            <PrimaryButton label="New distribution" @click.stop="onNewDistributionClicked">
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
              <DataTableHeaderCell>Created At</DataTableHeaderCell>
            </DataTableHeaderRow>
          </template>
          <template #body>
            <template
              v-for="distribution in state.distributions as Distribution[]"
              :key="distribution.instanceId"
            >
              <DataTableBodyRow @click="onDistributionClicked(distribution)">
                <DataTableBodyCell>{{ distribution.name }}</DataTableBodyCell>
                <DataTableBodyCell>{{ distribution.version }}</DataTableBodyCell>
                <DataTableBodyCell><DateTime :value="distribution.createdAt!" /></DataTableBodyCell>
              </DataTableBodyRow>
            </template>
          </template>
        </DataTable>
      </template>
    </PageSkeleton>
  </div>
</template>

<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue'
import PlusIcon from '@/icons/PlusIcon.vue'
import { onMounted, reactive } from 'vue'
import Distribution from '@/models/Distribution'
import { useRouter } from 'vue-router'
import SecondaryButton from '@/components/SecondaryButton.vue'
import SortIcon from '@/icons/SortIcon.vue'
import Badge from '@/components/Badge.vue'
import SearchInput from '@/components/SearchInput.vue'
import FilterIcon from '@/icons/FilterIcon.vue'
import PageSkeleton from '@/components/PageSkeleton.vue'
import DataTableHeaderCell from '@/components/DataTableHeaderCell.vue'
import DataTableBodyCell from '@/components/DataTableBodyCell.vue'
import DataTable from '@/components/DataTable.vue'
import DataTableBodyRow from '@/components/DataTableBodyRow.vue'
import DataTableHeaderRow from '@/components/DataTableHeaderRow.vue'
import DateTime from '@/components/DateTime.vue'

const state = reactive({
  distributions: [] as Distribution[]
})

onMounted(async () => {
  state.distributions = await Distribution.getAll()
})

const router = useRouter()

const onNewDistributionClicked = () => {
  router.push('/distributions/new')
}

const onDistributionClicked = (distribution: Distribution) => {
  router.push(`/distributions/${distribution.id}/edit`)
}
</script>
