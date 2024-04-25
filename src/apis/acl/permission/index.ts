// 权限菜单相关的接口
import { http } from '@/utils'
import type { ResType } from '@/types/common'
import type { AssignPermissionParams, Permission } from '@/types/acl/permission'

// 接口列表
enum PermissionAPI {
  // 获取权限菜单列表
  GET_PERMISSION_LIST_BY_ROLE_ID = '/admin/acl/permission/toAssign/',
  // 给角色分配权限
  ASSIGN_PERMISSION_TO_ROLE = '/admin/acl/permission/doAssign',
}

// 获取权限菜单列表
export const getPermissionListByRoleIdAPI = (roleId: number) =>
  http<ResType<Permission[]>>({
    url: PermissionAPI.GET_PERMISSION_LIST_BY_ROLE_ID + roleId,
    method: 'GET',
  })

/**
 * 为角色分配权限
 * @param params {
 *  roleId: number; // 角色ID
 *  permissionIds: number[]; // 权限ID数组
 * }
 * @returns
 */
export const assignPermissionToRoleAPI = (query: AssignPermissionParams) =>
  http<ResType<any>>({
    url:
      PermissionAPI.ASSIGN_PERMISSION_TO_ROLE +
      `?roleId=${query.roleId}&permissionId=${query.permissionId}`,
    method: 'POST',
  })
