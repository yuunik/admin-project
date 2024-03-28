import { createRouter, createWebHistory } from 'vue-router'
// 引入进度条插件
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error 进度条管理包无类型申明文件
import nprogress from 'nprogress'
import { ElMessage } from 'element-plus'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 引入路由表
import routes from './routes'
import { useUserStore } from '@/store'
import { GET_TOKEN } from '@/utils'

// 路由器
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 滚动行为
  scrollBehavior: () => {
    return {
      top: 0,
      left: 0,
    }
  },
})

// 全局路由前置守卫
router.beforeEach(async (to, from, next) => {
  // 进度条开始加载
  nprogress.start()
  const userStore = useUserStore()
  // 判断有无 token
  if (GET_TOKEN()) {
    // 用户登录
    if (to.path === '/login') {
      // 有 token 时, 不允许用户访问登录页
      ElMessage({
        type: 'info',
        message: '您已登录, 无需再次登录',
      })
      // 跳转回首页
      next('/')
    } else {
      // 访问每个路由时, 查询是否有获取到用户信息
      // 没有则发送请求, 获取用户信息
      if (userStore.userInfo) {
        // 有用户信息, 则放行
        next()
      } else {
        // 没有用户信息, 则获取用户信息
        await userStore.getUserInfo()
        next()
      }
    }
  } else {
    // 用户未登录
    if (to.path === '/login') {
      // 访问登录页, 则放行
      next()
    } else {
      // 提示错误信息
      ElMessage({
        type: 'info',
        message: '尚未登录, 请登录',
      })
      // 跳转回登录页
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// 全局路由后置守卫
router.afterEach((to, from) => {
  // 进度条结束加载
  nprogress.done()
})
// 分别导出
export { routes }

// 默认导出
export default router
