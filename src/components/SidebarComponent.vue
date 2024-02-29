<template>
  <div id="application-sidebar" class="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700">
    <div class="px-6">
      <a class="flex-none text-xl font-semibold dark:text-white" href="/" aria-label="Brand">
        <img src="@/assets/logo.png" alt="hawkBit" class="m-auto w-auto h-10" />
      </a>
    </div>

    <nav class="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
      <ul class="space-y-1.5">
        <li>
          <router-link to="/rollouts" class="bg-gray-100 dark:bg-gray-900 flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            <RolloutIcon class="w-6 h-6" />
            Rollouts
          </router-link>
        </li>
        <li>
          <router-link to="/targets" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            <TargetIcon class="w-6 h-6" />
            Targets
          </router-link>
        </li>
        <li>
          <router-link to="/targets" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            <ModuleIcon class="w-6 h-6" />
            Software Modules
          </router-link>
        </li>
        <li>
          <router-link to="/targets" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            <DistributionIcon class="w-6 h-6" />
            Distribution Sets
          </router-link>
        </li>
        <li>
          <router-link to="/targets" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            <ConfigurationIcon class="w-6 h-6" />
            Configuration
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script setup lang="ts">
import DistributionIcon from '@/icons/DistributionIcon.vue'
import ModuleIcon from '@/icons/ModuleIcon.vue'
import TargetIcon from '@/icons/TargetIcon.vue'
import RolloutIcon from '@/icons/RolloutIcon.vue'
import ConfigurationIcon from '@/icons/ConfigurationIcon.vue'
</script>
