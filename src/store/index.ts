import { createPinia } from 'pinia'
import useUserStore from './modules/user'
import useSettingStore from './modules/setting'
import useCategoryStore from './modules/category'

// 创建 pinia 实例对象
const pinia = createPinia()

// 分别导出
export { useUserStore, useSettingStore, useCategoryStore }

// 默认导出
export default pinia
