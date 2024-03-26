import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { LoginReq } from '@/types/user'
import { loginAPI } from '@/apis/user'
import { SET_TOKEN, GET_TOKEN } from '@/utils'
import { routes } from '@/router'

// 创建 store
const useUserStore = defineStore('user', () => {
  // 用户 token
  let token: string | null = GET_TOKEN()
  // 路由表信息
  const menuRoute: RouteRecordRaw[] = routes

  // 异步 actions
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

  return {
    token,
    login,
    menuRoute,
  }
})

export default useUserStore
