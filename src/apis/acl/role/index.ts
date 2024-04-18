// 角色管理相关的接口
import { http } from '@/utils'
import { ResList, ResType } from '@/types/common'
import { UserRole } from '@/types/acl/role'

// 接口地址枚举
enum RoleAPI {
  // 获取角色列表
  GET_ROLE_LIST = '/admin/acl/role/',
}

// 获取角色列表
export const getRoleListAPI = (
  page: number,
  limit: number,
  roleName?: string,
) =>
  http<ResType<ResList<UserRole>>>({
    url: RoleAPI.GET_ROLE_LIST + `${page}/${limit}`,
    method: 'GET',
    params: {
      roleName,
    },
  })
