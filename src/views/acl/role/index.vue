<script setup lang="ts" name="Role">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { FormRules } from 'element-plus'
import {
  deleteRoleByIdAPI,
  getRoleInfoByIdAPI,
  getRoleListAPI,
} from '@/apis/acl/role'
import type { PageData } from '@/types/common'
import type { UserRole } from '@/types/acl/role'
import { addOrEditRoleAPI } from '@/apis/acl/role'
import type { Permission } from '@/types/acl/permission'
import {
  getPermissionListByRoleIdAPI,
  assignPermissionToRoleAPI,
} from '@/apis/acl/permission'
import { useLayoutSettingStore } from '@/store'
import { storeToRefs } from 'pinia'

// 分页数据初始化
let pageData = reactive<PageData>({
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
  pageData.page = page
  // 调用接口, 获取角色列表
  const {
    data: { code, data },
  } = await getRoleListAPI(pageData.page, pageData.limit, keyword.value)
  if (code === 200) {
    // 更新角色列表
    roleList.value = data.records
    // 获取分页数据的总条数
    pageData.total = data.total
  }
}

// 组件挂载后的回调
onMounted(() => {
  // 获取分页数据
  pageData = paginationRef.value.pageData
  // 初始化分页数据的显示条数选项
  pageData.pageSizes = [2, 4, 6, 8, 10]
  // 默认显示10条数据
  pageData.limit = 10
  // 获取角色列表
  getRoleList()
})

// 表单是否可见
const dialogVisible = ref<boolean>(false)

// 添加模式
const isAdd = ref<boolean>()

// 添加角色
const addRole = () => {
  // 开启添加模式
  isAdd.value = true
  // 显示表单
  dialogVisible.value = true
}

// 编辑角色
const editRole = async (roleId: number) => {
  // 关闭添加模式
  isAdd.value = false
  // 调用接口, 回显数据
  const {
    data: { code, data },
  } = await getRoleInfoByIdAPI(roleId)
  if (code === 200) {
    // 回显数据
    Object.assign(roleFormData, data)
    // 显示表单
    dialogVisible.value = true
  }
}

// 角色表单数据
const roleFormData = reactive<UserRole>({
  roleName: '',
  remark: '',
})

// 角色表单实例
const roleFormDataRef = ref<InstanceType<typeof ElForm>>()

// 角色表单校验规则
const roleFormDataRules = reactive<FormRules<UserRole>>({
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
})

// 新增或更新角色
const addOrEditRole = async () => {
  // 角色表单预校验
  await roleFormDataRef.value.validate()
  // 调用接口, 新增或更新角色
  const {
    data: { code },
  } = await addOrEditRoleAPI(roleFormData)
  if (code === 200) {
    // 提示成功信息
    ElMessage.success(isAdd.value ? '添加角色成功' : '编辑角色成功')
    // 关闭表单
    dialogVisible.value = false
    // 刷新角色列表
    getRoleList(isAdd.value ? 1 : pageData.page)
  }
}

// 分配角色权限抽屉是否可见
const drawerVisible = ref<boolean>(false)

// 权限树数据
const permissionDataList = ref<Permission[]>([])

// 选中的权限列表
const checkedPermissionList = ref<number[]>([])

// 根据角色权限列表, 获取选中的权限列表
const getCheckedPermissionList = (permissionList: Permission[]) => {
  // 遍历权限列表
  permissionList.forEach((permission) => {
    // 若被勾选, 则添加到选中的权限列表中
    if (permission.select) {
      if (permission.children && permission.children.length > 0) {
        // 若有子节点, 则递归调用子节点
        getCheckedPermissionList(permission.children) // 递归调用子节点
      } else {
        // 若无子节点, 则添加到选中的权限列表中
        checkedPermissionList.value.push(permission.id as number)
      }
    }
  })
  // 结束递归
  return
}

// 角色对象
const role = ref<UserRole>({
  roleName: '',
})
// 打开角色权限抽屉
const openRoleDrawer = async (row: UserRole) => {
  // 保存角色对象
  Object.assign(role.value, row)
  // 调用接口, 获取角色所拥有的权限列表
  const {
    data: { code, data },
  } = await getPermissionListByRoleIdAPI(role.value.id as number)
  if (code === 200) {
    // 更新权限树数据
    Object.assign(permissionDataList.value, data)
    // 重置选中的权限列表
    getCheckedPermissionList(permissionDataList.value)
    // 打开抽屉
    drawerVisible.value = true
  }
}

// 权限数读取的节点名与子节点
const defaultProps = {
  // 节点标签
  label: 'name',
  // 子节点
  children: 'children',
}

// 权限数实例
const permissionTreeRef = ref<InstanceType<typeof ElTree>>()
// 角色权限分配
const assignRolePermissions = async () => {
  const { getHalfCheckedKeys, getCheckedKeys } = permissionTreeRef.value
  const roleId = role.value.id as number
  const permissionId = getCheckedKeys().concat(getHalfCheckedKeys()) as number[]

  // 调用接口, 保存角色权限
  const {
    data: { code },
  } = await assignPermissionToRoleAPI({
    roleId,
    permissionId,
  })
  if (code === 200) {
    // 提示成功信息
    ElMessage.success('分配权限成功')
    // 关闭抽屉
    drawerVisible.value = false
    // 刷新角色列表
    window.location.reload()
  } else {
    // 提示失败信息
    ElMessage.error('分配权限失败')
    // 关闭抽屉
    drawerVisible.value = false
  }
}

// 删除角色的权限
const deletePermissionByRoleId = async (roleId: number) => {
  // 调用接口, 删除角色的权限
  const {
    data: { code },
  } = await deleteRoleByIdAPI(roleId)
  if (code === 200) {
    // 提示成功信息
    ElMessage.success('删除角色权限成功')
    // 关闭抽屉
    drawerVisible.value = false
    // 刷新角色列表
    // window.location.reload()
    getRoleList()
  } else {
    // 提示失败信息
    ElMessage.error('删除角色权限失败')
    // 关闭抽屉
    drawerVisible.value = false
  }
}

// 搜索角色
const searchRole = () => {
  // 获取角色列表
  getRoleList()
  // 清空搜索词
  keyword.value = ''
}

// 获取设置的状态管理库
const layoutSettingStore = useLayoutSettingStore()
// 获取是否刷新的标记
const { isRefresh } = storeToRefs(layoutSettingStore)
// 重置按键的回调
const reset = () => {
  // 刷新
  isRefresh.value = true
  // 更新后, 刷新标记重置
  nextTick(() => {
    // 不刷新
    isRefresh.value = false
  })
}
</script>

<template>
  <el-card class="role-search" inline>
    <el-form class="search-form">
      <el-form-item label="角色名称" class="item">
        <el-input placeholder="请输入角色名称" v-model="keyword" />
      </el-form-item>
      <el-form-item class="item">
        <el-button
          type="primary"
          round
          :disabled="!keyword"
          @click="searchRole"
        >
          搜索
        </el-button>
        <el-button round @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card class="role-container">
    <el-button type="primary" round @click="addRole">添加角色</el-button>
    <el-table class="role-table" border :data="roleList">
      <el-table-column type="index" label="序号" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="角色名称" align="center" prop="roleName" />
      <el-table-column label="创建时间" align="center" prop="createTime" />
      <el-table-column label="更新时间" align="center" prop="updateTime" />
      <el-table-column label="操作" align="center" width="350">
        <template #default="{ row }: { row: UserRole }">
          <el-button
            type="success"
            size="default"
            icon="Plus"
            round
            @click="openRoleDrawer(row)"
          >
            分配权限
          </el-button>
          <el-button
            type="warning"
            size="default"
            icon="Edit"
            round
            @click="editRole(role.id as number)"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`确认删除${row.roleName}吗？`"
            @confirm="deletePermissionByRoleId(row.id as number)"
          >
            <template #reference>
              <el-button type="danger" size="default" icon="Delete" round>
                删除
              </el-button>
            </template>
          </el-popconfirm>
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
  <!-- 添加与编辑表单 -->
  <el-dialog v-model="dialogVisible" :title="isAdd ? '添加角色' : '编辑角色'">
    <el-form
      ref="roleFormDataRef"
      :model="roleFormData"
      :rules="roleFormDataRules"
      label-width="100px"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          placeholder="请输入角色名称"
          v-model="roleFormData.roleName"
        />
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input placeholder="请输入备注信息" v-model="roleFormData.remark" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button round>取消</el-button>
      <el-button type="primary" round @click="addOrEditRole">确定</el-button>
    </template>
  </el-dialog>
  <!-- 分配角色表单 -->
  <el-drawer v-model="drawerVisible" title="分配权限">
    <!-- 权限树 -->
    <el-tree
      style="max-width: 600px"
      :data="permissionDataList"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="checkedPermissionList"
      :props="defaultProps"
      check-on-click-node
      ref="permissionTreeRef"
    />
    <template #footer>
      <el-button round @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" round @click="assignRolePermissions">
        确定
      </el-button>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
.role-search {
  .search-form {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .item {
      margin: auto 0;
    }
  }
}

.role-container {
  margin: 20px 0;

  .role-table {
    margin: 20px 0;
  }
}
</style>
