<template>
  <tr @click.stop="$emit('click')" class="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
    <slot></slot>
  </tr>
</template>
<script setup lang="ts">
defineEmits(['click'])
</script>
