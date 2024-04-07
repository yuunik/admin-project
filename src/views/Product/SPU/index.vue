<script setup lang="ts" name="SPU">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { PageData } from '@/types/common'
import { getSPUListAPI } from '@/apis/product/spu'
import type { SPU } from '@/types/product/spu'
import { useCategoryStore } from '@/store'

// 分页器模板对象
const paginationRef = ref<{
  // 分页器组件暴露的分页数据
  pageData: PageData
}>()

// 分页数据
let pageData = ref<PageData>()

// 组件挂载后执行
onMounted(() => {
  // 获取分页数据
  pageData.value = paginationRef.value!.pageData
  // 获取 spu 列表
  getSPUList()
})

// SPU 列表
const spuList = ref<SPU[]>()
// 获取三级分类的id
const categoryStore = useCategoryStore()
const { selectedThirdCategoryId } = storeToRefs(categoryStore)
const getSPUList = async () => {
  // 没有分页数据, 则不发送请求
  if (!pageData.value) {
    return
  }
  const {
    data: {
      code,
      data: { records, total },
    },
  } = await getSPUListAPI(
    selectedThirdCategoryId.value as number,
    pageData.value.page,
    pageData.value.limit,
  )
  if (code === 200) {
    // 保存列表
    spuList.value = records
    // 获取数据总条数
    pageData.value.total = total
  }
}

// 若获取了三级分类, 则发送请求获取 spu 列表
watch(selectedThirdCategoryId, () => {
  // 调用接口, 获取所属三级分类的 spu 信息列表
  getSPUList()
})
</script>

<template>
  <!-- 分类选择区 -->
  <Category :isShowAddPage="false" />
  <!-- spu 展示区 -->
  <el-card style="margin-top: 10px">
    <!-- 添加 spu 按键 -->
    <el-button
      type="primary"
      size="default"
      icon="Plus"
      plain
      :disabled="!selectedThirdCategoryId"
    >
      添加SPU
    </el-button>
    <!-- spu 表格展示区 -->
    <el-table border style="margin: 20px 0" :data="spuList">
      <el-table-column label="序号" align="center" width="100" type="index" />
      <el-table-column label="SPU名称" prop="spuName" />
      <el-table-column label="SPU描述" prop="description" />
      <el-table-column label="操作" align="center">
        <template #default>
          <!-- 添加 spu -->
          <el-button type="primary" size="default" icon="Plus" plain />
          <!-- 编辑 spu -->
          <el-button type="warning" size="default" icon="Edit" plain />
          <!-- 查看 spu 信息 -->
          <el-button type="info" size="default" icon="InfoFilled" plain />
          <!-- 删除 spu -->
          <el-button type="danger" size="default" icon="Delete" plain />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="无数据" />
      </template>
    </el-table>
    <!-- 分页器 -->
    <Pagination :getList="getSPUList" ref="paginationRef" />
  </el-card>
</template>

<style scoped lang="scss"></style>
