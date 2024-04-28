<script setup lang="ts" name="Breadcrumb">
import { useSettingStore } from '@/store'
import { storeToRefs } from 'pinia'

// 获取状态管理库
const layoutSettingStore = useSettingStore()
// 获取是否折叠的标记
const { isFold } = storeToRefs(layoutSettingStore)
// 获取修改折叠标记的方法
const { changeIsFold } = layoutSettingStore
</script>

<template>
  <div class="breadcrumb-container">
    <!-- 图标 -->
    <el-icon class="icon-collapse" @click="changeIsFold">
      <!-- 展开 -->
      <component :is="isFold ? 'Fold' : 'Expand'" />
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight" class="breadcrumb">
      <el-breadcrumb-item
        v-for="route in $route.matched"
        :key="route.path"
        :to="route.path"
        v-show="route.path !== '/'"
      >
        <!-- 图标 -->
        <el-icon class="icon-permission">
          <component :is="route.meta.icon" />
        </el-icon>
        <!-- 标题 -->
        <em>{{ route.meta.title }}</em>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="scss">
.breadcrumb-container {
  display: flex;
  align-items: center;

  .icon-collapse {
    margin: 0 20px;
    cursor: pointer;
  }

  .icon-permission {
    margin-right: 3px;
    vertical-align: top;
  }
}
</style>
