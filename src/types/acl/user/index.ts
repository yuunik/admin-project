// 用户管理相关的数据类型

// 用户信息
export type User = {
  // 用户 id
  id?: number
  // 用户信息的创建时间
  createTime?: string
  // 用户信息的更新时间
  updateTime?: string
  // 用户名
  name: string
  // 用户密码
  password: string
  // 用户昵称
  username: string
  // 用户手机号码
  phone?: string
  // 用户角色信息
  roleName?: string
}
