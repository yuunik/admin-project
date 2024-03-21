// 路由表
const routes = [
  {
    name: 'layout',
    path: '/',
    component: () => import('@/views/Layout/index.vue'),
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login/index.vue'),
  },
  {
    name: 'error',
    path: '/error',
    component: () => import('@/views/Error/index.vue'),
  },
  {
    // 任意路由
    name: 'otherPath',
    path: '/:patchName',
    component: () => import('@/views/Error/index.vue'),
  },
]

export default routes
