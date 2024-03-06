<template>
  <div class="w-full lg:ps-64">
    <PageHeader title="Software Modules">
      <template #actions>
        <PrimaryButton label="New module">
          <template #icon>
            <PlusIcon />
          </template>
        </PrimaryButton>
      </template>
    </PageHeader>
    <DataTable :schema="schema" />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import DataTable from '@/components/DataTable.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import PlusIcon from '@/icons/PlusIcon.vue'

const schema = {
  fields: [
    { id: 1, description: 'Name' },
    { id: 2, description: 'Version' },
    { id: 3, description: 'Type' },
    { id: 4, description: 'Description' },
    { id: 5, description: 'Created At' },
  ],
};
</script>
