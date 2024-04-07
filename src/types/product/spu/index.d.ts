// SPU 相关的数据类型

// 获取 spu 列表的响应类型
export type ResSPUList = {
  /* spu 列表 */
  records: SPU[]
  /* spu 总数据的数量 */
  total: number
  /* 每页条数 */
  size: number
  /* 当前页 */
  current: number
  orders?: []
  optimizeCountSql: boolean
  hitCount: boolean
  countId?: number
  maxLimit?: number
  searchCount: boolean
  pages: number
}

// SPU 数据类型
export type SPU = {
  /* spu id */
  id?: number
  /* spu 名称 */
  spuName: string
  /* spu 描述 */
  description: string
  /* 所属的三级分类 */
  category3Id: number
  /* 所属的品牌id */
  tmId: number
  /* 销售属性列表 */
  spuSaleAttrList?: string[]
  /* 图片列表 */
  spuImageList?: string[]
  /* 宣传海报列表 */
  spuPosterList?: string[]
}
