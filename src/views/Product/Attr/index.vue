<script setup lang="ts" name="Attr"></script>

<template>
  <div class="attr">
    <!-- 分类组件 -->
    <Category />
    <el-card class="attr-content">
      <!-- 添加属性按键 -->
      <el-button type="primary" size="default" icon="Plus">添加属性</el-button>
      <el-table border style="margin-top: 10px">
        <el-table-column label="序号" type="index" width="80" align="center" />
        <el-table-column label="属性名称" width="250" />
        <el-table-column label="属性值名称" />
        <el-table-column label="操作" width="250" align="center" />
        <template #empty><el-empty description="无数据" /></template>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.attr {
  .attr-content {
    margin-top: 10px;
  }
}
</style>
