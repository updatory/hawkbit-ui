<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { authenticate, type UserInfo } from '@/services/auth'
import { type Ref, ref, type UnwrapRef } from 'vue'
import AuthLoader from '@/components/AuthLoader.vue'

const userInfo: Ref<UnwrapRef<null | UserInfo>> = ref(null)

authenticate().then((user) => {
  userInfo.value = user
})
</script>

<template>
  <AuthLoader v-if="!userInfo" />
  <header v-if="userInfo">
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView v-if="userInfo" />
</template>
