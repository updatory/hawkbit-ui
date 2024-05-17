<template>
  <PageSkeleton :title="title" :back-route-name="props.backRouteName">
    <template #content>
      <form>
        <div class="pt-4 p-4 sm:pt-2 sm:p-10">
          <!-- Grid -->
          <div class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
            <div class="col-span-full">
              <h5 class="text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">General</h5>
            </div>

            <div class="sm:col-span-6 space-y-2">
              <FormInput
                label="Name"
                v-model="state.targetFilter.name"
                :error="state.targetFilter.nameError"
                required
              />
            </div>

            <div class="sm:col-span-6 space-y-2">
              <FormInput
                label="Query"
                v-model="state.targetFilter.query"
                :error="state.targetFilter.queryError"
                required
              />
            </div>
          </div>
          <!-- End Grid -->

          <div class="flex justify-end py-3">
            <PrimaryButton class="" label="Save" @click.stop="onSaveClicked" />
          </div>
        </div>
      </form>
    </template>
  </PageSkeleton>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import PrimaryButton from '@/components/PrimaryButton.vue'
import PageSkeleton from '@/components/PageSkeleton.vue'
import { computed, onMounted, onUnmounted, reactive } from 'vue'
import FormInput from '@/components/FormInput.vue'
import TargetFilter from '@/models/TargetFilter'

const route = useRoute()
const router = useRouter()

const props = defineProps({
  backRouteName: { type: String, required: true }
})

const title = computed(() => {
  return route.params.id ? 'Edit target filter' : 'New target filter'
})

const state = reactive({
  targetFilter: new TargetFilter({})
})

onMounted(async () => {
  if (typeof route.params.id === 'string') {
    state.targetFilter = await TargetFilter.getById(route.params.id)
  }
})

onMounted(async () => {})

onUnmounted(() => {})

const onSaveClicked = async () => {
  if (await state.targetFilter.validate()) {
    await state.targetFilter.save()
    await router.push({ name: props.backRouteName })
  }
}
</script>
