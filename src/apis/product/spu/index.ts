// SPU 模块相关的接口
import { http } from '@/utils'
import type { ResType } from '@/types/common'
import type { ResSPUList, SPU, SPUImage } from '@/types/product/spu'
import type { TradeMark } from '@/types/product/trademark'
import type { SalesAttr, SalesProperty } from '@/types/product/spu'

// 接口地址枚举
enum API {
  // 获取 SPU 列表
  GETLIST_API = '/admin/product/',
  // 获取品牌列表信息
  GETTRADEMARK_API = '/admin/product/baseTrademark/getTrademarkList',
  // 获取所属 spu 下的图片信息
  GETIMG_API = '/admin/product/spuImageList/',
  // 获取销售属性列表信息
  GETSALESPROPERTYLIST_API = '/admin/product/baseSaleAttrList',
  // 获取所属 spu 下的销售属性列表信息
  GETOWNSALESPROPERTYLIST_API = '/admin/product/spuSaleAttrList/',
  // 新增 spu
  ADDSPU_API = '/admin/product/saveSpuInfo',
  // 更新 spu
  UPDATESPU_API = '/admin/product/updateSpuInfo',
}

/**
 *  获取 SPU 列表的接口
 * @param thirdCategoryId 三级分类 id
 * @param page  当前页
 * @param limit 每页条数
 */
export const getSPUListAPI = (
  thirdCategoryId: number,
  page: number,
  limit: number,
) =>
  http<ResType<ResSPUList>>({
    url: API.GETLIST_API + `${page}/${limit}`,
    method: 'GET',
    params: { category3Id: thirdCategoryId },
  })

// 获取品牌列表
export const getTrademarkListAPI = () =>
  http<ResType<TradeMark[]>>({ url: API.GETTRADEMARK_API, method: 'GET' })

// 获取spu下的图片列表
export const getImgListAPI = (spuId: number) =>
  http<ResType<SPUImage[]>>({ url: API.GETIMG_API + spuId, method: 'GET' })

// 获取销售属性列表
export const getSalesPropertyListAPI = () =>
  http<ResType<SalesProperty[]>>({
    url: API.GETSALESPROPERTYLIST_API,
    method: 'GET',
  })

// 获取所属 spu 下的销售属性列表信息
export const getSalesPropertyListByIdAPI = (spuId: number) =>
  http<ResType<SalesAttr[]>>({
    url: API.GETOWNSALESPROPERTYLIST_API + spuId,
    method: 'GET',
  })

// 新增或更新 spu
export const addOrUpdateSPUAPI = (data: SPU) => {
  if (data.id) {
    // 更新 spu
    return http<ResType<any>>({ url: API.UPDATESPU_API, method: 'POST', data })
  } else {
    // 新增 spu
    return http<ResType<any>>({ url: API.ADDSPU_API, method: 'POST', data })
  }
}
