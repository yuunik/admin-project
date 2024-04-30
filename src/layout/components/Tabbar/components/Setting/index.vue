<script setup lang="ts" name="Setting">
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import userAvatar from '@/assets/images/userAvatar.jpg'
import { useUserStore, useSettingStore } from '@/store'

// 获取基础设置的状态管理库
const layoutSettingStore = useSettingStore()
// 获取修改是否刷新的方法
const { changeIsRefresh } = layoutSettingStore

// 全屏模式
const getFullScreenMode = () => {
  // 判断当前是否为全屏模式
  const fullscreenElement = document.fullscreenElement
  if (!fullscreenElement) {
    // 不是全屏模式, 则切换为全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 是全屏模式, 则退出全屏模式
    document.exitFullscreen()
  }
}

// 获取用户状态管理库
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const { logout } = userStore

// 获取路由器对象
const router = useRouter()
// 获取路由对象
const route = useRoute()
// 退出系统
const quitSystem = async () => {
  await ElMessageBox.confirm('是否确认退出?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
  // 退出登录
  await logout()
  // 提示成功信息
  ElMessage({
    type: 'success',
    message: '退出成功',
  })
  // 跳转登录页
  router.push({
    path: '/login',
    query: {
      redirect: route.path,
    },
  })
}

// 系统主题色
const primaryColor = ref<string>('#409EFF')

// 预定义颜色列表
const predefineColors = ref<string[]>([
  '#409EFF',
  '#67C23A',
  '#E6A23C',
  '#F56C6C',
  '#909399',
])

// 处理颜色改变的回调
const setPrimaryColor = () => {
  const element = document.documentElement
  element.style.setProperty('--el-color-primary', primaryColor.value)
}

// 获取设置的状态管理库
const settingStore = useSettingStore()
// 获取暗黑模式
const { isDarkMode, isFold } = storeToRefs(settingStore)
// 设置暗黑模式
const { changeDarkMode } = settingStore

// 组件挂载后执行
onMounted(() => {
  /**
   * 暗黑模式判断
   */
  // 获取根节点
  const htmlElement = document.documentElement
  if (isDarkMode.value) {
    htmlElement.classList.add('dark')
  } else {
    htmlElement.classList.remove('dark')
  }
})
</script>

<template>
  <div class="setting">
    <!-- 刷新 -->
    <el-button
      plain
      size="small"
      circle
      icon="Refresh"
      @click="changeIsRefresh"
    />
    <!-- 全屏 -->
    <el-button
      plain
      size="small"
      circle
      icon="FullScreen"
      @click="getFullScreenMode"
    />
    <!-- 用户设置 -->
    <el-popover title="系统设置" placement="bottom" trigger="hover" width="300">
      <!-- 设置内容 -->
      <el-form>
        <el-form-item label="主题颜色">
          <el-color-picker
            v-model="primaryColor"
            show-alpha
            :predefine="predefineColors"
            :teleported="false"
            @change="setPrimaryColor"
          />
        </el-form-item>
        <!-- 模式切换器 -->
        <el-form-item label="暗黑模式">
          <el-switch
            active-action-icon="Moon"
            inactive-action-icon="Sunny"
            v-model="isDarkMode"
            @change="(value) => changeDarkMode(value as boolean)"
            active-color="#2c2c2c"
          />
        </el-form-item>
      </el-form>
      <template #reference>
        <el-button plain size="small" circle icon="Setting" />
      </template>
    </el-popover>
    <!-- 用户头像 -->
    <el-avatar :src="userAvatar" size="small" class="user-avatar" />
    <!-- 退出 -->
    <el-dropdown size="small" class="quit">
      <span class="el-dropdown-link">
        <em class="username">{{ userInfo?.name }}</em>
        <el-icon><ArrowDownBold /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu @click="quitSystem">
          <el-dropdown-item icon="CloseBold">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
.setting {
  display: flex;
  align-items: center;

  .user-avatar {
    border: 1px solid #dcdfe6;
    margin: 0 12px;
    cursor: pointer;
    transition: 0.25s all linear;

    &:hover {
      border: 1px solid #409eff;
    }
  }

  .quit {
    cursor: pointer;
    border: none;
    transition: 0.25s all linear;

    &:hover {
      color: #409eff;
    }

    .username {
      margin-right: 5px;
    }
  }
}

// switch 样式
:deep(.el-switch) {
  .el-switch__core {
    background-color: #f2f2f2;
  }
}

// 激活样式
:deep(.is-checked) {
  .el-switch__core {
    background-color: #2c2c2c;
    border: 1px solid #4c4d4f;

    .el-switch__action {
      color: #fff;
      font-weight: bolder;
    }
  }
}

// switch 未激活的图标样式
:deep(.el-switch__action) {
  background-color: transparent;
  color: black;
  font-weight: bolder;
}
</style>
