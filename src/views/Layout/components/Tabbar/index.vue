<script setup lang="ts">
import Breadcrumb from './Breadcrumb/index.vue'
import Setting from './Setting/index.vue'
</script>

<template>
  <div class="tabbar">
    <!-- 面包屑区 -->
    <Breadcrumb />
    <!-- 基础设置 -->
    <Setting />
  </div>
</template>

<style scoped lang="scss">
.tabbar {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
