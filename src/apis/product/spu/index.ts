// SPU 模块相关的接口
import { http } from '@/utils'
import type { ResType } from '@/types/common'
import type { ResSPUList } from '@/types/product/spu'

// 接口地址枚举
enum API {
  // 获取 SPU 列表
  GETLIST_API = '/admin/product/',
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
