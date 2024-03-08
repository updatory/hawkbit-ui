<template>
  <div class="w-full lg:ps-64">
    <PageHeader :title="props.title" :back-route-name="props.backRouteName">
      <template #actions>
        <slot name="actions"></slot>
      </template>
    </PageHeader>
    <slot name="content"></slot>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'

const props = defineProps({
  title: { type: String, required: true },
  backRouteName: { type: String, required: false },
})
</script>
