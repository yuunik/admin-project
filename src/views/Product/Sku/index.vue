<script setup lang="ts" name="Sku">
import { onMounted, ref } from 'vue'
import Pagination from '@/components/Pagination/index.vue'
import { getSkuListAPI } from '@/apis/product/sku'
import type { Sku } from '@/types/product/sku'
import type { PageData } from '@/types/common'

// 分页器实例
const paginationRef = ref<InstanceType<typeof Pagination>>()
// 分页器数据
const pageData = ref<PageData>({
  page: 0,
  pageSizes: [],
  limit: 0,
  total: 0,
})

// sku 列表
const skuList = ref<Sku[]>([])
// 获取 sku 列表
const getSkuList = async (page = 1) => {
  // 没传当前页, 则默认为第一页
  pageData.value.page = page
  // 获取 sku 列表数据
  const {
    data: { code, data },
  } = await getSkuListAPI(pageData.value.page, pageData.value.limit)
  if (code === 200) {
    // 保存 sku 列表数据
    skuList.value = data.records
    // 保存数据的总条数
    pageData.value.total = data.total
  }
}

// 组件挂载后的回调
onMounted(() => {
  // 获取分页器实例的分页数据对象
  pageData.value = paginationRef.value!.pageData
  // 分页数据的每页条数默认为 10 条
  pageData.value.limit = 10
  getSkuList()
})
</script>

<template>
  <el-card>
    <!-- sku 表格 -->
    <el-table border :data="skuList" style="margin-bottom: 20px">
      <el-table-column label="序号" type="index" align="center" />
      <el-table-column label="名称" prop="skuName" align="center" />
      <el-table-column label="描述" prop="skuDesc" align="center" />
      <el-table-column label="图片" align="center">
        <template #default="{ row: { skuDefaultImg } }: { row: Sku }">
          <el-image
            style="width: 100px; height: 100px"
            :src="skuDefaultImg"
            fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column label="重量" prop="weight" align="center" />
      <el-table-column label="价格" prop="price" align="center" />
      <el-table-column label="操作" align="center">
        <template #default>
          <el-tooltip content="上架 sku ">
            <el-button type="primary" size="default" circle icon="Upload" />
          </el-tooltip>
          <el-tooltip content="编辑 sku ">
            <el-button type="warning" size="default" circle icon="Edit" />
          </el-tooltip>
          <el-tooltip content="查看 sku 详情">
            <el-button type="info" size="default" circle icon="InfoFilled" />
          </el-tooltip>
          <el-tooltip content="删除 sku ">
            <el-button type="danger" size="default" circle icon="Delete" />
          </el-tooltip>
        </template>
      </el-table-column>
      <!-- 空数据显示 -->
      <template #empty>
        <el-empty description="无数据" />
      </template>
    </el-table>
    <!-- 分页器 -->
    <Pagination :getList="getSkuList" ref="paginationRef" />
  </el-card>
</template>

<style scoped lang="scss"></style>
