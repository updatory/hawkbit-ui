<template>
  <label :for="selectId"
         class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">
    {{ props.label }} <span v-if="props.required" class="text-red-400">*</span>
  </label>

  <select v-model="model"
          :id="selectId"
          class="py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
          :disabled="props.disabled">
    <option v-for="option in props.options" :value="option.value" :key="option.value">
      {{ option.text }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { kebabCase } from '@/utils/Strings'
import { computed, type PropType } from 'vue'

export interface Option {
  value: string
  text: string
}

const model = defineModel<string | undefined>({
  required: true
})

const props = defineProps({
  label: { type: String, required: true },
  options: { type: Array as PropType<Option[]>, required: true },
  required: { type: Boolean, required: false, default: false },
  disabled: { type: Boolean, required: false, default: false },
})

const selectId = computed(() => kebabCase(props.label))
</script>
