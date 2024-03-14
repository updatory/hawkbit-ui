import { createRouter, createWebHistory } from 'vue-router'
import RolloutsView from '@/views/RolloutsView.vue'
import ModulesView from '@/views/ModulesView.vue'
import TargetsView from '@/views/TargetsView.vue'
import DistributionsView from '@/views/DistributionsView.vue'
import NewModuleView from '@/views/NewModuleView.vue'
import EditModuleView from '@/views/EditModuleView.vue'
import NewDistributionView from '@/views/NewDistributionView.vue'

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
      component: DistributionsView,
      children: [
        {
          path: 'new',
          component: NewDistributionView,
          props: {
            backRouteName: 'distributions'
          }
        },
      ]
    },
    {
      path: '/targets',
      name: 'targets',
      component: TargetsView
    },
    {
      path: '/modules/new',
      component: NewModuleView,
      props: {
        backRouteName: 'modules'
      }
    },
    {
      path: '/modules/:id/edit',
      component: EditModuleView,
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
