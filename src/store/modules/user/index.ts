import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { LoginReq, UserInfo } from '@/types/user'
import { loginAPI, getUserInfoAPI, logoutAPI } from '@/apis/user'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN, filterRoutes } from '@/utils'
import router, { constantRoutes, asyncRoutes, anyRoutes } from '@/router'

// 创建 store
const useUserStore = defineStore('user', () => {
  // 用户 token
  let token: any | null = GET_TOKEN()
  // 路由表信息
  const menuRoute = ref<RouteRecordRaw[]>(constantRoutes)
  // 用户信息
  const userInfo = ref<UserInfo | undefined>()

  /**
   * 异步actions
   */
  // 登录, 获取用户 token
  const login = async (form: LoginReq) => {
    // 调用接口, 获取用户 token
    const {
      data: { code, data },
    } = await loginAPI(form)
    // 判断状态码
    if (code === 200) {
      // 请求成功
      // 保存 token
      token = data
      // token 本地持久化
      SET_TOKEN(token)
      return Promise.resolve('success')
    } else {
      // 请求失败
      return Promise.reject(new Error('登录失败'))
    }
  }

  // 获取用户信息
  const getUserInfo = async () => {
    const result = await getUserInfoAPI()
    const {
      data: { code, data },
    } = result
    if (code === 200) {
      // 保存用户信息
      userInfo.value = data as UserInfo
      const filterRoute = filterRoutes(asyncRoutes, data.routes)
      menuRoute.value = [...constantRoutes, ...filterRoute, anyRoutes]
      console.log(menuRoute)
      filterRoute.forEach((route) => {
        router.addRoute(route)
      })
      return 'ok'
    } else {
      return Promise.reject(new Error('获取用户信息失败'))
    }
  }

  // 清除用户信息
  const logout = async () => {
    // 用户注销, 注销 token 信息
    const {
      data: { code },
    } = await logoutAPI()
    if (code === 200) {
      // 注销成功
      ElMessage({
        type: 'success',
        message: '注销成功',
      })
      // 清除用户信息
      userInfo.value = undefined
      // 清除 token 信息
      REMOVE_TOKEN()

      return 'ok'
    } else {
      // 提示失败信息
      ElMessage({
        type: 'error',
        message: '注销失败',
      })
      // 抛出错误
      return Promise.reject(new Error('注销失败'))
    }
  }

  return {
    token,
    login,
    menuRoute,
    userInfo,
    getUserInfo,
    logout,
  }
})

export default useUserStore
