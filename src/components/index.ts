import SvgIcon from './SvgIcon/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const globalComponents = { SvgIcon }

// 注册全局组件的自定义插件
const GlobalCOmponentsPlugin = {
  install: (app) => {
    Object.keys(globalComponents).forEach((key) => {
      // 注册全局组件
      app.component(key, globalComponents[key])
    })
    // 注册所有 elementPlus 图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}

export default GlobalCOmponentsPlugin
