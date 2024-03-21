import { createApp } from 'vue'
// svg 图标所需的文件
import 'virtual:svg-icons-register'
import App from './App.vue'
// 自定义插件 - 注册全局组件
import GlobalCOmponentsPlugin from '@/components'
// 引入路由器
import router from '@/router'
// 引入全局样式
import '@/styles/index.scss'

// 创建 app
const app = createApp(App)

// 使用中间件
app.use(GlobalCOmponentsPlugin)
app.use(router)

// 渲染页面
app.mount('#app')
