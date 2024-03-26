<script setup lang="ts">
import { ref } from 'vue'

// 是否展开
const isExpand = ref<boolean>(true)
</script>

<template>
  <div class="breadcrumb">
    <!-- 图标 -->
    <el-icon class="icon-collapse" @click="() => (isExpand = !isExpand)">
      <!-- 展开 -->
      <Expand v-show="isExpand" />
      <!-- 收起 -->
      <Fold v-show="!isExpand" />
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">权限管理</el-breadcrumb-item>
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
