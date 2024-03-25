// 路由表
const routes = [
  {
    name: 'layout',
    redirect: 'home',
    path: '/',
    component: () => import('@/views/Layout/index.vue'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home/index.vue'),
        icon: 'Operation',
        children: [
          {
            path: 'category',
            icon: 'Operation',
            component: () => import('@/views/Category/index.vue'),
          },
          {
            path: 'product',
            icon: 'Open',
            component: () => import('@/views/Product/index.vue'),
          },
        ],
      },
    ],
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
