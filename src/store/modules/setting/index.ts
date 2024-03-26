import { defineStore } from 'pinia'
import { ref } from 'vue'

const useLayoutSettingStore = defineStore('layoutSettingStore', () => {
  // 控制 layout 左侧菜单是否折叠的标记
  const isFold = ref<boolean>(false)

  // 修改是否折叠
  const changeIsFold = () => (isFold.value = !isFold.value)

  return {
    isFold,
    changeIsFold,
  }
})

export default useLayoutSettingStore
