// sku 相关的接口
import { http } from '@/utils'
import type { Sku } from '@/types/product/sku'
import type { ResType } from '@/types/common'

// 接口地址枚举值
enum SkuAPI {
  // 添加 sku
  ADD_SKU = '/admin/product/saveSkuInfo',
  // 修改 sku
  UPDATE_SKU = '/admin/product/updateSkuInfo',
  // 通过 skuId 查看 sku 信息
  GET_SKULIST_BY_SPUID = '/admin/product/findBySpuId/',
}

/**
 * 添加或修改 sku
 * @param skuInfo sku 信息
 */
export const addOrUpdateSkuAPI = (skuInfo: Sku) => {
  // 如果 skuInfo 中有 id，则是修改，否则是添加
  if (skuInfo.id) {
    return http<ResType<any>>({
      url: SkuAPI.UPDATE_SKU,
      method: 'POST',
      data: skuInfo,
    })
  } else {
    return http<ResType<any>>({
      url: SkuAPI.ADD_SKU,
      method: 'POST',
      data: skuInfo,
    })
  }
}

// 通过 spuId 查看 sku 信息
export const getSkuListBySpuIdAPI = (spuId: number) => {
  return http<ResType<Sku[]>>({
    url: SkuAPI.GET_SKULIST_BY_SPUID + spuId,
    method: 'GET',
  })
}
