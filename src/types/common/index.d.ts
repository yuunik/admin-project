// 基础响应数据类型
export type ResType<T> = {
  // 响应状态码
  code: number
  // 响应数据
  data: T
}
