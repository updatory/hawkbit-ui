<template>
  <div class="hs-overlay size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto open">
    <div class="hs-overlay-open:opacity-100 my-0 mx-0 sm:max-w-lg sm:w-full sm:ms-auto sm:me-4 sm:mt-4 h-full sm:h-[calc(100%-2rem)]">
      <div
        class="max-h-full overflow-hidden flex flex-col bg-white border shadow-sm sm:rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
        <div class="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
          <h3 class="font-bold text-gray-800 dark:text-white">
            {{ props.title }}
          </h3>
          <button type="button"
                  class="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  @click.stop="onBack">
            <span class="sr-only">Close</span>
            <CloseIcon class="flex-shrink-0 size-4" />
          </button>
        </div>
        <div class="p-4 overflow-y-auto h-dvh">
          <slot name="content"></slot>
        </div>
        <Stepper class="px-4"></Stepper>
        <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </div>
  <!--  Backdrop-->
  <div style="z-index: 79;" data-hs-overlay-backdrop-template=""
       class="transition duration fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-opacity-80 hs-overlay-backdrop"></div>
</template>
<script setup lang="ts">

import { useRouter } from 'vue-router'

const router = useRouter()

import CloseIcon from '@/icons/CloseIcon.vue'
import Stepper from '@/components/Stepper.vue'

const props = defineProps({
  title: { type: String, required: true },
  backRouteName: { type: String, required: true },
})

const onBack = () => {
  if (props.backRouteName) {
    router.push({ name: props.backRouteName })
  }
}
</script>
