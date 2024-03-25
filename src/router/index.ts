import { createRouter, createWebHistory } from 'vue-router'
import RolloutsView from '@/views/RolloutsView.vue'
import ModulesView from '@/views/ModulesView.vue'
import TargetsView from '@/views/TargetsView.vue'
import DistributionsView from '@/views/DistributionsView.vue'
import NewDistributionView from '@/views/NewDistributionView.vue'
import ModuleFormView from '@/views/ModuleFormView.vue'

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
      path: '/distributions/new',
      component: NewDistributionView,
      props: {
        backRouteName: 'distributions'
      }
    },
    {
      path: '/targets',
      name: 'targets',
      component: TargetsView
    },
    {
      path: '/modules/new',
      component: ModuleFormView,
      props: {
        backRouteName: 'modules'
      }
    },
    {
      path: '/modules/:id/edit',
      component: ModuleFormView,
      props: {
        backRouteName: 'modules'
      }
    },
    {
      path: '/modules',
      name: 'modules',
      component: ModulesView
    }
  ]
})

export default router
