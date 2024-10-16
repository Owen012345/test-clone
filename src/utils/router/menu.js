export const publicRoute = [
  {
    path: '/*',
    component: () => import('@/views/public/NotFound.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login'
    },
    component: () => import('@/views/public/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: 'Register'
    },
    component: () => import('@/views/public/Register.vue')
  }
]

export const protectedRoute = [
  {
    redirect: '/workflow',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: 'Home',
          group: 'apps'
        },
        component: () => import('@/views/home/Home.vue')
      },
      {
        path: '/myspace',
        name: 'myspace',
        meta: {
          title: 'My Space',
          group: 'apps'
        },
        component: () => import('@/views/myspace/MySpace.vue')
      },
      {
        path: '/workflow',
        name: 'workflow',
        meta: {
          title: 'Workflow',
          group: 'apps'
        },
        component: () => import('@/views/workflow/Workflow.vue')
      }
    ]
  }
]
