<script setup lang="ts">
import { RouterView } from 'vue-router'
import { authenticate, type UserInfo } from '@/services/auth'
import { type Ref, ref, type UnwrapRef } from 'vue'
import AuthLoader from '@/components/AuthLoader.vue'
import SideBar from '@/components/SideBar.vue'

const userInfo: Ref<UnwrapRef<null | UserInfo>> = ref(null)

authenticate().then((user) => {
  userInfo.value = user
})
</script>

<template>
  <AuthLoader v-if="!userInfo" />
  <template v-if="userInfo">
    <SideBar />
    <div v-if="userInfo" class="w-full h-full">
      <RouterView />
    </div>
  </template>
</template>
