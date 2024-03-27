import { defineStore } from 'pinia'
import { ref } from 'vue'

const useLayoutSettingStore = defineStore('layoutSettingStore', () => {
  // 控制 layout 左侧菜单是否折叠的标记
  const isFold = ref<boolean>(false)
  // 控制 layout 内容区是否刷新的标记
  const isRefresh = ref<boolean>(false)

  // 修改是否折叠
  const changeIsFold = () => (isFold.value = !isFold.value)

  // 修改是否刷新
  const changeIsRefresh = () => (isRefresh.value = !isRefresh.value)

  return {
    isFold,
    changeIsFold,

    isRefresh,
    changeIsRefresh,
  }
})

export default useLayoutSettingStore
