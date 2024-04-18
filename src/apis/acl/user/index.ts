// 用户管理相关的接口
import { http } from '@/utils'
import type { ResType, ResList } from '@/types/common'
import type { User, UserRoleInfo } from '@/types/acl/user'

// 地址枚举值
enum UserAPI {
  // 获取管理用户分页列表
  GET_USER_LIST = '/admin/acl/user/',
  // 新增用户
  ADD_USER = '/admin/acl/user/save',
  // 更新用户
  UPDATE_USER = '/admin/acl/user/update',
  // 根据用户获取角色数据
  GET_ROLE_LIST = '/admin/acl/user/toAssign/',
  // 为用户分配角色
  ASSIGN_ROLE = '/admin/acl/user/doAssignRole',
  // 删除用户
  DELETE_USER = '/admin/acl/user/remove/',
  // 批量删除用户
  BATCH_DELETE_USER = '/admin/acl/user/batchRemove/',
}

/**
 * 获取用户列表
 * @param page  当前页
 * @param limit 每页显示的条数
 * @param username 用户名
 * @param name 昵称
 */
export const getUserListAPI = (
  page: number,
  limit: number,
  username?: string,
  name?: string,
) =>
  http<ResType<ResList<User>>>({
    url: UserAPI.GET_USER_LIST + `${page}/${limit}`,
    method: 'GET',
    params: { username, name },
  })

/**
 * 新增或更新用户
 * @param data  新增或更新的用户数据
 */
export const addOrUpdateUserAPI = (data: User) => {
  if (data.id) {
    // 更新用户信息
    return http<ResType<any>>({ url: UserAPI.UPDATE_USER, method: 'PUT', data })
  } else {
    // 新增用户
    return http<ResType<any>>({ url: UserAPI.ADD_USER, method: 'POST', data })
  }
}

/**
 * 根据用户 id 获取角色数据
 * @param adminId 用户id
 */
export const getUserRoleListAPI = (adminId: number) =>
  http<ResType<UserRoleInfo>>({
    url: UserAPI.GET_ROLE_LIST + adminId,
    method: 'GET',
  })

/**
 * 为用户分配角色
 * @param roleIdList 所分配角色的id列表
 * @param userId 用户id
 */
export const assignRoleAPI = (roleIdList: number[], userId: number) =>
  http<ResType<any>>({
    url: UserAPI.ASSIGN_ROLE,
    method: 'POST',
    data: { roleIdList, userId },
  })

/**
 * 删除用户
 * @param userId 用户id
 */
export const deleteUserByIdAPI = (userId: number) =>
  http<ResType<any>>({ url: UserAPI.DELETE_USER + userId, method: 'DELETE' })

/**
 * 批量删除用户
 * @param userIdList 用户id列表
 */
export const batchDeleteUserAPI = (userIdList: number[]) =>
  http<ResType<any>>({
    url: UserAPI.BATCH_DELETE_USER,
    method: 'DELETE',
    data: userIdList,
  })
