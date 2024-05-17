<template>
  <PageSkeleton title="New rollout" :back-route-name="props.backRouteName">
    <template #content>
      <form>
        <div class="pt-4 p-4 sm:pt-2 sm:p-10">
          <!-- Grid -->
          <div class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
            <div class="col-span-full">
              <h5 class="text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">General</h5>
            </div>

            <div class="sm:col-span-full space-y-2">
              <FormInput
                label="Name"
                v-model="state.rollout.name"
                :error="state.rollout.nameError"
                required
              />
            </div>

            <div class="sm:col-span-2 space-y-2">
              <FormSelect
                label="Type"
                v-model="state.rollout.type"
                :options="typeOptions"
                required
              />
            </div>

            <div class="sm:col-span-2 space-y-2">
              <FormDate label="Start At" v-model="state.rollout.startAt" />
            </div>

            <div class="sm:col-span-2 space-y-2">
              <FormDate label="Force Time" v-model="state.rollout.forceTime" />
            </div>

            <div class="col-span-3 space-y-2">
              <h5 class="text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">
                Target filter <span class="text-red-400">*</span>
              </h5>

              <TargetFilterCard
                v-if="state.rollout.targetFilter"
                :target-filter="state.rollout.targetFilter as TargetFilter"
                class="h-20"
              >
                <template #actions>
                  <SecondaryLinkButton label="Delete" @click.stop="onTargetFilterDeleted" />
                </template>
              </TargetFilterCard>

              <EmptyCard class="h-20" v-if="!state.rollout.targetFilter">
                <template #actions>
                  <SecondaryLinkButton
                    label="Select target filter"
                    @click="onSelectTargetFilterClicked"
                  >
                    <template #icon>
                      <PlusCircleIcon class="w-5 h-5" />
                    </template>
                  </SecondaryLinkButton>
                </template>
              </EmptyCard>

              <p v-if="state.rollout.targetFilterError" class="text-sm text-red-600">
                {{ state.rollout.targetFilterError }}
              </p>
            </div>

            <div class="col-span-3 space-y-2">
              <h5 class="text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">
                Distribution <span class="text-red-400">*</span>
              </h5>

              <DistributionCard
                v-if="state.rollout.distribution"
                :distribution="state.rollout.distribution as Distribution"
                class="h-20"
              >
                <template #actions>
                  <SecondaryLinkButton label="Delete" @click.stop="onDistributionDeleted" />
                </template>
              </DistributionCard>

              <EmptyCard class="h-20" v-if="!state.rollout.distribution">
                <template #actions>
                  <SecondaryLinkButton
                    v-if="!state.rollout.distribution"
                    label="Select distribution"
                    @click="onSelectDistributionClicked"
                  >
                    <template #icon>
                      <PlusCircleIcon class="w-5 h-5" />
                    </template>
                  </SecondaryLinkButton>
                </template>
              </EmptyCard>

              <p v-if="state.rollout.distributionError" class="text-sm text-red-600">
                {{ state.rollout.distributionError }}
              </p>
            </div>

            <div class="space-y-2 col-span-full">
              <FormTextArea label="Description" v-model="state.rollout.description" />
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
  <Modal
    v-if="state.showSelectDistributionModal"
    title="Select distribution"
    :close="onSelectDistributionModalClosed"
  >
    <template #content>
      <div class="flex flex-col space-y-2">
        <DistributionCard
          :distribution="distribution"
          v-for="distribution in state.distributions as Distribution[]"
          :key="distribution.instanceId"
        >
          <template #actions>
            <SecondaryLinkButton
              label="Select"
              @click.stop="onDistributionSelected(distribution)"
            />
          </template>
        </DistributionCard>
      </div>
    </template>
  </Modal>
  <Modal
    v-if="state.showSelectTargetFilterModal"
    title="Select target filter"
    :close="onSelectTargetFilterModalClosed"
  >
    <template #content>
      <div class="flex flex-col space-y-2">
        <TargetFilterCard
          :target-filter="targetFilter"
          v-for="targetFilter in state.targetFilters as TargetFilter[]"
          :key="targetFilter.instanceId"
        >
          <template #actions>
            <SecondaryLinkButton
              label="Select"
              @click.stop="onTargetFilterSelected(targetFilter)"
            />
          </template>
        </TargetFilterCard>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import PrimaryButton from '@/components/PrimaryButton.vue'
import PageSkeleton from '@/components/PageSkeleton.vue'
import { onMounted, reactive } from 'vue'
import FormTextArea from '@/components/FormTextArea.vue'
import FormInput from '@/components/FormInput.vue'
import Distribution from '@/models/Distribution'
import SecondaryLinkButton from '@/components/SecondaryLinkButton.vue'
import Modal from '@/components/Modal.vue'
import PlusCircleIcon from '@/icons/PlusCircleIcon.vue'
import Rollout from '@/models/Rollout'
import TargetFilter from '@/models/TargetFilter'
import DistributionCard from '@/components/DistributionCard.vue'
import TargetFilterCard from '@/components/TargetFilterCard.vue'
import FormSelect from '@/components/FormSelect.vue'
import RolloutType from '@/models/RolloutType'
import FormDate from '@/components/FormDate.vue'
import EmptyCard from '@/components/EmptyCard.vue'

const router = useRouter()

const props = defineProps({
  backRouteName: { type: String, required: true }
})

const typeOptions = [
  { text: 'Soft', value: RolloutType.Soft },
  { text: 'Forced', value: RolloutType.Forced },
  { text: 'Time Forced', value: RolloutType.TimeForced },
  { text: 'Download Only', value: RolloutType.DownloadOnly }
]

const state = reactive<{
  rollout: Rollout
  distributions: Distribution[]
  targetFilters: TargetFilter[]
  showSelectDistributionModal: boolean
  showSelectTargetFilterModal: boolean
}>({
  rollout: new Rollout({}),
  distributions: [],
  targetFilters: [],
  showSelectDistributionModal: false,
  showSelectTargetFilterModal: false
})

onMounted(async () => {
  state.distributions = await Distribution.getAll()
  state.targetFilters = await TargetFilter.getAll()
})

const onSaveClicked = async () => {
  if (await state.rollout.validate()) {
    await state.rollout.save()
    await router.push({ name: props.backRouteName })
  }
}

const onSelectDistributionClicked = () => {
  state.showSelectDistributionModal = true
}

const onSelectDistributionModalClosed = () => {
  state.showSelectDistributionModal = false
}

const onDistributionDeleted = () => {
  state.rollout.distribution = undefined
}

const onDistributionSelected = (distribution: Distribution) => {
  state.rollout.distribution = distribution
  state.showSelectDistributionModal = false
}

const onSelectTargetFilterModalClosed = () => {
  state.showSelectTargetFilterModal = false
}

const onSelectTargetFilterClicked = () => {
  state.showSelectTargetFilterModal = true
}

const onTargetFilterSelected = (targetFilter: TargetFilter) => {
  state.rollout.targetFilter = targetFilter
  state.showSelectTargetFilterModal = false
}

const onTargetFilterDeleted = () => {
  state.rollout.targetFilter = undefined
}
</script>
