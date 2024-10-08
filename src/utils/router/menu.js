export const publicRoute = [
  {
    path: '/*',
    component: () => import('@/views/public/NotFound.vue')
  },
  {
    path: '/auth/login',
    name: 'login',
    meta: {
      title: 'Login'
    },
    component: () => import('@/views/public/Login.vue')
  },
  {
    path: '/auth/register',
    name: 'register',
    meta: {
      title: 'Register'
    },
    component: () => import('@/views/public/Register.vue')
  }
]

export const protectedRoute = [
  {
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: {
          title: 'home',
          group: 'apps'
        },
        component: () => import('@/views/home/Home.vue')
      },
      {
        path: '/myspace',
        name: 'MySpace',
        meta: {
          title: 'MySpace',
          group: 'apps'
        },
        component: () => import('@/views/myspace/MySpace.vue')
      },
      {
        path: '/workflow',
        name: 'Workflow',
        meta: {
          title: 'workflow',
          group: 'apps'
        },
        component: () => import('@/views/workflow/Workflow.vue')
      }
    ]
  }
]
