import { createRouter, createWebHistory } from 'vue-router'
import RolloutsView from '@/views/RolloutsView.vue'
import ModulesView from '@/views/ModulesView.vue'
import ArtifactsView from '@/views/ArtifactsView.vue'
import TargetsView from '@/views/TargetsView.vue'
import DistributionsView from '@/views/DistributionsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'rollouts'
      }
    },
    {
      path: '/rollouts',
      name: 'rollouts',
      component: RolloutsView
    },
    {
      path: '/distributions',
      name: 'distributions',
      component: DistributionsView
    },
    {
      path: '/targets',
      name: 'targets',
      component: TargetsView
    },
    {
      path: '/modules',
      name: 'modules',
      component: ModulesView
    },
    {
      path: '/artifacts',
      name: 'artifacts',
      component: ArtifactsView
    }
  ]
})

export default router
