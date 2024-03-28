// 品牌管理相关接口
import { http } from '@/utils'
import type { TradeMarkRes, TradeMarkReq } from '@/types/product/trademark'
import type { ResType } from '@/types/common'

// 接口管理
enum API {
  Trademark_API = '/admin/product/baseTrademark',
}

// 获取品牌列表接口
export const getTrademarkListAPI = ({ page, limit }: TradeMarkReq) =>
  http<ResType<TradeMarkRes>>({
    url: API.Trademark_API + `/${page}/${limit}`,
    method: 'GET',
  })
