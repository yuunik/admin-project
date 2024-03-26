<script setup lang="ts" name="Tabbar">
import Breadcrumb from '@/views/Layout/components/Tabbar/components/Breadcrumb/index.vue'
import Setting from '@/views/Layout/components/Tabbar/components/Setting/index.vue'
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
