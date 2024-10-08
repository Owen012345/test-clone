import { createRouter, createWebHistory } from 'vue-router'
import { publicRoute, protectedRoute } from './menu'
import store from '@/stores'

const routes = publicRoute.concat(protectedRoute)

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes: routes
})

// router guards
router.beforeEach(async (to, from, next) => {
  const auth = store.getters['auth/getUser']

  // 인증된 사용자일 경우
  if (auth) {
    // 로그인 페이지 접근 차단
    if (to.path === '/login') {
      next('/home') // 로그인 후 홈으로 리다이렉트
    } else {
      next() // 인증된 경우, 그대로 진행
    }
  } else {
    // 인증되지 않은 경우
    if (to.path !== '/login') {
      next('/login') // 로그인 페이지로 리다이렉트
    } else {
      next() // 로그인 페이지로의 접근은 허용
    }
  }
})

export default router
