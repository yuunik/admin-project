import { defineStore } from 'pinia'
import { LoginReq } from '@/types/user'
import { loginAPI } from '@/apis/user'

// 创建 store
const useUserStore = defineStore('user', () => {
  // 用户 token
  let token = localStorage.getItem('token') || ''

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
      token = data.token
      // token 本地持久化
      localStorage.setItem('token', token)
      return Promise.resolve('success')
    } else {
      // 请求失败
      return Promise.reject(new Error(data.message))
    }
  }

  return {
    token,
    login,
  }
})

export default useUserStore
