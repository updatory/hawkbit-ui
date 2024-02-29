<template>
  <header class="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 sm:py-4 lg:ps-64 dark:bg-gray-800 dark:border-gray-700">
    <nav class="flex basis-full items-center w-full mx-auto px-4 sm:px-6 md:px-8" aria-label="Global">
      <div class="w-full flex items-center justify-between ms-auto sm:justify-between sm:gap-x-3 sm:order-3">
        <div class="flex flex-row items-center justify-end gap-2">
          <PrimaryButton label="New module">
            <template #icon>
              <PlusIcon />
            </template>
          </PrimaryButton>
          <IconButton label="More">
            <template #icon>
              <MoreHorizontalIcon />
            </template>
          </IconButton>
        </div>

        <div class="flex justify-start gap-2 w-96">
          <SearchInput />
        </div>

        <div class="flex flex-row items-center justify-end gap-2">
          <SecondaryButton label="Filters">
            <template #icon>
              <FilterIcon />
            </template>
          </SecondaryButton>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue'
import IconButton from '@/components/IconButton.vue'
import MoreHorizontalIcon from '@/icons/MoreHorizontalIcon.vue'
import PlusIcon from '@/icons/PlusIcon.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'
import FilterIcon from '@/icons/FilterIcon.vue'
import SearchInput from '@/components/SearchInput.vue'
</script>
