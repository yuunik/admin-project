<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { type FormInstance, type FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'
import { LoginReq } from '@/types/user'
import { getTime } from '@/utils'

// 表单对象
const formRef = ref<FormInstance>()
// 表单数据
const form = reactive<LoginReq>({
  username: '',
  password: '',
})
// 表单校验规则
const formRules = reactive<FormRules<LoginReq>>({
  username: [
    {
      required: true,
      message: '用户名不能为空,请重新输入',
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空,请重新输入',
    },
  ],
})

// 获取用户的状态管理库
const userStore = useUserStore()
// 获取方法
const { login } = userStore

// 获取路由器对象
const router = useRouter()

// 是否处于加载状态
const isLoading = ref<boolean>(false)
// 获取时间提示信息
// msg --- 问候语
// timeIcon --- 当前时间图标
const { msg, timeIcon } = getTime()

// 提交表单
const submitForm = async () => {
  // 开启加载状态
  isLoading.value = true
  // 表单校验
  await formRef?.value?.validate()
  try {
    // 调用接口, 实现登录
    await login(form)
    // 关闭加载状态
    isLoading.value = false
    // 提示成功信息
    ElNotification({
      icon: timeIcon,
      message: '登录成功',
      title: msg,
    })
    // 路由跳转
    router.push('/')
  } catch (error) {
    console.log(111111)
    // 关闭加载状态
    isLoading.value = false
    // 提示失败信息
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>

<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0" />
      <el-col :span="12" :xs="24">
        <el-form
          class="login-form"
          ref="formRef"
          :rules="formRules"
          :model="form"
        >
          <div class="form-title">
            <h1>
              <strong>Hello</strong>
            </h1>
            <h2>
              <em>欢迎来到 Chow 平台</em>
            </h2>
          </div>
          <el-form-item class="form-item" prop="username">
            <el-input
              :prefix-icon="User"
              placeholder="请输入您的用户名"
              v-model="form.username"
            />
          </el-form-item>
          <el-form-item class="form-item" prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入您的密码"
              show-password
              v-model="form.password"
            />
          </el-form-item>
          <el-form-item class="form-item">
            <el-button
              type="primary"
              size="default"
              class="form-button"
              @click="submitForm"
              :loading="isLoading"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background: url('../../assets/images/background.jpg') no-repeat 0px 0px /
    cover;

  .login-form {
    position: absolute;
    width: calc(100vw / 2 * 0.75);
    top: 30vh;
    background: url('../../assets/images/login_form.png') no-repeat 0px 0px /
      cover;
    padding: 30px;

    .form-title {
      color: #fff;
      font-style: italic;
      -webkit-text-stroke: #000 0.5px;
      text-shadow: 2px 2px 5px skyblue;

      h1 {
        font-size: 40px;
      }

      h2 {
        font-size: 20px;
      }
    }

    .form-item {
      width: 90%;
      margin-left: auto;
      margin-right: auto;
    }

    .form-button {
      width: 100%;
    }
  }
}
</style>
