// 路由鉴权相关的工具类

// 获取用户相关的动态路由信息
import type { RouteRecordRaw } from 'vue-router'

const filterRoutes = (asyncRoutes: RouteRecordRaw[], userRoutes: string[]) =>
  asyncRoutes.filter((asyncRoute) => {
    if (userRoutes.includes(asyncRoute.name as string)) {
      if (asyncRoute.children && asyncRoute.children.length > 0) {
        asyncRoute.children = filterRoutes(asyncRoute.children, userRoutes)
      }
      return true
    }
  })

export default filterRoutes
