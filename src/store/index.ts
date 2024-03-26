import { createPinia } from 'pinia'
import useUserStore from './modules/user'
import useLayoutSettingStore from '@/store/modules/setting'

// 创建 pinia 实例对象
const pinia = createPinia()

// 分别导出
export { useUserStore, useLayoutSettingStore }

// 默认导出
export default pinia
