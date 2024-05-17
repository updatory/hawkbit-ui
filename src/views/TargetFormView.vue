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
              <div class="flex space-x-3">
                <FormInput
                  label="ID"
                  class="flex-grow"
                  v-model="state.target.id"
                  :error="state.target.idError"
                  :disabled="!state.target.isNew"
                  required
                />
                <SecondaryLinkButton label="Copy" @click.stop="copyToClipboard(state.target.id)" />
              </div>
            </div>

            <div class="sm:col-span-6 space-y-2">
              <div class="flex space-x-3">
                <FormInput
                  label="Security Token"
                  class="flex-grow"
                  v-model="state.target.securityToken"
                  :error="state.target.securityTokenError"
                  required
                />
                <SecondaryLinkButton
                  label="Copy"
                  @click.stop="copyToClipboard(state.target.securityToken)"
                />
              </div>
            </div>

            <div class="sm:col-span-6 space-y-2">
              <FormInput
                label="Name"
                v-model="state.target.name"
                :error="state.target.nameError"
                required
              />
            </div>

            <div class="space-y-2 col-span-full">
              <FormTextArea label="Description" v-model="state.target.description" />
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
import FormTextArea from '@/components/FormTextArea.vue'
import FormInput from '@/components/FormInput.vue'
import Target from '@/models/Target'
import SecondaryLinkButton from '@/components/SecondaryLinkButton.vue'

const route = useRoute()
const router = useRouter()

const props = defineProps({
  backRouteName: { type: String, required: true }
})

const title = computed(() => {
  return route.params.id ? 'Edit target' : 'New target'
})

const state = reactive({
  target: new Target({})
})

onMounted(async () => {
  if (typeof route.params.id === 'string') {
    state.target = await Target.getById(route.params.id)
  } else {
    state.target.generateId()
    state.target.generateSecurityToken()
  }
})

onMounted(async () => {})

onUnmounted(() => {})

const onSaveClicked = async () => {
  if (await state.target.validate()) {
    await state.target.save()
    await router.push({ name: props.backRouteName })
  }
}

const copyToClipboard = (value: string | undefined) => {
  if (!value) return
  navigator.clipboard.writeText(value)
}
</script>
