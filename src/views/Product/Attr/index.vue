<script setup lang="ts" name="Attr">
import { ref, watch } from 'vue'
import { useCategoryStore } from '@/store'
import { storeToRefs } from 'pinia'
import { AttrInfo } from '@/types/product/attr'
import { getAttrInfoListAPI } from '@/apis/product/attr'

const categoryStore = useCategoryStore()
// 解构属性
const { selectedCategoryId, selectedSubCategoryId, selectedThirdCategoryId } =
  storeToRefs(categoryStore)

// 属性列表
const attrInfoList = ref<AttrInfo[]>()
// 获取属性列表
const getAttrInfoList = async () => {
  const result = await getAttrInfoListAPI(
    selectedCategoryId.value!,
    selectedSubCategoryId.value!,
    selectedThirdCategoryId.value!,
  )
  // 保存属性列表
  attrInfoList.value = result.data.data
}
// 监听三级属性的id 的变化
watch(selectedThirdCategoryId, () => {
  // 获取属性列表
  getAttrInfoList()
})
</script>

<template>
  <div class="attr">
    <!-- 分类组件 -->
    <Category />
    <el-card class="attr-content">
      <!-- 添加属性按键 -->
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="!selectedThirdCategoryId"
      >
        添加属性
      </el-button>
      <el-table border style="margin-top: 10px" :data="attrInfoList">
        <el-table-column label="序号" type="index" width="80" align="center" />
        <el-table-column label="属性名称" width="250" prop="attrName" />
        <el-table-column label="属性值名称">
          <template #default="{ row: { attrValueList } }">
            <el-tag
              type="primary"
              v-for="attrValue in attrValueList"
              :key="attrValue.id"
              style="margin-right: 5px"
            >
              {{ attrValue.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" align="center">
          <template #default>
            <el-button type="primary" size="default" icon="Edit" />
            <el-button type="danger" size="default" icon="Delete" />
          </template>
        </el-table-column>
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
