// 属性管理相关的数据类型

/* 一级分类类型 */
export type Category = {
  /* 一级分类 id */
  id: number
  /* 一级分类名称 */
  name: string
}

/* 二级分类类型 */
export type SubCategory = Category & {
  /* 二级分类 id */
  // id: number
  /* 二级分类名称 */
  // name: string
  /* 所属的一级分类的 id */
  category1Id: number
}

/* 三级分类类型 */
export type ThirdCategory = {
  /* 三级分类 id */
  id: number
  /* 三级分类名称 */
  name: string
  /* 所属的二级分类的 id */
  category2Id: number
}
