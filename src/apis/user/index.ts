// 用户相关的接口
import type { ResType } from '@/types/common'
import type { LoginReq, LoginRes, UserInfoContainer } from '@/types/user'
import { http } from '@/utils'

// 接口的枚举值
enum API {
  LOGIN_API = '/user/login',
  USERINFO_API = '/user/info',
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
  http<ResType<UserInfoContainer>>({
    url: API.USERINFO_API,
    method: 'GET',
  })
