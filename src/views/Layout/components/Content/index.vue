<script setup lang="ts" name="Content">
// 路由组件, 可实现过渡动效
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: 0.3s all linear;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
