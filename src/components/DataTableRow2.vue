<template>
  <tr @click.stop="onClick"
      class="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" >
    <template v-for="(cell, index) in cells" :key="cell.id">
      <td :class="{'ps-10': index === 0, 'text-gray-800': index === 0}" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
        <span v-if="cell.type === DataTableFieldType.Date">
          {{ new Date(cell.value).toLocaleDateString() }}
        </span>
        <span v-else>
          {{ cell.value }}
        </span>
      </td>
    </template>
    <td class="pe-10 px-6 py-4 text-end whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
      <PrimaryLinkButton>Link</PrimaryLinkButton>

      <!--      <div class="flex items-center h-5">-->
      <!--        <input type="checkbox"-->
      <!--               class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800">-->
      <!--      </div>-->
    </td>
  </tr>
</template>

<script setup lang="ts">
import type DataTableSchema from '@/models/DataTableSchema'
import { computed, type PropType } from 'vue'
import type DataTableRecord from '@/models/DataTableRecord'
import type { DataTableCell } from '@/models/DataTableCell'
import useEmitter from '@/hooks/useEmitter'
import PlusCircleIcon from '@/icons/PlusCircleIcon.vue'
import SecondaryLinkButton from '@/components/SecondaryLinkButton.vue'
import PrimaryLinkButton from '@/components/PrimaryLinkButton.vue'
import DataTableFieldType from '@/models/DataTableFieldType'

const emitter = useEmitter();

const props = defineProps({
  schema: { type: Object as PropType<DataTableSchema>, required: true },
  record: { type: Object as PropType<DataTableRecord>, required: true },
});

const onClick = () => {
  emitter.emit('dataTableRecordClicked', {
    recordId: props.record.id
  });
};

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

