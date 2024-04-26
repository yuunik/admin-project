// 权限菜单相关的数据类型

// 权限菜单的数据类型
export type Permission = {
  // 权限菜单 id
  id?: number
  // 上一级权限菜单 id
  pid: number
  // 权限菜单名称
  name: string
  // 权限值
  code: string
  toCode?: string
  // 类型
  type?: number
  // 状态码
  status?: number
  // 权限菜单的等级
  level: number
  // 是否被勾选
  select?: boolean
  // 子菜单
  children?: Permission[]
}

// 分配权限的请求数据类型
export type AssignPermissionParams = {
  // 角色 id
  roleId: number
  // 权限菜单 id 数组
  permissionId: number[]
}
