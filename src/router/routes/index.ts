// 路由表
const routes = [
  {
    name: 'layout',
    redirect: 'home',
    path: '/',
    component: () => import('@/views/Layout/index.vue'),
    children: [
      {
        path: '/home',
        component: () => import('@/views/Home/index.vue'),
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
    component: () => import('@/views/Login/index.vue'),
    meta: {
      title: '登录',
      isShow: false,
    },
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
  {
    name: 'Screen',
    path: '/screen',
    component: () => import('@/views/Screen/index.vue'),
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
    component: () => import('@/views/Layout/index.vue'),
    children: [
      {
        name: 'User',
        path: '/acl/user',
        component: () => import('@/views/Acl/User/index.vue'),
        meta: {
          icon: 'User',
          isShow: true,
          title: '用户管理',
        },
      },
      {
        name: 'Role',
        path: '/acl/role',
        component: () => import('@/views/Acl/Role/index.vue'),
        meta: {
          icon: 'Avatar',
          isShow: true,
          title: '角色管理',
        },
      },
      {
        name: 'Permission',
        path: '/acl/permission',
        component: () => import('@/views/Acl/Permission/index.vue'),
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
    component: () => import('@/views/Layout/index.vue'),
    children: [
      {
        name: 'Trademark',
        path: '/product/trademark',
        component: () => import('@/views/Product/Trademark/index.vue'),
        meta: {
          icon: 'ShoppingCartFull',
          isShow: true,
          title: '品牌管理',
        },
      },
      {
        name: 'Attr',
        path: '/product/attr',
        component: () => import('@/views/Product/Attr/index.vue'),
        meta: {
          icon: 'ChromeFilled',
          isShow: true,
          title: '属性管理',
        },
      },
      {
        name: 'Spu',
        path: '/product/spu',
        component: () => import('@/views/Product/Spu/index.vue'),
        meta: {
          icon: 'Calendar',
          isShow: true,
          title: 'SPU管理',
        },
      },
      {
        name: 'Sku',
        path: '/product/sku',
        component: () => import('@/views/Product/Sku/index.vue'),
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
