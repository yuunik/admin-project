// 角色管理相关的接口
import { http } from '@/utils'
import type { ResList, ResType } from '@/types/common'
import type { UserRole } from '@/types/acl/role'
// 接口地址枚举
enum RoleAPI {
  // 获取角色列表
  GET_ROLE_LIST = '/admin/acl/role/',
  // 添加角色
  ADD_ROLE = '/admin/acl/role/save',
  // 编辑角色
  EDIT_ROLE = '/admin/acl/role/update',
  // 获取角色详情
  GET_ROLE = '/admin/acl/role/get/',
  // 删除角色
  DELETE_ROLE = '/admin/acl/role/remove/',
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

// 添加或编辑角色
export const addOrEditRoleAPI = (role: UserRole) => {
  if (role.id) {
    // 编辑角色
    return http<ResType<any>>({
      url: RoleAPI.EDIT_ROLE,
      method: 'PUT',
      data: role,
    })
  } else {
    // 添加角色
    return http<ResType<any>>({
      url: RoleAPI.ADD_ROLE,
      method: 'POST',
      data: role,
    })
  }
}

// 获取角色详情
export const getRoleInfoByIdAPI = (roleId: number) =>
  http<ResType<UserRole>>({ url: RoleAPI.GET_ROLE + roleId, method: 'GET' })

// 删除角色
export const deleteRoleByIdAPI = (roleId: number) =>
  http<ResType<any>>({
    url: RoleAPI.DELETE_ROLE + roleId,
    method: 'DELETE',
  })
