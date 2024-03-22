import { createPinia } from 'pinia'
import PiniaPersistedStatePlugin from 'pinia-plugin-persistedstate'
import useUserStore from './modules/user'

// 创建 pinia 实例对象
const pinia = createPinia()

// 使用中间件
pinia.use(PiniaPersistedStatePlugin)

// 分别导出
export { useUserStore }

// 默认导出
export default pinia
