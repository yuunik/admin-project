// 属性管理相关的接口

// 接口常量管理
import { http } from '@/utils'
import type { ResType } from '@/types/common'
import type { Category, SubCategory, ThirdCategory } from '@/types/product/attr'

enum API {
  // 获取一级分类的地址
  GETCATEGORY_API = '/admin/product/getCategory1',
  // 获取二级分类的地址
  GETSUBCATEGORY_API = '/admin/product/getCategory2/',
  // 获取三级分类的地址
  GETTHIRDCATEGORY_API = '/admin/product/getCategory3/',
}

// 获取一级分类的接口
export const getCategoryListAPI = () =>
  http<ResType<Category[]>>({ url: API.GETCATEGORY_API, method: 'GET' })

// 获取二级分类的接口
export const getSubCategoryListAPI = (id: number) =>
  http<ResType<SubCategory[]>>({
    url: API.GETSUBCATEGORY_API + `${id}`,
    method: 'GET',
  })

// 获取三级分类的接口
export const getThirdCategoryListAPI = (id: number) =>
  http<ResType<ThirdCategory>>({
    url: API.GETTHIRDCATEGORY_API + `${id}`,
    method: 'GET',
  })
