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
  TRADEMARK_API = '/admin/product/baseTrademark',
  ADDTRADEMARK_API = '/admin/product/baseTrademark/save',
  UPDATETRADEMARK_API = '/admin/product/baseTrademark/update',
}

// 获取品牌列表接口
export const getTrademarkListAPI = ({ page, limit }: TradeMarkReq) =>
  http<ResType<TradeMarkRes>>({
    url: API.TRADEMARK_API + `/${page}/${limit}`,
    method: 'GET',
  })

// 新增或修改品牌接口
export const addOrUpdateTrademarkAPI = (trademark: TradeMark) => {
  if (trademark.id) {
    // 修改品牌接口
    return http<ResType<any>>({
      url: API.ADDTRADEMARK_API,
      method: 'POST',
    })
  } else {
    // 新增品牌接口
    return http<ResType<any>>({
      url: API.UPDATETRADEMARK_API,
      method: 'PUT',
    })
  }
}
