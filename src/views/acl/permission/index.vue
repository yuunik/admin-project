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

// 添加菜单/功能的表单显隐
const addFormVisible = ref<boolean>(false)
// 是否操作功能相关的动作标记
const isThirdLevel = ref<boolean>(false)
// 打开添加菜单/添加功能的模态框
const openAddModal = (flag: boolean) => {
  // 记录为编辑状态
  isEdit.value = false
  // 是否操作功能相关的动作标记
  isThirdLevel.value = flag
  // 显示模态框
  addFormVisible.value = true
}

// 是否为编辑状态
const isEdit = ref<boolean>(false)
// 打开编辑菜单/功能的模态框
const openEditModal = (flag: boolean) => {
  // 记录为编辑状态
  isEdit.value = true
  // 是否操作功能相关的动作标记
  isThirdLevel.value = flag
  // 显示模态框
  addFormVisible.value = true
}

// 权限表单数据
const permissionFormData = ref<Permission>()
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
            @click="openAddModal(permission.level === 3 ? true : false)"
          >
            {{ permission.level === 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            text
            v-if="permission.level !== 1"
            @click="openEditModal(permission.level === 3 ? true : false)"
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
    <!-- 添加与编辑的表单 -->
    <el-dialog
      :title="
        isThirdLevel
          ? isEdit
            ? '编辑功能'
            : '添加功能'
          : isEdit
            ? '编辑菜单'
            : '添加菜单'
      "
      v-model="addFormVisible"
    >
      <el-form>
        <el-form-item label="名称">
          <el-input placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="权限">
          <el-input placeholder="请输入权限数值" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button icon="Close" text>取消</el-button>
        <el-button type="primary" icon="Select" text>确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
