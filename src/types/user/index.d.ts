// 用户相关的数据类型

/* 用户登录的请求数据类型 */
export type LoginReq = {
  /* 用户账户 */
  username: string
  /* 用户密码 */
  password: string
}

/* 用户登录响应类型 */
export type LoginRes = {
  /* 用户 token */
  token: string
}

/* 用户信息类型 */
export type UserInfo = {
  /* 路由访问权限 */
  routes: string[]
  /* 按键权限 */
  buttons: string[]
  /* 用户角色 */
  roles: string[]
  /* 用户名 */
  name: string
  /* 用户头像 */
  avatar: string
}
