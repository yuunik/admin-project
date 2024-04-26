<script setup lang="ts" name="Setting">
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
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
    border: 1px solid #DCDFE6;
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
</style>
