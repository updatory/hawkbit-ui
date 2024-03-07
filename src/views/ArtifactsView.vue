<template>
  <PageSkeleton title="Artifacts">
    <template #actions>
      <PrimaryButton label="New artifacts">
        <template #icon>
          <PlusIcon />
        </template>
      </PrimaryButton>
    </template>
    <template #content>
      <DataTable :schema="schema" :records="records" />
    </template>
  </PageSkeleton>
</template>

<script setup lang="ts">
import DataTable from '@/components/DataTable.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import PlusIcon from '@/icons/PlusIcon.vue'
import DataTableFieldType from '@/models/DataTableFieldType'
import PageSkeleton from '@/components/PageSkeleton.vue'

const schema = {
  fields: [
    { name: 'name', title: 'Name', type: DataTableFieldType.Text },
    { name: 'version', title: 'Version', type: DataTableFieldType.Text },
    { name: 'type', title: 'Type', type: DataTableFieldType.Text },
    { name: 'description', title: 'Description', type: DataTableFieldType.Text },
    { name: 'createdAt', title: 'Created At', type: DataTableFieldType.Date },
  ],
};

const records = [
  {id: '1', values: ['Debian', '12.4 (bookworm)', 'Operating System', 'linux/arm/v5', '2024-03-01 13:23:45']},
];
</script>
