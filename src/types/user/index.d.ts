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
  /* 请求成功时, 返回用户 token */
  token?: string
  /* 请求失败时, 返回错误信息 message */
  message?: string
}

/* 用户信息类型 */
export type UserInfo = {
  checkUser:
    | {
        /* 用户 id */
        userId: string
        /* 用户头像 */
        avatar: string
        /* 用户账户 */
        username: string
        /* 用户密码 */
        password: string
        /* 用户信息简介 */
        desc: string
        /* 用户角色 */
        roles: string[]
        /* 用户按键 */
        buttons: string[]
        /* 用户路由 */
        routes: string[]
      }
    | LoginRes
}
