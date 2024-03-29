// 品牌管理相关接口
import { http } from '@/utils'
import type {
  TradeMarkRes,
  TradeMarkReq,
  TradeMark,
} from '@/types/product/trademark'
import type { ResType } from '@/types/common'

// 接口管理
enum API {
  // 获取品牌列表
  TRADEMARK_API = '/admin/product/baseTrademark',
  // 新增品牌
  ADDTRADEMARK_API = '/admin/product/baseTrademark/save',
  // 修改品牌
  UPDATETRADEMARK_API = '/admin/product/baseTrademark/update',
  // 获取品牌信息
  GETTRADEINFO_API = '/admin/product/baseTrademark/get',
}

// 获取品牌列表接口
export const getTrademarkListAPI = ({ page, limit }: TradeMarkReq) =>
  http<ResType<TradeMarkRes>>({
    url: API.TRADEMARK_API + `/${page}/${limit}`,
    method: 'GET',
  })

// 新增或修改品牌接口
export const addOrUpdateTrademarkAPI = (data: TradeMark) => {
  if (data.id) {
    // 修改品牌接口
    return http<ResType<any>>({
      url: API.UPDATETRADEMARK_API,
      method: 'PUT',
      data,
    })
  } else {
    // 新增品牌接口
    return http<ResType<any>>({
      url: API.ADDTRADEMARK_API,
      method: 'POST',
      data,
    })
  }
}

// 获取品牌信息接口
export const getTrademarkInfoAPI = (id: number) =>
  http<ResType<TradeMark>>({
    url: API.GETTRADEINFO_API + `/${id}`,
    method: 'GET',
  })
