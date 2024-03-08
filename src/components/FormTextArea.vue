<template>
  <label :for="textAreaId"
         class="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">
    {{ props.label }}
  </label>

  <textarea v-model="model"
            :id="textAreaId"
            type="text"
            class="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            :rows="props.rows"
            :placeholder="props.placeholder"
            :disabled="props.disabled">
  </textarea>
</template>

<script setup lang="ts">
import { kebabCase } from '@/utils/Strings'
import { computed } from 'vue'

const model = defineModel<string | undefined>({
  required: true
})

const props = defineProps({
  label: { type: String, required: true },
  rows: { type: Number, required: false, default: 6 },
  placeholder: { type: String, required: false, default: '' },
  disabled: { type: Boolean, required: false, default: false },
})

const textAreaId = computed(() => kebabCase(props.label))
</script>
