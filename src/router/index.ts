import { createRouter, createWebHistory } from 'vue-router'
import RolloutsView from '@/views/RolloutsView.vue'
import ModulesView from '@/views/ModulesView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/rollouts',
      name: 'rollouts',
      component: RolloutsView
    },
    {
      path: '/modules',
      name: 'modules',
      component: ModulesView
    }
  ]
})

export default router
