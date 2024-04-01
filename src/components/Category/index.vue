<script setup lang="ts"></script>

<template>
  <el-card>
    <el-form inline class="category-form">
      <!-- 一级分类 -->
      <el-form-item label="一级分类" class="category-item">
        <el-select placeholder="请选择一级分类" style="width: 240px">
          <el-option value="北京" label="北京1" />
        </el-select>
      </el-form-item>
      <!-- 二级分类 -->
      <el-form-item label="二级分类" class="category-item">
        <el-select placeholder="请选择二级分类" style="width: 240px">
          <el-option value="北京" label="北京1" />
        </el-select>
      </el-form-item>
      <!-- 三级分类 -->
      <el-form-item label="三级分类" class="category-item">
        <el-select placeholder="请选择三级分类" style="width: 240px">
          <el-option value="北京" label="北京1" />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss">
.category-form {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .category-item {
    margin: auto 0;
  }
}
</style>
