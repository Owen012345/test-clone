import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/Home.vue'
import Workflow from '@/views/workflow/Workflow.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/workflow',
      name: 'Workflow',
      component: Workflow
    }
  ]
})

export default router
