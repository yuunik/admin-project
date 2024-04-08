<script setup lang="ts" name="SPU">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { PageData } from '@/types/common'
import { getSPUListAPI } from '@/apis/product/spu'
import type { SPU } from '@/types/product/spu'
import { useCategoryStore } from '@/store'
import SPUForm from './components/SPUForm/index.vue'
import SKUForm from './components/SKUForm/index.vue'

// 是否展示其他页面的标记
const isShowOtherPage = ref<boolean>(false)

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

// 分类下拉框禁用的标记
const isShowAddPage = ref<boolean>(false)
// 若获取了三级分类, 则发送请求获取 spu 列表
watch(selectedThirdCategoryId, () => {
  // 分类下拉框禁用
  isShowAddPage.value = true
  // 调用接口, 获取所属三级分类的 spu 信息列表
  getSPUList()
})

// 展示不同显示模式的变量
const scene = ref<number>(0)

// 修改显示模式
const changeScene = (value: number) => {
  // 修改显示模式
  scene.value = value
  // 分类组件可选择
  isShowOtherPage.value = false
}

// SPUForm 模板对象
const spuFormRef = ref<InstanceType<typeof SPUForm>>()

// 添加 spu
const addSpu = () => {
  // 禁用分类组件
  isShowOtherPage.value = true
  // 跳转表单
  scene.value = 1
}

// 编辑 spu
const editSpu = (spu: SPU) => {
  // 修改显示模式
  scene.value = 1
  // 分类组件不可选择
  isShowOtherPage.value = true
  // 调用 spuform 对外暴露的接口, 回显数据
  spuFormRef.value?.initData(spu)
}
</script>

<template>
  <!-- 分类选择区 -->
  <Category :isDisabled="isShowOtherPage" />
  <!-- spu 展示区 -->
  <el-card style="margin-top: 10px">
    <div class="info-content" v-show="scene === 0">
      <!-- 添加 spu 按键 -->
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        plain
        :disabled="!selectedThirdCategoryId"
        @click="addSpu"
      >
        添加SPU
      </el-button>
      <!-- spu 表格展示区 -->
      <el-table border style="margin: 20px 0" :data="spuList">
        <el-table-column label="序号" align="center" width="100" type="index" />
        <el-table-column label="SPU名称" prop="spuName" />
        <el-table-column label="SPU描述" prop="description" />
        <el-table-column label="操作" align="center">
          <template #default="{ row: spu }: { row: SPU }">
            <!-- 添加 spu -->
            <el-button type="primary" size="default" icon="Plus" plain />
            <!-- 编辑 spu -->
            <el-button
              type="warning"
              size="default"
              icon="Edit"
              plain
              @click="editSpu(spu)"
            />
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
    </div>
    <SPUForm
      class="spu-content"
      v-show="scene === 1"
      @changeScene="changeScene"
      ref="spuFormRef"
    />
    <SKUForm class="sku-content" v-show="scene === 2" />
  </el-card>
</template>

<style scoped lang="scss"></style>
