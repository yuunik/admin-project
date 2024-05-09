import { useUserStore } from '@/store'

// 按钮权限
export const permission = (app: any) => {
  const userStore = useUserStore()
  app.directive('btnPermission', {
    mounted(el: any, binding: any) {
      if (!userStore.userInfo?.buttons.includes(binding.value)) {
        el.parentNode.removeChild(el)
      }
    },
  })
}
