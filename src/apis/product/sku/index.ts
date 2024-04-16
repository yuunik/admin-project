// sku 相关的接口
import { http } from '@/utils'
import type { Sku } from '@/types/product/sku'
import type { ResList, ResType } from '@/types/common'

// 接口地址枚举值
enum SkuAPI {
  // 添加 sku
  ADD_SKU = '/admin/product/saveSkuInfo',
  // 修改 sku
  UPDATE_SKU = '/admin/product/updateSkuInfo',
  // 通过 skuId 查看 sku 信息
  GET_SKULIST_BY_SPUID = '/admin/product/findBySpuId/',
  // 获取 sku 列表
  GET_SKU_LIST = '/admin/product/list/',
  // 上架 sku
  ON_SALE_SKU = '/admin/product/onSale/',
  // 下架 sku
  CANCEL_SALE_SKU = '/admin/product/cancelSale/',
  // 根据 sku 的 id 获取 sku 的信息
  GET_SKU_BY_ID = '/admin/product/getSkuInfo/',
  // 删除 sku
  DELETE_SKU = '/admin/product/deleteSku/',
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

/**
 * 获取 sku 列表
 * @param page 当前页 （默认第一页）
 * @param limit 每页条数 （默认显示 10 条）
 */
export const getSkuListAPI = (page: number, limit: number) =>
  http<ResType<ResList<Sku>>>({
    url: SkuAPI.GET_SKU_LIST + page + '/' + limit,
    method: 'GET',
  })

/**
 * 上架 sku
 * @param skuId skuId
 */
export const onSaleSkuAPI = (skuId: number) =>
  http<ResType<any>>({
    url: SkuAPI.ON_SALE_SKU + skuId,
    method: 'GET',
  })

/**
 * 下架 sku
 * @param skuId skuId
 */
export const cancelSaleSkuAPI = (skuId: number) =>
  http<ResType<any>>({
    url: SkuAPI.CANCEL_SALE_SKU + skuId,
    method: 'GET',
  })

/**
 * 根据 skuId 获取 sku
 * @param skuId skuId
 */
export const getSkuByIdAPI = (skuId: number) =>
  http<ResType<Sku>>({
    url: SkuAPI.GET_SKU_BY_ID + skuId,
    method: 'GET',
  })

/**
 * 根据 skuId 删除 sku
 * @param skuId skuId
 */
export const deleteSkuByIdAPI = (skuId: number) =>
  http<ResType<any>>({
    url: SkuAPI.DELETE_SKU + skuId,
    method: 'DELETE',
  })
