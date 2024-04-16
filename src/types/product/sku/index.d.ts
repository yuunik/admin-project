// sku 相关的数据的类型声明

// sku 数据的类型
export type Sku = {
  /* sku 编号*/
  id?: number
  /* 所属的三级分类 id */
  category3Id: number | undefined
  /* 价格 */
  price: number | undefined
  /* 平台属性 */
  skuAttrValueList: AttrValueList[]
  /* 默认图片 */
  skuDefaultImg: string
  /* sku 描述 */
  skuDesc: string
  /* sku 名称 */
  skuName: string
  /* 销售属性列表 */
  skuSaleAttrValueList: SaleAttrValue[]
  /* 所属的 spu 的 id */
  spuId: number | undefined
  /* 所属的品牌 id */
  tmId: number | undefined
  /* 重量 */
  weight: number | undefined
  /* 是否售卖 */
  isSale?: number
  /* 图片列表 */
  skuImageList?: SkuImage[]
}

// 平台数据属性类型
export type AttrValueList = {
  /* 所属的平台属性 id */
  attrId: number | string
  /* 平台属性值 id */
  valueId: number | string
  /* 平台属性名 */
  valueName?: string
}

// 销售数据属性类型
export type SaleAttrValue = {
  /* 销售属性 id */
  saleAttrId: number | string
  /* 销售属性值 id */
  saleAttrValeId: number | string
  /* 销售属性名 */
  saleAttrValueName?: string
}

/* sku 图片列表 */
export type SkuImage = {
  /* 图片 id */
  id?: number
  /* 图片地址 */
  imgUrl: string
  /* 图片名称 */
  imgName: string
}
