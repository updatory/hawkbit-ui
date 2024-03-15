<template>
  <thead>
  <tr>
    <template v-for="(cell, index) in cells" :key="cell.id">
      <th :class="{'ps-10': index === 0}" class="sticky top-0 bg-gray-50 dark:bg-gray-700 px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase" scope="col" >
        {{ cell.value }}
      </th>
    </template>

    <th class="pe-10 sticky top-0 bg-gray-50 dark:bg-gray-700 px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase" scope="col" >

      <!--      <div class="flex items-center h-5">-->
      <!--        <input id="hs-table-checkbox-all" type="checkbox" class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800">-->
      <!--        <label for="hs-table-checkbox-all" class="sr-only">Checkbox</label>-->
      <!--      </div>-->
      Actions
    </th>
  </tr>
  </thead>
</template>
<script setup lang="ts">
import { computed, type PropType } from 'vue'
import type DataTableSchema from '@/models/DataTableSchema'
import type { DataTableCell } from '@/models/DataTableCell'
import DataTableFieldType from '@/models/DataTableFieldType'

const props = defineProps({
  schema: { type: Object as PropType<DataTableSchema>, required: true }
});

const cells = computed(() => {
  return props.schema.fields.map((field, index) => {
    return {
      id: field.name,
      value: field.title,
      type: DataTableFieldType.Text,
      last: index === props.schema.fields.length - 1
    } as DataTableCell;
  })
});
</script>
