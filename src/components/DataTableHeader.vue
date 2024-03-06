<template>
  <thead>
  <tr>
    <th scope="col" class="sticky top-0 bg-gray-50 dark:bg-gray-700 py-3 ps-10 w-1 text-nowrap">
      <div class="flex items-center h-5">
        <input id="hs-table-checkbox-all" type="checkbox" class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800">
        <label for="hs-table-checkbox-all" class="sr-only">Checkbox</label>
      </div>
    </th>
    <th scope="col" class="sticky top-0 bg-gray-50 dark:bg-gray-700 px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase align-baseline">
      Name
    </th>
    <th scope="col" class="sticky top-0 bg-gray-50 dark:bg-gray-700 px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase align-baseline">
      Version
    </th>
    <th scope="col" class="sticky top-0 bg-gray-50 dark:bg-gray-700 px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase align-baseline">
      Type
    </th>
    <th scope="col" class="sticky top-0 bg-gray-50 dark:bg-gray-700 px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase align-baseline">
      Description
    </th>
    <th scope="col" class="sticky top-0 bg-gray-50 dark:bg-gray-700 pe-10 px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase align-baseline">
      Created At
    </th>
  </tr>
  </thead>
</template>
<script setup lang="ts">
import DataTableRow from '@/components/DataTableRow.vue'
</script>
