<script setup lang="ts">
//@ts-expect-error '无组件声明文件类型'
import Chinese from 'element-plus/dist/locale/zh-cn.mjs'
import { reactive } from 'vue'

// 分页相关数据
const pageData = reactive({
  // 当前页
  current: 1,
  // 每页条数
  pageSize: 100,
  // 每页条数选项
  pageSizes: [100, 200, 300, 400],
  // 数据总条数
  total: 1000,
})
</script>

<template>
  <!-- 品牌管理容器 -->
  <el-card shadow="hover" class="trademark">
    <!-- 顶部添加按键 -->
    <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
    <!-- 表格展示区 -->
    <el-table border style="margin: 20px 0">
      <el-table-column label="序号" width="80" align="center">
        1
      </el-table-column>
      <el-table-column label="品牌名称">1</el-table-column>
      <el-table-column label="品牌 logo">1</el-table-column>
      <el-table-column label="操作">1</el-table-column>
    </el-table>

    <!-- 底部分页器 -->
    <el-config-provider :locale="Chinese">
      <el-pagination
        v-model:current-page="pageData.current"
        v-model:page-size="pageData.pageSize"
        :page-sizes="pageData.pageSizes"
        :small="false"
        :disabled="false"
        :background="true"
        layout="prev, pager, next, jumper, -> , total, sizes"
        :total="pageData.total"
        prev-icon="DArrowLeft"
        next-icon="DArrowRight"
      />
    </el-config-provider>
  </el-card>
</template>

<style scoped lang="scss">
.trademark {
}
</style>
