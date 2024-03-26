import { createRouter, createWebHistory } from 'vue-router'
// 引入路由表
import routes from './routes'

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

// console.log(routes)

// 分别导出
export { routes }

// 默认导出
export default router
