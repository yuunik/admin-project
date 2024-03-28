// 用户相关的接口
import type { ResType } from '@/types/common'
import type { LoginReq, LoginRes, UserInfo } from '@/types/user'
import { http } from '@/utils'

// 接口的枚举值
enum API {
  // 登录接口的请求地址
  LOGIN_API = '/admin/acl/index/login',
  // 获取用户信息的请求地址
  USERINFO_API = '/admin/acl/index/info',
  // 用户退出登录的请求地址
  LOGOUT_API = '/admin/acl/index/logout',
}

// 用户登录接口
export const loginAPI = (data: LoginReq) =>
  http<ResType<LoginRes>>({
    url: API.LOGIN_API,
    method: 'POST',
    data,
  })

// 获取用户信息接口
export const getUserInfoAPI = () =>
  http<ResType<UserInfo>>({
    url: API.USERINFO_API,
    method: 'GET',
  })

// 用户注销接口
export const logoutAPI = () =>
  http<ResType<any>>({
    url: API.LOGOUT_API,
    method: 'POST',
  })
