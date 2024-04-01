import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
import Category from './Category/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const globalComponents: any = { SvgIcon, Pagination, Category }

// 注册全局组件的自定义插件
const GlobalComponentsPlugin = {
  install: (app: any) => {
    Object.keys(globalComponents).forEach((key) =>
      // 注册全局组件
      app.component(key, globalComponents[key]),
    )
    // 注册所有 elementPlus 图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}

export default GlobalComponentsPlugin
