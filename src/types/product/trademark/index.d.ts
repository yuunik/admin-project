// 品牌管理相关数据类型

// 品牌列表请求数据类型
export type TradeMarkReq = {
  /* 当前页 */
  page: number
  /* 每页条数 */
  limit: number
}

// 品牌列表响应数据类型
export type TradeMarkRes = {
  // 品牌列表
  records: TradeMark[]
  /* 总条数 */
  total: number
  /* 每页条数 */
  size: number
  /* 当前页 */
  current: number
  orders: []
  optimizeCountSql: boolean
  hitCount: boolean
  countId: null
  maxLimit: null
  searchCount: boolean
  /* 总页数 */
  pages: number
}

// 品牌类型
export type TradeMark = {
  /* 品牌编号 */
  id: number
  /* 品牌名 */
  tmName: string
  /* 品牌 logo 地址*/
  logoUrl: string
}
