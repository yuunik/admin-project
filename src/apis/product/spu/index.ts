// SPU 模块相关的接口
import { http } from '@/utils'
import type { ResType } from '@/types/common'
import type { SPU } from '@/types/product/spu'

// 接口地址枚举
enum API {
  // 获取 SPU 列表
  GETLIST_API = '/admin/product/baseSaleAttrList',
}

// 获取 SPU 列表的接口
export const getSPUListAPI = (thirdCategoryId: number) =>
  http<ResType<SPU[]>>({
    url: API.GETLIST_API,
    method: 'GET',
    data: { category3Id: thirdCategoryId },
  })
