<script setup lang="ts" name="User">
import { ref, onMounted, reactive, nextTick } from 'vue'
import type { PageData } from '@/types/common'
import { addOrUpdateUserAPI, getUserListAPI } from '@/apis/acl/user'
import type { User } from '@/types/acl/user'
import { FormInstance, FormRules } from 'element-plus'
import { addOrUpdateAttrInfoAPI } from '@/apis/product/attr'

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
const validatePassword = (rules: any, value: any, callback: any) => {
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
const openDialog = async (user: User) => {
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
  if (user.id) {
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
    data: { code, data },
  } = await addOrUpdateUserAPI(userData.value)
  if (code === 200) {
    // 提示成功信息
    ElMessage.success(`${userData.value.id ? '编辑' : '添加'}用户成功`)
    // 更新用户列表
    await getUserList(userData.value.id ? pageData.value : 1)
  } else {
    // 提示失败信息
    ElMessage.error(data)
  }
  // 关闭模态框
  dialogFormVisible.value = false
}
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
    <el-button type="primary" size="default" icon="Plus" @click="openDialog">
      添加用户
    </el-button>
    <el-button type="danger" size="default" icon="Delete">批量删除</el-button>
    <!-- 用户信息展示区 -->
    <el-table border style="margin: 20px 0" :data="userList">
      <el-table-column type="selection" align="center" width="50" />
      <el-table-column type="index" label="序号" align="center" width="50" />
      <el-table-column label="id 编号" align="center" prop="id" />
      <el-table-column label="用户名字" align="center" prop="username" />
      <el-table-column label="用户名称" align="center" prop="name" />
      <el-table-column label="用户角色" align="center" prop="roleName" />
      <el-table-column label="创建时间" align="center" prop="createTime" />
      <el-table-column label="更新时间" align="center" prop="updateTime" />
      <el-table-column label="操作" align="center" width="500">
        <template #default="{ row: user }: { row: User }">
          <el-button type="success" size="default" icon="User">
            分配角色
          </el-button>
          <el-button
            type="primary"
            size="default"
            icon="Edit"
            @click="openDialog(user)"
          >
            编辑用户信息
          </el-button>
          <el-button type="danger" size="default" icon="Delete">
            删除用户信息
          </el-button>
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
  <!-- 表单展示区 -->
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
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="addOrUpdateUser">确认</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.search-container {
  .search {
    display: flex;
    justify-content: space-between;
  }
}
</style>
