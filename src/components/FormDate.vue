<template>
  <div>
    <div class="relative">
      <input
        :id="inputId"
        :disabled="props.disabled"
        @change="onChange($event)"
        placeholder=""
        type="date"
        :class="{
          'border-red-500': hasError,
          'focus:border-red-500': hasError,
          'focus:ring-red-500': hasError
        }"
        class="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
      />
      <label
        :for="inputId"
        class="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
      >
        {{ props.label }} <span v-if="props.required" class="text-red-400">*</span>
      </label>
    </div>
    <p v-if="hasError" class="text-sm text-red-600 mt-2">
      {{ props.error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { kebabCase } from '@/utils/Strings'
import { computed } from 'vue'

const model = defineModel<number | undefined>({
  required: true
})

const props = defineProps({
  label: { type: String, required: true },
  error: { type: String, required: false },
  required: { type: Boolean, required: false, default: false },
  disabled: { type: Boolean, required: false, default: false }
})

const onChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  model.value = input.valueAsDate?.getTime() || undefined
}

const inputId = computed(() => kebabCase(props.label))

const hasError = computed(() => !!props.error)
</script>
