<script setup lang="ts" name="User">
import { ref, onMounted } from 'vue'
import type { PageData } from '@/types/common'

// 分页器数据对象初始化
const pageData = ref<PageData>({
  page: 0,
  pageSizes: [],
  total: 0,
  limit: 0,
})

// 分页器模板实例
const paginationRef = ref<InstanceType<typeof Pagination>>()

// 获取用户信息列表
const getUserList = () => {}

// 组件加载后执行
onMounted(() => {
  // 获取分页器数据对象
  pageData.value = paginationRef.value.pageData
  // 设置默认初始值
  pageData.value = Object.assign(paginationRef.value.pageData, {
    pageSizes: [1, 3, 5, 7, 9],
    limit: 5,
  })
  console.log(pageData.value)
})
</script>

<template>
  <el-card class="search-container">
    <el-form class="search">
      <el-form-item label="用户名:" class="username">
        <el-input placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item class="button">
        <el-button type="primary" size="default" icon="Search">搜索</el-button>
        <el-button icon="RefreshRight">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 20px">
    <el-button type="primary" size="default" icon="Plus">添加</el-button>
    <el-button type="danger" size="default" icon="Delete">批量删除</el-button>
    <!-- 用户信息展示区 -->
    <el-table border style="margin: 20px 0">
      <el-table-column type="selection" align="center" width="50px" />
      <el-table-column type="index" label="序号" align="center" width="50px" />
      <el-table-column label="id 编号" align="center" />
      <el-table-column label="用户名字" align="center" />
      <el-table-column label="用户名称" align="center" />
      <el-table-column label="用户角色" align="center" />
      <el-table-column label="创建时间" align="center" />
      <el-table-column label="更新时间" align="center" />
      <el-table-column label="操作" align="center">
        <template #default>
          <el-button type="success" size="default" icon="User">
            分配角色
          </el-button>
          <el-button type="primary" size="default" icon="Edit">
            编辑用户信息
          </el-button>
          <el-button type="danger" size="default" icon="Delete">
            删除用户信息
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <!-- 无数据时的展示区 -->
        <el-empty description="暂无数据" />
      </template>
    </el-table>
    <!-- 分页器 -->
    <Pagination :getList="getUserList" ref="paginationRef" />
  </el-card>
</template>

<style scoped lang="scss">
.search-container {
  .search {
    display: flex;
    justify-content: space-between;
  }
}
</style>
