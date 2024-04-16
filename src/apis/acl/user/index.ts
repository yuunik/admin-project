// 用户管理相关的接口
import { http } from '@/utils'
import type { ResType, ResList } from '@/types/common'
import type { User } from '@/types/acl/user'

// 地址枚举值
enum AclAPI {
  // 获取管理用户分页列表
  GET_USER_LIST = '/admin/acl/user/',
}

// 获取用户列表信息
export const getUserListAPI = (page: number, limit: number) =>
  http<ResType<ResList<User>>>({
    url: AclAPI.GET_USER_LIST + `${page}/${limit}`,
    method: 'GET',
  })
