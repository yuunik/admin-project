// 基础响应数据类型
import { SPU } from '@/types/product/spu'

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

// 分页数据响应列表的数据类型
export type ResList<T> = {
  /* 响应列表 */
  records: T[]
  /* 总数据的数量 */
  total: number
  /* 每页条数 */
  size: number
  /* 当前页 */
  current: number
  orders?: []
  optimizeCountSql?: boolean
  hitCount?: boolean
  countId?: number
  maxLimit?: number
  searchCount: boolean
  pages: number
}
