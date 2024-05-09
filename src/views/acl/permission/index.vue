<script setup lang="ts" name="Permission">
import { ref, onMounted } from 'vue'
import type { Permission } from '@/types/acl/permission'
import {
  addOrUpdatePermissionAPI,
  deletePermissionAPI,
  getPermissionListAPI,
} from '@/apis/acl/permission'
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

// 权限表单数据
const permissionFormData = ref<Permission>({
  // 权限名称
  name: '',
  // 权限值
  code: '',
  // 权限等级
  level: 0,
  // 父级权限id
  pid: 0,
})

// 添加菜单/功能的表单显隐
const dialogVisible = ref<boolean>(false)
// 是否操作功能相关的动作标记
const isThirdLevel = ref<boolean>(false)
// 打开添加菜单/添加功能的模态框
const openAddModal = (flag: boolean, permission: Permission) => {
  // 表单重置
  Object.assign(permissionFormData.value, {
    name: '',
    code: '',
    level: 0,
    pid: 0,
  })
  // 记录为编辑状态
  isEdit.value = false
  // 是否操作功能相关的动作标记
  isThirdLevel.value = flag
  // 记录权限的父级 id
  permissionFormData.value.pid = permission.id as number
  // 记录权限的等级
  permissionFormData.value.level = permission.level + 1
  // 显示模态框
  dialogVisible.value = true
}

// 是否为编辑状态
const isEdit = ref<boolean>(false)
// 打开编辑菜单/功能的模态框
const openEditModal = (flag: boolean, permission: Permission) => {
  // 记录为编辑状态
  isEdit.value = true
  // 是否操作功能相关的动作标记
  isThirdLevel.value = flag
  // 回显数据
  Object.assign(permissionFormData.value, permission)
  // 显示模态框
  dialogVisible.value = true
}
// 添加菜单/功能
const addOrUpdatePermission = async () => {
  const {
    data: { code },
  } = await addOrUpdatePermissionAPI(permissionFormData.value)
  if (code === 200) {
    // 提示成功信息
    ElMessage.success(
      isThirdLevel.value
        ? isEdit.value
          ? '编辑功能成功'
          : '添加功能成功'
        : isEdit.value
          ? '编辑菜单成功'
          : '添加菜单成功',
    )
    // 关闭模态框
    dialogVisible.value = false
    // 重新获取权限列表
    getPermissionList()
  } else {
    // 提示错误信息
    ElMessage.error(
      isThirdLevel.value
        ? isEdit.value
          ? '编辑功能失败'
          : '添加功能失败'
        : isEdit.value
          ? '编辑菜单失败'
          : '添加菜单失败',
    )
    // 关闭模态框
    dialogVisible.value = false
  }
}

// 删除权限
const deletePermission = async (id: number) => {
  try {
    await ElMessageBox.confirm('是否删除该权限, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    // 确认删除
    const {
      data: { code },
    } = await deletePermissionAPI(id)
    if (code === 200) {
      // 提示成功信息
      ElMessage.success('删除权限成功')
      // 重新获取权限列表
      getPermissionList()
    } else {
      // 提示错误信息
      ElMessage.error('删除权限失败')
    }
  } catch (err) {
    ElMessage.info('已取消删除')
  }
}
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
            @click="
              openAddModal(permission.level === 3 ? true : false, permission)
            "
            v-btn-permission="`btn.Permission.add`"
          >
            {{ permission.level === 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            text
            v-if="permission.level !== 1"
            @click="
              openEditModal(permission.level === 3 ? true : false, permission)
            "
            v-btn-permission="`btn.Permission.update`"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="small"
            icon="Delete"
            text
            v-if="permission.level !== 1"
            @click="deletePermission(permission.id as number)"
            v-btn-permission="`btn.Permission.remove`"
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
      v-model="dialogVisible"
    >
      <el-form>
        <el-form-item label="名称">
          <el-input
            placeholder="请输入菜单名称"
            v-model="permissionFormData.name"
          />
        </el-form-item>
        <el-form-item label="权限">
          <el-input
            placeholder="请输入权限数值"
            v-model="permissionFormData.code"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button icon="Close" text @click="dialogVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          icon="Select"
          text
          @click="addOrUpdatePermission"
        >
          确认
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
