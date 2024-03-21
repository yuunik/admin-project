// axios 二次封装
import axios from 'axios'

// 项目基地址
const baseURL = import.meta.env.VITE_APP_BASE_API

// 创建 axios 实例对象
const http = axios.create({
  baseURL,
  timeout: 5000,
})

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // 错误信息
    let msg = ''
    // 处理网络错误
    const {
      response: { status },
    } = error
    // 错误类型判别
    switch (status) {
      case 401:
        msg = ' 当前 token 已过期'
        break
      case 403:
        msg = '无权限访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器发生错误, 请稍后再试...'
        break
      default:
        msg = '网络异常, 请稍后再试...'
    }

    // 提示错误信息
    //@ts-ignore
    ElMessage.error(`${msg}`)

    return Promise.reject(error)
  },
)

export default http
