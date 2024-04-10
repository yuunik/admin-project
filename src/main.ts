import { createApp } from 'vue'
// svg 图标所需的文件
import 'virtual:svg-icons-register'
// 引入 pinia
import pinia from './store'
// elementPlus
import ElementPlus from 'element-plus'
// elementPluS 中文包
//@ts-expect-error 无相关类型声明文件
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入路由器
import router from '@/router'
import App from './App.vue'
// 自定义插件 - 注册全局组件
import GlobalComponentsPlugin from '@/components'
// 引入全局样式
import '@/styles/index.scss'

// 创建 app
const app = createApp(App)

// 使用中间件
// elementPlus 使用中文包
app.use(ElementPlus, {
  locale: zhCn,
})
// 注册全局组件
app.use(GlobalComponentsPlugin)
// 注册状态管理库 pinia
app.use(pinia)
// 注册路由器
app.use(router)

// 渲染页面
app.mount('#app')
