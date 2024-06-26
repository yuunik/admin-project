import { defineStore } from 'pinia'
import { nextTick, ref } from 'vue'
import { GET_DARKMODE, SET_DARKMODE } from '@/utils'

const useSettingStore = defineStore('setting', () => {
  // 控制 layout 左侧菜单是否折叠的标记
  const isFold = ref<boolean>(false)

  // 控制 layout 内容区是否刷新的标记
  const isRefresh = ref<boolean>(false)

  // 暗黑模式
  const isDarkMode = ref<boolean>(GET_DARKMODE())

  // 修改是否折叠
  const changeIsFold = (foldValue?: boolean) => {
    if (foldValue) {
      isFold.value = foldValue
    } else {
      isFold.value = !isFold.value
    }
  }

  // 修改是否刷新
  const changeIsRefresh = async () => {
    // 开始刷新
    isRefresh.value = true
    // 等待下一次刷新
    nextTick(() => (isRefresh.value = false))
  }

  // 修改暗黑模式
  const changeDarkMode = (isDark: boolean) => {
    // 保存至本地存储
    SET_DARKMODE(isDark)
    // 获取根节点
    const htmlElement = document.documentElement
    // 如果为暗黑模式，添加 dark 类名，否则移除 dark 类名
    if (isDarkMode.value) {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }
  }

  return {
    isFold,
    changeIsFold,

    isRefresh,
    changeIsRefresh,

    isDarkMode,
    changeDarkMode,
  }
})

export default useSettingStore
