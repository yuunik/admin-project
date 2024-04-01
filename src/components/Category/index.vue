<script setup lang="ts" name="Category">
import { onMounted, watch } from 'vue'
import { useCategoryStore } from '@/store'
import { storeToRefs } from 'pinia'

// 获取分类的状态管理库
const categoryStore = useCategoryStore()
// 解构属性
const {
  categoryList,
  selectedCategoryId,
  subCategoryList,
  selectedSubCategoryId,
  thirdCategoryList,
  selectedThirdCategoryId,
} = storeToRefs(categoryStore)
// 解构方法
const { getCategoryList, getSubCategoryList, getThirdCategoryList } =
  categoryStore
// 组件挂载后执行
onMounted(() => getCategoryList())

// 监听一级分类 id 的变化
watch(selectedCategoryId, () => {
  // 检测一级分类 id 是否存在
  // 一级分类 id 发生变化, 则调用接口, 获取二级分类列表
  getSubCategoryList()
})

// 监听二级分类 id 的变化
watch(selectedSubCategoryId, () => {
  // 检测二级分类 id 是否存在
  // 二级分类 id 发生变化, 则调用接口, 获取二级分类列表
  getThirdCategoryList()
})
</script>

<template>
  <el-card>
    <el-form inline class="category-form">
      <!-- 一级分类 -->
      <el-form-item label="一级分类" class="category-item">
        <el-select
          placeholder="请选择一级分类"
          style="width: 240px"
          v-model="selectedCategoryId"
        >
          <el-option
            v-for="category in categoryList"
            :value="category.id"
            :label="category.name"
            :key="category.id"
          />
        </el-select>
      </el-form-item>
      <!-- 二级分类 -->
      <el-form-item label="二级分类" class="category-item">
        <el-select
          placeholder="请选择二级分类"
          style="width: 240px"
          v-model="selectedSubCategoryId"
        >
          <el-option
            v-for="subCategory in subCategoryList"
            :key="subCategory.id"
            :value="subCategory.id"
            :label="subCategory.name"
          />
        </el-select>
      </el-form-item>
      <!-- 三级分类 -->
      <el-form-item label="三级分类" class="category-item">
        <el-select
          placeholder="请选择三级分类"
          style="width: 240px"
          v-model="selectedThirdCategoryId"
        >
          <el-option
            v-for="thirdCategory in thirdCategoryList"
            :key="thirdCategory.id"
            :value="thirdCategory.id"
            :label="thirdCategory.name"
          />
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
