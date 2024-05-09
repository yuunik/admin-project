// 统一导出

// axios 封装工具类
import http from './http'
// token 相关工具类
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from './token'
// 获取当前时间信息的工具类
import getTime from './time'
// 暗黑模式相关工具类
import { SET_DARKMODE, GET_DARKMODE } from './darkMode'
// 路由鉴权相关工具类
import filterRoutes from './auth.ts'

// 统一暴露
export {
  http,
  SET_TOKEN,
  GET_TOKEN,
  REMOVE_TOKEN,
  getTime,
  SET_DARKMODE,
  GET_DARKMODE,
  filterRoutes,
}
