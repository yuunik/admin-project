// SPU 相关的数据类型

// SPU 数据类型
export type SPU = {
  id: number
  /* spu 名称 */
  spuName: string
  /* spu 介绍 */
  description: string
  /* 所属的三级分类 */
  category3Id: number
  tmId: number
  spuSaleAttrList?: string[]
  spuImageList?: string[]
  spuPosterList?: string[]
}
