// 操作 token 的工具类

// 保存用户 token
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('token', token)
}

// 获取用户 token
export const GET_TOKEN = () => {
  return localStorage.getItem('token')
}

// 删除 token
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('token')
}
