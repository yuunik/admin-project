<script setup lang="ts" name="Tabbar">
import Breadcrumb from '@/views/Layout/components/Tabbar/components/Breadcrumb/index.vue'
import Setting from '@/views/Layout/components/Tabbar/components/Setting/index.vue'
</script>

<template>
  <div class="tabbar">
    <!-- 面包屑区 -->
    <Breadcrumb />
    <!-- 基础设置 -->
    <Setting class="setting" />
  </div>
</template>

<style scoped lang="scss">
.tabbar {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-image: linear-gradient(to right, #fff, #ddd, #fff);
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:hover {
    box-shadow: 0 0 10px #ddd;
  }

  .setting {
    margin-right: 20px;
  }
}
</style>
