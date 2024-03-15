<template>
  <div class="border-r h-dvh min-w-96 bg-white">
    <PageHeader title="Details">
      <template #actions>
        <IconButton>
          <template #icon>
            <CloseIcon class="flex-shrink-0 size-5" />
          </template>
        </IconButton>
      </template>
    </PageHeader>
    <div>
      <div class="border-b border-gray-200 dark:border-gray-700">
        <nav class="flex space-x-2" aria-label="Tabs" role="tablist">
          <button type="button" class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-3 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500 active" id="tabs-with-underline-item-1" data-hs-tab="#tabs-with-underline-1" aria-controls="tabs-with-underline-1" role="tab">
            Details
          </button>
          <button type="button" class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-3 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500" id="tabs-with-underline-item-2" data-hs-tab="#tabs-with-underline-2" aria-controls="tabs-with-underline-2" role="tab">
            Description
          </button>
          <button type="button" class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-3 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500" id="tabs-with-underline-item-3" data-hs-tab="#tabs-with-underline-3" aria-controls="tabs-with-underline-3" role="tab">
            Metadata
          </button>
          <button type="button" class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-3 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500" id="tabs-with-underline-item-3" data-hs-tab="#tabs-with-underline-3" aria-controls="tabs-with-underline-3" role="tab">
            Files
          </button>
        </nav>
      </div>

      <div class="mt-3">
        <div id="tabs-with-underline-1" role="tabpanel" aria-labelledby="tabs-with-underline-item-1">
          <p class="text-gray-500 dark:text-gray-400">
            This is the <em class="font-semibold text-gray-800 dark:text-gray-200">first</em> item's tab body.
          </p>
        </div>
        <div id="tabs-with-underline-2" class="hidden" role="tabpanel" aria-labelledby="tabs-with-underline-item-2">
          <p class="text-gray-500 dark:text-gray-400">
            This is the <em class="font-semibold text-gray-800 dark:text-gray-200">second</em> item's tab body.
          </p>
        </div>
        <div id="tabs-with-underline-3" class="hidden" role="tabpanel" aria-labelledby="tabs-with-underline-item-3">
          <p class="text-gray-500 dark:text-gray-400">
            This is the <em class="font-semibold text-gray-800 dark:text-gray-200">third</em> item's tab body.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import PlusIcon from '@/icons/PlusIcon.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import PageHeader from '@/components/PageHeader.vue'
import IconButton from '@/components/IconButton.vue'
import BackIcon from '@/icons/BackIcon.vue'
import CloseIcon from '@/icons/CloseIcon.vue'
</script>
