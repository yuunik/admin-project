// 暗黑模式的工具类

// 存储暗黑模式相关信息至浏览器本地存储
export const SET_DARKMODE = (darkMode: boolean) => {
  localStorage.setItem('darkMode', JSON.stringify(darkMode || 'false'))
}

// 获取暗黑模式相关信息
export const GET_DARKMODE = () =>
  JSON.parse(localStorage.getItem('darkMode') || 'false')
