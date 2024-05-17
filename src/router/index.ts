import { createRouter, createWebHistory } from 'vue-router'
import ModulesView from '@/views/ModulesView.vue'
import DistributionsView from '@/views/DistributionsView.vue'
import ModuleFormView from '@/views/ModuleFormView.vue'
import DistributionFormView from '@/views/DistributionFormView.vue'
import TargetsView from '@/views/TargetsView.vue'
import TargetFormView from '@/views/TargetFormView.vue'
import TargetFiltersView from '@/views/TargetFiltersView.vue'
import TargetFilterFormView from '@/views/TargetFilterFormView.vue'
import RolloutsView from '@/views/RolloutsView.vue'
import RolloutFormView from '@/views/RolloutFormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'modules'
      }
    },
    {
      path: '/rollouts',
      name: 'rollouts',
      component: RolloutsView
    },
    {
      path: '/rollouts/new',
      component: RolloutFormView,
      props: {
        backRouteName: 'rollouts'
      }
    },
    {
      path: '/distributions',
      name: 'distributions',
      component: DistributionsView
    },
    {
      path: '/distributions/new',
      component: DistributionFormView,
      props: {
        backRouteName: 'distributions'
      }
    },
    {
      path: '/distributions/:id/edit',
      component: DistributionFormView,
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
      path: '/targets/new',
      component: TargetFormView,
      props: {
        backRouteName: 'targets'
      }
    },
    {
      path: '/targets/:id/edit',
      component: TargetFormView,
      props: {
        backRouteName: 'targets'
      }
    },
    {
      path: '/target-filters',
      name: 'targetFilters',
      component: TargetFiltersView
    },
    {
      path: '/target-filters/new',
      component: TargetFilterFormView,
      props: {
        backRouteName: 'targetFilters'
      }
    },
    {
      path: '/target-filters/:id/edit',
      component: TargetFilterFormView,
      props: {
        backRouteName: 'targetFilters'
      }
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
