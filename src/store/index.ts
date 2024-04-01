import { createPinia } from 'pinia'
import useUserStore from './modules/user'
import useLayoutSettingStore from '@/store/modules/setting'
import useCategoryStore from '@/store/modules/Category'

// 创建 pinia 实例对象
const pinia = createPinia()

// 分别导出
export { useUserStore, useLayoutSettingStore, useCategoryStore }

// 默认导出
export default pinia
