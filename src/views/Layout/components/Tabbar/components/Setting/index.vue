<script setup lang="ts" name="Setting">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import userAvatar from '@/assets/images/userAvatar.jpg'
import { useUserStore, useLayoutSettingStore } from '@/store'

// 获取基础设置的状态管理库
const layoutSettingStore = useLayoutSettingStore()
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

const router = useRouter()
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
  router.push('/login')
}
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
    <el-button plain size="small" circle icon="Setting" />
    <!-- 用户头像 -->
    <el-avatar :src="userAvatar" size="small" class="user-avatar" />
    <!-- 退出 -->
    <el-dropdown size="small" class="quit">
      <span class="el-dropdown-link">
        <em class="username">{{ userInfo?.username }}</em>
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
    border: 1px solid var(--el-button-bg-color);
    margin: 0 12px;
    cursor: pointer;
  }

  .quit {
    cursor: pointer;
    border: none;
    transition: 0.25s all linear;

    &:hover {
      color: skyblue;
      border: none;
    }

    .username {
      margin-right: 5px;
    }
  }
}
</style>
