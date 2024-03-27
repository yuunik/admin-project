<script setup lang="ts" name="Setting">
import userAvatar from '@/assets/images/userAvatar.jpg'
import { useLayoutSettingStore } from '@/store'

// 获取基础设置的状态管理库
const layoutSettingStore = useLayoutSettingStore()
// 获取修改是否刷新的方法
const { changeIsRefresh } = layoutSettingStore

// 全屏模式
const getFullScreenMode = () => {
  // 判断当前是否为全屏模式
  const fullscreenElement = document.fullscreenElement
  console.log(fullscreenElement)
  if (!fullscreenElement) {
    // 不是全屏模式, 则切换为全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 是全屏模式, 则退出全屏模式
    document.exitFullscreen()
  }
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
    <el-dropdown>
      <span class="el-dropdown-link">
        Chorria
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
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
}
</style>
