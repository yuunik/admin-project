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
  category3Id: number | undefined
  /* 所属的品牌id */
  tmId: number | undefined
  /* 销售属性列表 */
  spuSaleAttrList?: SalesAttr[]
  /* 图片列表 */
  spuImageList?: SPUImage[]
  /* 宣传海报列表 */
  spuPosterList?: string[]
}

// SPU 商品图片类型
export type SPUImage = {
  /* 图片 id*/
  id?: number
  /* 所属 spu 的 id*/
  spuId?: number
  /* 图片名称 */
  imgName: string
  /* 图片地址 */
  imgUrl: string
  /* 是否为默认图片 */
  isDefault?: boolean
}

// SPU 已有销售属性的响应信息类型
export type SalesAttr = {
  id?: number
  /* spu 的 id*/
  spuId?: number
  /* 基础销售属性 id */
  baseSaleAttrId: number
  /* 销售属性名称 */
  saleAttrName: string
  /* 销售属性值列表 */
  spuSaleAttrValueList: SalesValue[]
  /* 是否新增 */
  isAdd?: boolean
  /* 新增属性值的名称 */
  salePropertyValue?: string
}

// 销售属性值类型
export type SalesValue = {
  /* 销售属性值 id */
  id?: number
  /* 属性spu 的 id */
  spuId?: number
  /* 所属销售属性的 id */
  baseSaleAttrId: number
  /* 销售属性值 */
  saleAttrValueName: string
  /* 所属的销售属性名 */
  saleAttrName?: string
  isChecked?: boolean
}

// 销售属性类型
export type SalesProperty = {
  /* 销售属性 id */
  id: number
  /* 销售属性名 */
  name: string
}
