<script setup lang="ts">
import { RouterView } from 'vue-router'
import { authenticate, type UserInfo } from '@/services/auth'
import { type Ref, ref, type UnwrapRef } from 'vue'
import AuthLoader from '@/components/AuthLoader.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'

const userInfo: Ref<UnwrapRef<null | UserInfo>> = ref(null)

authenticate().then((user) => {
  userInfo.value = user
})
</script>

<template>
  <AuthLoader v-if="!userInfo" />
  <template v-if="userInfo">
    <SidebarComponent />
    <div v-if="userInfo" class="w-full">
      <RouterView />
    </div>
  </template>
</template>
