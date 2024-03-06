<template>
  <div id="application-sidebar" class="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700">
    <div class="h-full flex flex-col justify-between px-6 py-4">
      <div class="justify-start">
        <div class="pb-6 pt-1">
          <a class="flex-none items-center text-xl font-semibold dark:text-white" href="#" aria-label="hawkBit">hawkBit</a>
        </div>

        <ul class="space-y-1.5">
          <SideBarLink label="Rollouts" href="/rollouts">
            <template #icon>
              <RolloutIcon />
            </template>
          </SideBarLink>
          <SideBarLink label="Distribution Sets" href="/distributions">
            <template #icon>
              <DistributionIcon />
            </template>
          </SideBarLink>
          <SideBarLink label="Targets" href="/targets">
            <template #icon>
              <TargetIcon />
            </template>
          </SideBarLink>
          <SideBarLink label="Software Modules" href="/modules">
            <template #icon>
              <ModuleIcon />
            </template>
          </SideBarLink>
          <SideBarLink label="Artifacts" href="/artifacts">
            <template #icon>
              <ArtifactIcon />
            </template>
          </SideBarLink>
        </ul>
      </div>

      <ul>
        <SideBarLink label="admin" href="/settings">
          <template #icon>
            <UserIcon />
          </template>
        </SideBarLink>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import DistributionIcon from '@/icons/DistributionIcon.vue'
import ModuleIcon from '@/icons/ModuleIcon.vue'
import TargetIcon from '@/icons/TargetIcon.vue'
import RolloutIcon from '@/icons/RolloutIcon.vue'
import UserIcon from '@/icons/UserIcon.vue'
import SideBarLink from '@/components/SideBarLink.vue'
import ArtifactIcon from '@/icons/ArtifactIcon.vue'
</script>
