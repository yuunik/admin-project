// 用户管理相关的接口
import { http } from '@/utils'
import type { ResType, ResList } from '@/types/common'
import type { User, UserRoleInfo } from '@/types/acl/user'

// 地址枚举值
enum AclAPI {
  // 获取管理用户分页列表
  GET_USER_LIST = '/admin/acl/user/',
  // 新增用户
  ADD_USER = '/admin/acl/user/save',
  // 更新用户
  UPDATE_USER = '/admin/acl/user/update',
  // 根据用户获取角色数据
  GET_ROLE_LIST = '/admin/acl/user/toAssign/',
}

/**
 * 获取用户列表
 * @param page  当前页
 * @param limit 每页显示的条数
 */
export const getUserListAPI = (page: number, limit: number) =>
  http<ResType<ResList<User>>>({
    url: AclAPI.GET_USER_LIST + `${page}/${limit}`,
    method: 'GET',
  })

/**
 * 新增或更新用户
 * @param data  新增或更新的用户数据
 */
export const addOrUpdateUserAPI = (data: User) => {
  if (data.id) {
    // 更新用户信息
    return http<ResType<any>>({ url: AclAPI.UPDATE_USER, method: 'PUT', data })
  } else {
    // 新增用户
    return http<ResType<any>>({ url: AclAPI.ADD_USER, method: 'POST', data })
  }
}

/**
 * 根据用户 id 获取角色数据
 * @param adminId 用户id
 */
export const getUserRoleListAPI = (adminId: number) =>
  http<ResType<UserRoleInfo>>({
    url: AclAPI.GET_ROLE_LIST + adminId,
    method: 'GET',
  })
