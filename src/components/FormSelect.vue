<template>
  <div class="relative">
    <select v-model="model" :id="selectId" :disabled="props.disabled"
            class="peer p-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
              focus:pt-6
              focus:pb-2
              [&:not(:placeholder-shown)]:pt-6
              [&:not(:placeholder-shown)]:pb-2
              autofill:pt-6
              autofill:pb-2">
      <option v-for="option in props.options" :value="option.value" :key="option.value">
        {{ option.text }}
      </option>

    </select>
    <label :for="selectId"
           class="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs
            peer-focus:-translate-y-1.5
            peer-focus:text-gray-500
            peer-[:not(:placeholder-shown)]:text-xs
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-gray-500">
      {{ props.label }} <span v-if="props.required" class="text-red-400">*</span>
    </label>
  </div>
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
