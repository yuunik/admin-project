<script setup lang="ts" name="Role"></script>

<template>
  <el-card class="role-search" inline>
    <el-form class="search-form">
      <el-form-item label="角色名称">
        <el-input placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round>搜索</el-button>
        <el-button round>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card class="role-container">
    <el-button type="primary" round>添加角色</el-button>
    <el-table class="role-table" border>
      <el-table-column type="index" label="序号" align="center" />
      <el-table-column label="id" align="center" />
      <el-table-column label="角色名称" align="center" />
      <el-table-column label="创建时间" align="center" />
      <el-table-column label="更新时间" align="center" />
      <el-table-column label="操作" align="center">
        <template #default>
          <el-button type="success" size="small" icon="Plus">
            分配权限
          </el-button>
          <el-button type="warning" size="small" icon="Edit">编辑</el-button>
          <el-button type="danger" size="default" icon="Delete">删除</el-button>
        </template>
      </el-table-column>
      <!-- 空状态 -->
      <template #empty>
        <el-empty description="无数据" />
      </template>
    </el-table>
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
