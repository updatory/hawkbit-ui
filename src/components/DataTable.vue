<template>
  <div class="flex flex-col h-screen">
    <div class="overflow-x-auto">
      <div class="min-w-full inline-block align-middle">
        <div class="flex-grow">
          <table class="relative min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <DataTableHeader :schema="schema" />
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <DataTableRow v-for="n in 100" :key="n" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import DataTableRow from '@/components/DataTableRow.vue'
import DataTableHeader from '@/components/DataTableHeader.vue'
import type DataTableSchema from '@/models/DataTableSchema'
import type { PropType } from 'vue'

const props = defineProps({
  schema: { type: Object as PropType<DataTableSchema>, required: true }
});
</script>
