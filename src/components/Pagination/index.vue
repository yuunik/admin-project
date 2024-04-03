<script setup lang="ts" name="Pagination">
//@ts-expect-error '无组件声明文件类型'
import Chinese from 'element-plus/dist/locale/zh-cn.mjs'
import { reactive } from 'vue'
import type { PageData } from '@/types/common'

// 分页相关数据
const pageData = reactive<PageData>({
  // 当前页
  page: 1,
  // 每页展示条数
  limit: 4,
  // 每页展示条数选项
  pageSizes: [2, 4, 6, 8, 10],
  // 数据总条数
  total: 0,
})

// 对传入的参数进行类型约束
interface Props {
  // 获取下一页列表的函数
  getList: () => Promise<void>
  // 分页相关数据
  // pageData: PageData
}

// 对暴露的参数进行类型申明
interface Expose {
  // 分页数据
  pageData: PageData
}

// 接收传入的参数
defineProps<Props>()

// 对外暴露属性与方法
defineExpose<Expose>({
  pageData,
})
</script>

<template>
  <!-- 分页器 -->
  <el-config-provider :locale="Chinese">
    <el-pagination
      v-model:current-page="pageData.page"
      v-model:page-size="pageData.limit"
      :page-sizes="pageData.pageSizes"
      :small="false"
      :disabled="false"
      :background="true"
      layout="prev, pager, next, jumper, -> , total, sizes"
      :total="pageData.total"
      prev-icon="DArrowLeft"
      next-icon="DArrowRight"
      @change="getList"
    />
  </el-config-provider>
</template>

<style scoped lang="scss"></style>
