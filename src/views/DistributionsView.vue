<template>
  <div class="flex flex-row justify-start">
    <PageSkeleton title="Modules">
      <template #title>
        <div class="flex flex-row items-center justify-start gap-2">
          <h3 class="text-xl dark:text-white">Distributions</h3>
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
            <PrimaryButton label="New distribution" @click.stop="onNewDistributionClicked">
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
  </div>
</template>

<script setup lang="ts">
import DataTable from '@/components/DataTable.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import PlusIcon from '@/icons/PlusIcon.vue'
import DataTableFieldType from '@/models/DataTableFieldType'
import { computed, inject, onMounted, ref } from 'vue'
import type Distribution from '@/models/Distribution'
import type DistributionService from '@/services/DistributionService'
import { useRouter } from 'vue-router'
import SecondaryButton from '@/components/SecondaryButton.vue'
import SortIcon from '@/icons/SortIcon.vue'
import Badge from '@/components/Badge.vue'
import SearchInput from '@/components/SearchInput.vue'
import FilterIcon from '@/icons/FilterIcon.vue'
import PageSkeleton from '@/components/PageSkeleton.vue'

const distributionService = inject('distributionService') as DistributionService

const distributions = ref<Distribution[]>([])

onMounted(() => {
  distributionService.getAll().then(data => {
    distributions.value = data
  })
})

const schema = {
  fields: [
    { name: 'name', title: 'Name', type: DataTableFieldType.Text },
    { name: 'version', title: 'Version', type: DataTableFieldType.Text },
    { name: 'createdAt', title: 'Created At', type: DataTableFieldType.Date },
  ],
};

const records = computed(() => {
  return distributions.value.map((distribution) => {
    return {
      id: distribution.id,
      values: [
        distribution.name,
        distribution.version,
        distribution.createdAt
      ]
    }
  })
})

const router = useRouter()

const onNewDistributionClicked = () => {
  router.push('/distributions/new')
}
</script>
