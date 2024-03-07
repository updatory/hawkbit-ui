<template>
  <tr class="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
    <td class="ps-10 pe-1 py-4 w-1 text-nowrap">
      <div class="flex items-center h-5">
        <input id="hs-table-checkbox-1" type="checkbox" class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800">
        <label for="hs-table-checkbox-1" class="sr-only">Checkbox</label>
      </div>
    </td>
    <template v-for="cell in cells" :key="cell.id">
      <td :class="{'pe-10': cell.last}" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
        {{ cell.value }}
      </td>
    </template>
  </tr>
</template>

<script setup lang="ts">
import type DataTableSchema from '@/models/DataTableSchema'
import { computed, type PropType } from 'vue'
import type DataTableRecord from '@/models/DataTableRecord'
import type { DataTableCell } from '@/models/DataTableCell'

const props = defineProps({
  schema: { type: Object as PropType<DataTableSchema>, required: true },
  record: { type: Object as PropType<DataTableRecord>, required: true }
});

const cells = computed(() => {
  return props.record.values.map((value, index) => {
    return {
      id: `${props.record.id}-${index}`,
      value: value,
      type: props.schema.fields[index].type,
      last: index === props.record.values.length - 1
    } as DataTableCell;
  })
});
</script>

