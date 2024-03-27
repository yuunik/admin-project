import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { ref } from 'vue'
import { LoginReq, UserInfo } from '@/types/user'
import { loginAPI, getUserInfoAPI } from '@/apis/user'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils'
import { routes } from '@/router'

// 创建 store
const useUserStore = defineStore('user', () => {
  // 用户 token
  let token: string | null = GET_TOKEN()
  // 路由表信息
  const menuRoute: RouteRecordRaw[] = routes
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
      token = data.token as string
      // token 本地持久化
      SET_TOKEN(token)
      return Promise.resolve('success')
    } else {
      // 请求失败
      return Promise.reject(new Error(data.message))
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
      userInfo.value = result.data.data.checkUser as UserInfo
      return 'ok'
    } else {
      return Promise.reject(new Error(data.message))
    }
  }

  // 清除用户信息
  const logout = () => {
    // 清除用户信息
    userInfo.value = undefined
    // 清除 token 信息
    REMOVE_TOKEN()
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
