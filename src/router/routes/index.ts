// 路由表
const routes = [
  {
    name: 'layout',
    redirect: 'home',
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          isShow: true,
          // 菜单图标
          icon: 'HomeFilled',
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
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      isShow: false,
    },
  },
  {
    name: '404',
    path: '/error',
    component: () => import('@/views/error/index.vue'),
    meta: {
      title: '错误页',
      isShow: false,
    },
  },
  {
    // 任意路由
    name: 'Any',
    path: '/:patchName',
    component: () => import('@/views/error/index.vue'),
    meta: {
      title: '随机匹配',
      isShow: false,
    },
  },
  {
    name: 'Screen',
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      icon: 'Platform',
      isShow: true,
      title: '数据大屏',
    },
  },
  {
    name: 'Acl',
    path: '/acl',
    redirect: '/acl/user',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        name: 'User',
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          icon: 'User',
          isShow: true,
          title: '用户管理',
        },
      },
      {
        name: 'role',
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          icon: 'Avatar',
          isShow: true,
          title: '角色管理',
        },
      },
      {
        name: 'Permission',
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          icon: 'Memo',
          isShow: true,
          title: '菜单管理',
        },
      },
    ],
    meta: {
      icon: 'Lock',
      isShow: true,
      title: '权限管理',
    },
  },
  {
    name: 'Product',
    path: '/product',
    redirect: '/product/trademark',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        name: 'trademark',
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        meta: {
          icon: 'ShoppingCartFull',
          isShow: true,
          title: '品牌管理',
        },
      },
      {
        name: 'Attr',
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: {
          icon: 'ChromeFilled',
          isShow: true,
          title: '属性管理',
        },
      },
      {
        name: 'spu',
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        meta: {
          icon: 'Calendar',
          isShow: true,
          title: 'SPU管理',
        },
      },
      {
        name: 'Sku',
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        meta: {
          icon: 'Orange',
          isShow: true,
          title: 'SKU管理',
        },
      },
    ],
    meta: {
      icon: 'ShoppingBag',
      isShow: true,
      title: '商品管理',
    },
  },
]

export default routes
