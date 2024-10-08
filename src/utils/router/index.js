import { createRouter, createWebHistory } from 'vue-router'
import { publicRoute, protectedRoute } from './menu'
import store from '@/stores'

const routes = publicRoute.concat(protectedRoute)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

// router guards
router.beforeEach(async (to, from, next) => {
  let auth = store.getters['auth/user']

  auth = true
  if (auth) {
    next() // 인증된 사용자일 경우, 그대로 진행
  } else if (to.path !== '/auth/login') {
    next('/auth/login') // 인증되지 않은 사용자일 경우, 로그인 페이지로 리다이렉트
  } else {
    next() // 로그인 페이지로의 접근은 허용
  }
})

export default router
