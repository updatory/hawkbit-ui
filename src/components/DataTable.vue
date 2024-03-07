<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="min-w-full inline-block align-middle">
        <div class="flex-grow">
          <table class="relative min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <DataTableHeader :schema="props.schema" />
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <DataTableRow v-for="record in props.records" :key="record.id" :schema="props.schema" :record="record" :handleRecordClicked="handleRecordClicked"/>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import DataTableRow, { type HandleRecordClicked } from '@/components/DataTableRow.vue'
import DataTableHeader from '@/components/DataTableHeader.vue'
import type DataTableSchema from '@/models/DataTableSchema'
import type { PropType } from 'vue'
import type DataTableRecord from '@/models/DataTableRecord'

const props = defineProps({
  schema: { type: Object as PropType<DataTableSchema>, required: true },
  records: { type: Array as PropType<DataTableRecord[]>, required: true },
  handleRecordClicked: { type: Function as PropType<HandleRecordClicked>, required: true },
});
</script>
