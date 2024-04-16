<script setup lang="ts" name="User">
import { ref, onMounted } from 'vue'
import type { PageData } from '@/types/common'
import { getUserListAPI } from '@/apis/acl/user'
import type { User } from '@/types/acl/user'

// 分页器数据对象初始化
const pageData = ref<PageData>({
  page: 0,
  pageSizes: [],
  total: 0,
  limit: 0,
})

// 分页器模板实例
const paginationRef = ref<InstanceType<typeof Pagination>>()

// 用户列表
const userList = ref<User[]>([])
// 获取用户信息列表
const getUserList = async (page = 1) => {
  // 不传入当前页参数时, 默认获取第一页数据
  pageData.value.page = page
  const {
    data: { code, data },
  } = await getUserListAPI(pageData.value.page, pageData.value.limit)
  // 响应成功，获取用户信息列表
  if (code === 200) {
    // 更新用户列表数据
    userList.value = data.records
    //  更新分页器数据
    pageData.value.total = data.total
  }
}

// 组件加载后执行
onMounted(() => {
  // 为分页器数据对象设置默认初始值
  pageData.value = Object.assign(paginationRef.value.pageData, {
    pageSizes: [1, 3, 5, 7, 9],
    limit: 5,
  })
  // 获取用户信息列表
  getUserList()
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
    <el-table border style="margin: 20px 0" :data="userList">
      <el-table-column type="selection" align="center" width="50px" />
      <el-table-column type="index" label="序号" align="center" width="50px" />
      <el-table-column label="id 编号" align="center" prop="id" />
      <el-table-column label="用户名字" align="center" prop="name" />
      <el-table-column label="用户名称" align="center" prop="username" />
      <el-table-column label="用户角色" align="center" prop="roleName" />
      <el-table-column label="创建时间" align="center" prop="createTime" />
      <el-table-column label="更新时间" align="center" prop="updateTime" />
      <el-table-column label="操作" align="center">
        <template #default>
          <el-button type="success" size="small" icon="User">
            分配角色
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            style="margin: 10px 0"
          >
            编辑用户信息
          </el-button>
          <el-button type="danger" size="small" icon="Delete">
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
