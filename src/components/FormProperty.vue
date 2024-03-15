<template>
  <div class="flex flex-row items-center justify-between gap-3">
    <FormInput class="flex-grow" label="Key" v-model="key"/>
    <FormInput class="flex-grow" label="Value" v-model="value"/>
    <FormIconSwitch />
    <SecondaryLinkButton label="Delete"/>
  </div>
</template>
<script setup lang="ts">
import FormInput from '@/components/FormInput.vue'
import { ref } from 'vue'
import FormIconSwitch from '@/components/FormIconSwitch.vue'
import SecondaryLinkButton from '@/components/SecondaryLinkButton.vue'

const key = ref<string>()
const value = ref<string>()
</script>
