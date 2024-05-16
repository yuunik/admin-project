import { createRouter, createWebHistory } from 'vue-router'
// 引入进度条插件
import nprogress from 'nprogress'
// 关闭加载圆圈
nprogress.configure({ showSpinner: false })
import { ElMessage } from 'element-plus'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 引入路由表
import constantRoutes from './routes'
import { asyncRoutes, anyRoutes } from './routes'
import { useUserStore } from '@/store'
import { GET_TOKEN } from '@/utils'
// 引入基础设置
import basicSetting from '@/setting.ts'

// 路由器
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  // 滚动行为
  scrollBehavior: () => {
    return {
      top: 0,
      left: 0,
    }
  },
})
let userStore: any = null

// 全局路由前置守卫
router.beforeEach(async (to, _, next) => {
  // 进度条开始加载
  nprogress.start()
  // 重置用户的状态管理库
  userStore = null
  userStore = useUserStore()

  // 修改网站标题
  document.title = `${basicSetting.websiteName}/${to.meta.title}`
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
      // 获取用户信息
      // 访问每个路由时, 查询是否有获取到用户信息
      // 没有则发送请求, 获取用户信息
      if (userStore.userInfo) {
        // 有用户信息, 则放行
        next()
      } else {
        // 没有用户信息, 则获取用户信息
        await userStore.getUserInfo()
        // 页面重新加载完成时, 才放行
        next({ ...to })
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
router.afterEach(() => {
  // 进度条结束加载
  nprogress.done()
})

// 分别导出
export { constantRoutes, asyncRoutes, anyRoutes }

// 默认导出
export default router
