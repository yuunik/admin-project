// 基础响应数据类型
export type ResType<T> = {
  /* 响应状态码 */
  code: number
  /* 响应状态信息 */
  message: string
  /* 响应数据 */
  data: T
  /* isOk */
  ok: boolean
}

// 分页数据类型
export type PageData = {
  // 当前页
  page: number
  // 每页展示条数
  limit: number
  // 每页展示条数选项
  pageSizes: number[]
  // 数据总条数
  total: number
}
