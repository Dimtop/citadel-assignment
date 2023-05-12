import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import TeamListView from '../views/TeamListView.vue'
import TeamView from '../views/TeamView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { useAppStore } from '../stores/app.store'
import { useAuthStore } from '../stores/auth.store'
import { isStringEmptyOrNullOrUndefined } from '../utils'
import { storeToRefs } from 'pinia'

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
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/teams',
      name: 'teams',
      component: TeamListView
    },
    {
      path: '/teams/:id',
      name: 'team',
      component: TeamView
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

router.beforeEach(async (to) => {
  // clear alert on route change
  const appStore = useAppStore()
  appStore.resetErrorToast()

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuthStore()

  if (authRequired && !authStore.authState) {
    return '/login'
  }
})

export default router
