<template>
  <input v-model="model"
         :id="inputId"
         type="checkbox"
         class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
         :disabled="props.disabled">
  <label :for="inputId"
         class="text-sm text-gray-500 ms-3 dark:text-gray-400">
    {{ props.label }}
  </label>
</template>

<script setup lang="ts">
import { kebabCase } from '@/utils/Strings'
import { computed } from 'vue'

const model = defineModel<boolean | undefined>({
  required: true
})

const props = defineProps({
  label: { type: String, required: true },
  disabled: { type: Boolean, required: false, default: false },
})

const inputId = computed(() => kebabCase(props.label))
</script>
