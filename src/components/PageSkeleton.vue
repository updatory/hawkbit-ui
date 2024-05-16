<template>
  <div class="w-full lg:ps-64 lg:max-w-screen-xl border-r min-h-dvh bg-white">
    <PageHeader :title="props.title" :back-route-name="props.backRouteName">
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #actions>
        <slot name="actions"></slot>
      </template>
      <template #toolbar>
        <slot name="toolbar"></slot>
      </template>
    </PageHeader>
    <slot name="content"></slot>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'

const props = defineProps({
  title: { type: String, required: true },
  backRouteName: { type: String, required: false }
})
</script>
