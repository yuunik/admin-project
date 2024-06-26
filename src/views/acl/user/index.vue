<script setup lang="ts" name="User">
import { ref, onMounted, reactive, nextTick, computed } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import type { PageData } from '@/types/common'
import {
  addOrUpdateUserAPI,
  assignRoleAPI,
  batchDeleteUserAPI,
  deleteUserByIdAPI,
  getUserListAPI,
  getUserRoleListAPI,
} from '@/apis/acl/user'
import type { User } from '@/types/acl/user'
import { useSettingStore } from '@/store'
import { UserRole } from '@/types/acl/role'

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

// 查询数据对象
let paramData = reactive({
  username: '',
  name: '',
})

/**
 * 获取用户信息列表
 * @param page 当前页(可选值, 默认值为 1)
 * @param username  用户名(可选值)
 * @param name  用户昵称(可选值)
 */
const getUserList = async (page = 1) => {
  // 页码小于 1 时, 默认获取第一页数据
  if (page < 1) {
    pageData.value.page = 1
  } else {
    // 不传入当前页参数时, 默认获取第一页数据
    pageData.value.page = page
  }
  // 调用接口, 获取用户信息列表
  const {
    data: { code, data },
  } = await getUserListAPI(
    pageData.value.page,
    pageData.value.limit,
    paramData.username,
    paramData.name,
  )
  // 响应成功，获取用户信息列表
  if (code === 200) {
    // 更新用户列表数据
    userList.value = data.records
    //  更新分页器数据
    pageData.value.total = data.total
    // 条件查询无结果时, 提示用户
    if (data.total === 0) {
      ElMessage.warning('无查询结果')
    }
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

// 模态框是否显示
const dialogFormVisible = ref<boolean>(false)

// 用户信息对象
const userData = ref<User>({
  // 用户姓名
  username: '',
  // 用户昵称
  name: '',
  // 用户密码
  password: '',
})

// 密码的自定义校验规则
const validatePassword = (_: any, value: any, callback: any) => {
  // 非空校验
  if (value.trim() === '') {
    return callback(new Error('请输入密码'))
  }
  //  长度校验
  if (value.length < 6 || value.length > 16) {
    return callback(new Error('密码长度应为 6 - 16 的非空字符'))
  }
  // 通过校验
  callback()
}

// 表单模板对象
const userFormRef = ref<FormInstance>()
// 注册用户的校验规则
const userRegisterRules = reactive<FormRules<User>>({
  // 用户姓名校验
  username: [
    // 非空校验
    {
      required: true,
      message: '请输入用户姓名',
      trigger: 'blur',
    },
    // 长度校验
    {
      min: 2,
      max: 10,
      message: '用户姓名应为 2 - 10 的非空字符',
      trigger: 'blur',
    },
  ],
  // 用户昵称校验
  name: [
    //  非空校验
    {
      required: true,
      message: '请输入用户昵称',
      trigger: 'blur',
    },
    // 长度校验
    {
      min: 2,
      max: 10,
      message: '用户昵称应为 2 - 10 的非空字符',
      trigger: 'blur',
    },
  ],
  // 用户密码校验
  password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
})

// 打开 dialog
const openDialog = async (user?: User) => {
  // 重置表单
  userData.value = {
    id: undefined,
    username: '',
    name: '',
    password: '',
  }
  // 清空上一次校验出现的错误信息
  await nextTick(() => {
    // 清空用户名的校验信息
    userFormRef.value?.clearValidate('name')
    // 清空用户昵称的校验信息
    userFormRef.value?.clearValidate('username')
    // 清空用户密码的校验信息
    userFormRef.value?.clearValidate('password')
  })
  // 判断是否为编辑模式
  if (user?.id) {
    // 数据回显
    Object.assign(userData.value, user)
  }
  // 打开模态框
  dialogFormVisible.value = true
}

// 添加或编辑用户
const addOrUpdateUser = async () => {
  // 表单预校验
  await userFormRef.value?.validate()
  // 调用接口, 添加或编辑用户
  const {
    data: { code },
  } = await addOrUpdateUserAPI(userData.value)
  if (code === 200) {
    // 提示成功信息
    ElMessage.success(`${userData.value.id ? '编辑' : '添加'}成功`)
    // 刷新浏览器
    window.location.reload()
  } else {
    // 提示失败信息
    ElMessage.error(`${userData.value.id ? '编辑' : '添加'}成功`)
  }
  // 关闭模态框
  dialogFormVisible.value = false
}

// 分配角色表单是否可见
const roleDrawerVisible = ref<boolean>(false)

// 是否全选
const isAllSelected = computed(
  () => selectedRoleList.value.length === roleList.value.length,
)

// 角色列表
const roleList = ref<UserRole[]>([])
// 已选择的角色列表
const selectedRoleList = ref<UserRole[]>([])

// 控制全选框的中间状态的标记（计算属性）
const isIndeterminate = computed(
  () => selectedRoleList.value.length > 0 && !isAllSelected.value,
)

// 全选的回调
const handleAllSelected = (value: string | number | boolean) => {
  // 若全选框被选中, 则勾选所有的单选框
  // 若全选框未被选中, 则取消所有的单选框
  selectedRoleList.value = value ? roleList.value : []
}

// 获取角色列表
const getUserRoleList = async (adminId: number) => {
  const {
    data: {
      code,
      data: { assignRoles, allRolesList },
    },
  } = await getUserRoleListAPI(adminId)
  if (code === 200) {
    // 保存已有角色列表
    selectedRoleList.value = assignRoles
    // 保存角色列表
    roleList.value = allRolesList
  }
}
// 分配角色按键的回调
const openRoleForm = async (user: User) => {
  // 记录要分配角色的用户名
  Object.assign(userData.value, user)
  // 获取用户关联的角色信息列表
  await getUserRoleList(user.id as number)
  // 打开分配角色的抽屉
  roleDrawerVisible.value = true
}

// 批量删除按键是否可点击
const isBatchDelete = ref<boolean>(false)
// 删除的用户id列表
const deleteUserIdList = ref<number[]>([])
// 用户信息表格选项变化时的回调
const handleSelectionChange = (userList: User[]) => {
  // 判断是否有选中的用户
  isBatchDelete.value = userList.length > 0
  // 获取想要删除的用户的id列表
  deleteUserIdList.value = userList.map((user) => user.id) as number[]
}

// 所分配角色的id列表
const roleIdList = ref<number[]>([])
// 分配角色
const allocateRoles = async () => {
  // 获取所选角色的id列表
  roleIdList.value = selectedRoleList.value.map((role) => role.id) as number[]
  // 调用接口, 分配角色
  const {
    data: { code, data },
  } = await assignRoleAPI(roleIdList.value, userData.value.id as number)
  // 判断是否分配成功
  if (code === 200) {
    // 提示成功信息
    ElMessage.success('分配角色成功')
    // 更新列表
    getUserList()
  } else {
    // 提示失败信息
    ElMessage.error(data)
  }
  // 关闭抽屉
  roleDrawerVisible.value = false
}

// 删除用户
const deleteUser = async (userId: number) => {
  const {
    data: { code, data },
  } = await deleteUserByIdAPI(userId)
  if (code === 200) {
    // 提示成功消息
    ElMessage.success('删除成功')
    // 重新渲染页面
    getUserList(
      userList.value.length > 1 ? pageData.value.page : pageData.value.page - 1,
    )
  } else {
    // 提示删除消息
    ElMessage.error(data)
  }
}

// 批量删除用户
const batchDeleteUser = async () => {
  const {
    data: { code, data },
  } = await batchDeleteUserAPI(deleteUserIdList.value)
  if (code === 200) {
    // 提示成功消息
    ElMessage.success('批量删除成功')
    // 重新渲染页面, 若删除的用户数大于当前页的用户数, 则返回上一页
    getUserList(
      deleteUserIdList.value.length >= userList.value.length
        ? pageData.value.page
        : pageData.value.page - 1,
    )
  } else {
    // 提示删除消息
    ElMessage.error(data)
  }
}

// 条件查询
const searchUser = () => {
  // 根据用户名、用户昵称来查找用户
  getUserList()
  // 重置查询参数
  Object.assign(paramData, {
    username: '',
    name: '',
  })
}

// 获取设置的状态管理库
const layoutSettingStore = useSettingStore()
// 获取方法
const { changeIsRefresh } = layoutSettingStore
</script>

<template>
  <el-card class="search-container">
    <el-form class="search">
      <el-form-item label="用户名:" class="username">
        <el-input placeholder="请输入用户名" v-model="paramData.username" />
      </el-form-item>
      <el-form-item label="用户昵称:" class="name">
        <el-input placeholder="请输入用户昵称" v-model="paramData.name" />
      </el-form-item>
      <el-form-item class="button">
        <el-button
          type="primary"
          size="default"
          icon="Search"
          @click="searchUser"
        >
          搜索
        </el-button>
        <el-button icon="RefreshRight" @click="() => changeIsRefresh()">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 20px">
    <el-button
      type="primary"
      size="default"
      icon="Plus"
      @click="() => openDialog()"
      v-btn-permission="`btn.User.add`"
    >
      添加用户
    </el-button>
    <el-button
      type="danger"
      size="default"
      icon="Delete"
      :disabled="!isBatchDelete"
      @click="batchDeleteUser"
      v-btn-permission="`btn.User.remove`"
    >
      批量删除
    </el-button>
    <!-- 用户信息展示区 -->
    <el-table
      border
      style="margin: 20px 0"
      :data="userList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="50" />
      <el-table-column type="index" label="序号" align="center" width="50" />
      <el-table-column label="id 编号" align="center" prop="id" />
      <el-table-column label="用户名字" align="center" prop="username" />
      <el-table-column label="用户名称" align="center" prop="name" />
      <el-table-column label="用户角色" align="center" prop="roleName" />
      <el-table-column label="创建时间" align="center" prop="createTime" />
      <el-table-column label="更新时间" align="center" prop="updateTime" />
      <el-table-column
        label="操作"
        align="center"
        width="500"
        style="display: flex; flex-wrap: wrap"
      >
        <template #default="{ row: user }: { row: User }">
          <el-button
            type="success"
            size="default"
            icon="User"
            @click="openRoleForm(user)"
            v-btn-permission="`btn.User.assgin`"
          >
            分配角色
          </el-button>
          <el-button
            type="primary"
            size="default"
            icon="Edit"
            @click="openDialog(user)"
            v-btn-permission="`btn.User.update`"
          >
            编辑用户信息
          </el-button>
          <el-popconfirm
            title="是否确认删除该用户"
            @confirm="deleteUser(user.id as number)"
          >
            <template #reference>
              <el-button type="danger" size="default" icon="Delete">
                删除用户信息
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
      <!-- 表格空数据展示区 -->
      <template #empty>
        <!-- 无数据时的展示区 -->
        <el-empty description="暂无数据" />
      </template>
    </el-table>
    <!-- 分页器 -->
    <Pagination :getList="getUserList" ref="paginationRef" />
  </el-card>
  <!-- 新增与修改用户信息的表单 -->
  <el-dialog
    v-model="dialogFormVisible"
    width="500"
    :title="userData.id ? '编辑用户信息' : '添加用户信息'"
    align-center
  >
    <el-form ref="userFormRef" :model="userData" :rules="userRegisterRules">
      <el-form-item label="用户姓名" prop="username">
        <el-input placeholder="请输入用户姓名" v-model="userData.username" />
      </el-form-item>
      <el-form-item label="用户昵称" prop="name">
        <el-input placeholder="请输入用户昵称" v-model="userData.name" />
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input
          placeholder="请输入用户密码"
          type="password"
          v-model="userData.password"
          show-password
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="addOrUpdateUser">确认</el-button>
    </template>
  </el-dialog>
  <!-- 为用户分配角色的表单 -->
  <el-drawer v-model="roleDrawerVisible">
    <template #header>
      <h3>分配用户角色</h3>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input v-model="userData.username" disabled />
        </el-form-item>
        <el-form-item label="角色列表">
          <el-checkbox
            v-model="isAllSelected"
            :indeterminate="isIndeterminate"
            @change="handleAllSelected"
          >
            全选
          </el-checkbox>
          <el-checkbox-group v-model="selectedRoleList">
            <el-checkbox
              v-for="role in roleList"
              :key="role.id"
              :value="role"
              :label="role.roleName"
            />
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="roleDrawerVisible = false">取消</el-button>
      <el-button type="primary" @click="allocateRoles">确定</el-button>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
.search-container {
  .search {
    display: flex;
    justify-content: space-between;
  }
}
</style>
