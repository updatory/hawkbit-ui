<template>
  {{ new Date(props.value).toLocaleDateString() }}
</template>
<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  value: { type: Number, required: true }
})
</script>
