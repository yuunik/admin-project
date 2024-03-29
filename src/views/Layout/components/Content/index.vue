<script setup lang="ts" name="Content">
// 路由组件, 可实现过渡动效
import { ref, watch, nextTick } from 'vue'
import { useLayoutSettingStore } from '@/store'

// 控制路由显示组件显隐的回调
const isNotRefresh = ref<boolean>(true)

// 获取基础设置的状态管理库
const layoutSettingStore = useLayoutSettingStore()

// 监听 isRefresh 的变化
watch(
  () => layoutSettingStore.isRefresh,
  () => {
    // 销毁内容组件
    isNotRefresh.value = false
    // 当组件更新后的回调, 重新加载内容组件
    nextTick(() => (isNotRefresh.value = true))
  },
)
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="isNotRefresh" />
    </transition>
  </router-view>
</template>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: 0.5s all linear;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
