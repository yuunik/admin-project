<script setup lang="ts" name="Breadcrumb">
import { useLayoutSettingStore } from '@/store'
import { storeToRefs } from 'pinia'

// 获取状态管理库
const layoutSettingStore = useLayoutSettingStore()
// 获取是否折叠的标记
const { isFold } = storeToRefs(layoutSettingStore)
// 获取修改折叠标记的方法
const { changeIsFold } = layoutSettingStore
</script>

<template>
  <div class="breadcrumb">
    <!-- 图标 -->
    <el-icon class="icon-collapse" @click="changeIsFold">
      <!-- 展开 -->
      <component :is="isFold ? 'Fold' : 'Expand'" />
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/acl' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="scss">
.breadcrumb {
  display: flex;
  align-items: center;

  .icon-collapse {
    margin: 0 20px;
    cursor: pointer;
  }
}
</style>
