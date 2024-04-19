// 权限菜单相关的接口
import { http } from '@/utils'
import type { ResType } from '@/types/common'
import type { Permission } from '@/types/acl/permission'

// 接口列表
enum PermissionAPI {
  // 获取权限菜单列表
  GET_PERMISSION_LIST_BY_ROLE_ID = '/admin/acl/permission/toAssign/',
}

// 获取权限菜单列表
export const getPermissionListByRoleIdAPI = (roleId: number) =>
  http<ResType<Permission[]>>({
    url: PermissionAPI.GET_PERMISSION_LIST_BY_ROLE_ID + roleId,
    method: 'GET',
  })
