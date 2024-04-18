<script setup lang="ts" name="Role">
import { ref, onMounted } from 'vue'
import { getRoleListAPI } from '@/apis/acl/role'
import type { PageData } from '@/types/common'
import { UserRole } from '@/types/acl/role'

// 分页数据初始化
const pageData = ref<PageData>({
  // 当前页
  page: 0,
  // 每页显示的条数
  limit: 0,
  // 显示条数的选项
  pageSizes: [],
  // 总条数
  total: 0,
})

// 分页器实例
const paginationRef = ref<InstanceType<typeof Pagination>>()

// 角色列表
const roleList = ref<UserRole[]>([])

// 条件查询数据
const keyword = ref<string>('')

// 获取角色列表
const getRoleList = async (page = 1) => {
  // 分页器默认获取第一页数据
  pageData.value.page = page
  // 调用接口, 获取角色列表
  const {
    data: { code, data },
  } = await getRoleListAPI(
    pageData.value.page,
    pageData.value.limit,
    keyword.value,
  )
  if (code === 200) {
    // 更新角色列表
    roleList.value = data.records
  }
}

// 组件挂载后的回调
onMounted(() => {
  // 获取分页数据
  pageData.value = Object.assign(pageData.value, paginationRef.value)
  // 初始化分页数据的显示条数选项
  pageData.value.pageSizes = [2, 4, 6, 8, 10]
  // 默认显示10条数据
  pageData.value.limit = 10
  // 获取角色列表
  getRoleList()
})
</script>

<template>
  <el-card class="role-search" inline>
    <el-form class="search-form">
      <el-form-item label="角色名称">
        <el-input placeholder="请输入角色名称" v-model="keyword" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round>搜索</el-button>
        <el-button round>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card class="role-container">
    <el-button type="primary" round>添加角色</el-button>
    <el-table class="role-table" border :data="roleList">
      <el-table-column type="index" label="序号" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="角色名称" align="center" prop="roleName" />
      <el-table-column label="创建时间" align="center" prop="createTime" />
      <el-table-column label="更新时间" align="center" prop="updateTime" />
      <el-table-column label="操作" align="center" width="350">
        <template #default>
          <el-button type="success" size="default" icon="Plus" round>
            分配权限
          </el-button>
          <el-button type="warning" size="default" icon="Edit" round>
            编辑
          </el-button>
          <el-button type="danger" size="default" icon="Delete" round>
            删除
          </el-button>
        </template>
      </el-table-column>
      <!-- 空状态 -->
      <template #empty>
        <el-empty description="无数据" />
      </template>
    </el-table>
    <!-- 分页器 -->
    <Pagination :getList="getRoleList" ref="paginationRef" />
  </el-card>
</template>

<style scoped lang="scss">
.role-search {
  .search-form {
    display: flex;
    justify-content: space-between;
  }
}

.role-container {
  margin: 20px 0;

  .role-table {
    margin: 20px 0;
  }
}
</style>
