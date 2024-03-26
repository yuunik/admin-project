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
        meta: {
          title: '首页',
          isShow: true,
        },
      },
    ],
    meta: {
      title: '布局',
      isShow: false,
    },
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login/index.vue'),
    meta: {
      title: '登录',
      isShow: false,
    },
    children: [
      {
        path: 'category',
        component: () => import('@/views/Category/index.vue'),
        meta: {
          title: '分类',
          isShow: true,
        },
      },
      {
        path: 'product',
        component: () => import('@/views/Product/index.vue'),
        meta: {
          title: '产品',
          isShow: true,
        },
      },
    ],
  },
  {
    name: '404',
    path: '/error',
    component: () => import('@/views/Error/index.vue'),
    meta: {
      title: '错误页',
      isShow: false,
    },
  },
  {
    // 任意路由
    name: 'Any',
    path: '/:patchName',
    component: () => import('@/views/Error/index.vue'),
    meta: {
      title: '随机匹配',
      isShow: false,
    },
  },
]

export default routes
