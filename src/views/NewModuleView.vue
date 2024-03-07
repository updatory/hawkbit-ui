<template>
  <PageSkeleton title="New module">
    <template #actions>
      <div class="flex flex-row items-center gap-2">
        <SecondaryButton label="Cancel" @click.stop="onCancel" />
        <PrimaryButton label="Save" />
      </div>
    </template>
    <template #content>
      Lorem ipsum
    </template>
  </PageSkeleton>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import PrimaryButton from '@/components/PrimaryButton.vue'
import PageSkeleton from '@/components/PageSkeleton.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'

const router = useRouter();

const onCancel = () => {
  router.push('/modules');
}
</script>
