import SvgIcon from './SvgIcon/index.vue'

const globalComponents = { SvgIcon }

// 注册全局组件的自定义插件
const GlobalCOmponentsPlugin = {
  install: (app) => {
    Object.keys(globalComponents).forEach((key) => {
      // 注册全局组件
      app.component(key, globalComponents[key])
    })
  },
}

export default GlobalCOmponentsPlugin
