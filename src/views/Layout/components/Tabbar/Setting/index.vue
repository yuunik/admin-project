<script setup lang="ts">
import userAvatar from '@/assets/images/userAvatar.jpg'
</script>

<template>
  <div class="setting">
    <!-- 刷新 -->
    <el-button plain size="small" circle icon="Refresh" />
    <!-- 全屏 -->
    <el-button plain size="small" circle icon="FullScreen" />
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
