// 分类相关的状态管理库
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Category, SubCategory, ThirdCategory } from '@/types/product/attr'
import {
  getCategoryListAPI,
  getSubCategoryListAPI,
  getThirdCategoryListAPI,
} from '@/apis/product/attr'

const useCategoryStore = defineStore('category', () => {
  // 一级分类列表
  const categoryList = ref<Category[]>()
  // 所选中的一级分类的 id
  const selectedCategoryId = ref<number>()

  // 二级分类列表
  const subCategoryList = ref<SubCategory[]>()
  // 所选中的二级分类的 id
  const selectedSubCategoryId = ref<number>()

  // 三级分类列表
  const thirdCategoryList = ref<ThirdCategory[]>()
  // 所选中的三级分类的 id
  const selectedThirdCategoryId = ref<number>()

  // 获取一级分类
  const getCategoryList = async () => {
    const result = await getCategoryListAPI()
    // 保存一级分类
    categoryList.value = result.data.data
  }

  // 获取二级分类
  const getSubCategoryList = async () => {
    const result = await getSubCategoryListAPI(selectedCategoryId.value)
    // 保存一级分类
    subCategoryList.value = result.data.data
  }

  // 获取一级分类
  const getThirdCategoryList = async () => {
    const result = await getThirdCategoryListAPI(selectedSubCategoryId.value)
    // 保存一级分类
    thirdCategoryList.value = result.data.data
  }

  return {
    categoryList,
    selectedCategoryId,
    getCategoryList,

    subCategoryList,
    selectedSubCategoryId,
    getSubCategoryList,

    thirdCategoryList,
    selectedThirdCategoryId,
    getThirdCategoryList,
  }
})

export default useCategoryStore
