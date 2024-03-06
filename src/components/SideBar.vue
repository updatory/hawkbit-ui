<template>
  <div id="application-sidebar" class="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700">
    <div class="px-6">
      <a class="flex-none text-xl font-semibold dark:text-white" href="#" aria-label="hawkBit">hawkBit</a>
    </div>

    <nav class="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
      <ul class="space-y-1.5">
        <SideBarLink label="Home" href="/">
          <template #icon>
            <HomeIcon />
          </template>
        </SideBarLink>
        <SideBarLink label="Rollouts" href="/rollouts">
          <template #icon>
            <RolloutIcon />
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
        <SideBarLink label="Distribution Sets" href="/distributions">
          <template #icon>
            <DistributionIcon />
          </template>
        </SideBarLink>
        <SideBarLink label="Settings" href="/settings">
          <template #icon>
            <SettingsIcon />
          </template>
        </SideBarLink>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import DistributionIcon from '@/icons/DistributionIcon.vue'
import ModuleIcon from '@/icons/ModuleIcon.vue'
import TargetIcon from '@/icons/TargetIcon.vue'
import RolloutIcon from '@/icons/RolloutIcon.vue'
import SettingsIcon from '@/icons/SettingsIcon.vue'
import SideBarLink from '@/components/SideBarLink.vue'
import HomeIcon from '@/icons/HomeIcon.vue'
</script>
