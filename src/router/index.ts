import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { isAuthenticated } from '@/services/auth'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    }
  ]
})

router.beforeEach((to, _) => {
  if (!isAuthenticated() && to.name !== 'Login'
  ) {
    return { name: 'Login' }
  }
})

export default router
