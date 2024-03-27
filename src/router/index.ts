import { createRouter, createWebHistory } from 'vue-router'
// 引入路由表
import routes from './routes'
// 引入进度条插件
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

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
router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(from)
  console.log(next)
  // 进度条开始加载
  nprogress.start()
  next()
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
