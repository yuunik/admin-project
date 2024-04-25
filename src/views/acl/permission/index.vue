<script setup lang="ts" name="Permission">
import { ref, onMounted } from 'vue'
import type { Permission } from '@/types/acl/permission'
import { getPermissionListAPI } from '@/apis/acl/permission'
// 权限列表
const permissionList = ref<Permission[]>()

// 获取权限列表
const getPermissionList = async () => {
  const {
    data: { code, data },
  } = await getPermissionListAPI()
  if (code === 200) {
    permissionList.value = data
  }
}

// 组件挂载时获取权限列表
onMounted(() => {
  getPermissionList()
})
</script>

<template>
  <div class="permission">
    <el-table
      :data="permissionList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="name" label="名称" sortable />
      <el-table-column prop="code" label="权限值" sortable />
      <el-table-column prop="updateTime" label="修改时间" sortable />
      <el-table-column label="操作">
        <template #default="{ row: permission }: { row: Permission }">
          <el-button
            :type="permission.level === 3 ? 'warning' : 'success'"
            size="small"
            icon="Plus"
            text
            :style="{ opacity: permission.level !== 4 ? 1 : 0 }"
          >
            {{ permission.level === 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            text
            v-if="permission.level !== 1"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="small"
            icon="Delete"
            text
            v-if="permission.level !== 1"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="scss"></style>
