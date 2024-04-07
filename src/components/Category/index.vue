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
  // 清空二级分级及三级分类
  selectedSubCategoryId.value = undefined
  thirdCategoryList.value = []
  selectedThirdCategoryId.value = undefined
  // 检测一级分类 id 是否存在
  // 一级分类 id 发生变化, 则调用接口, 获取二级分类列表
  getSubCategoryList()
})

// 二级分类改变的回调
const handleSubCategoryListChanged = () => {
  // 清空三级分类
  selectedThirdCategoryId.value = undefined
  // 调用接口, 获取三级分类
  getThirdCategoryList()
}

// 对传入参数进行类型声明
interface Props {
  isShowAddPage: boolean
}

// 接收参数
defineProps<Props>()
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
          :disabled="isShowAddPage"
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
          @change="handleSubCategoryListChanged"
          :disabled="isShowAddPage"
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
          :disabled="isShowAddPage"
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
