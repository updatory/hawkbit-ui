<template>
  <div class="w-full lg:ps-64">
    <PageHeader title="Distributions">
      <template #actions>
        <PrimaryButton label="New distribution" @click.stop="onNewDistributionClicked">
          <template #icon>
            <PlusIcon />
          </template>
        </PrimaryButton>
      </template>
    </PageHeader>
    <DataTable :schema="schema" :records="records" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import DataTable from '@/components/DataTable.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import PlusIcon from '@/icons/PlusIcon.vue'
import DataTableFieldType from '@/models/DataTableFieldType'
import { computed, inject, onMounted, ref } from 'vue'
import type Distribution from '@/models/Distribution'
import type DistributionService from '@/services/DistributionService'
import { useRouter } from 'vue-router'

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
