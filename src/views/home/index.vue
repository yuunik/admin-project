<script setup lang="ts" name="Home">
// 引入用户头像
import avatar from '@/assets/images/userAvatar.jpg'
// 引入时间提示语工具类
import { getTime } from '@/utils'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'
// 引入系统信息文件
import setting from '@/setting'

// 获取时间问候语, 当前时间图标
const { greeting, timeIcon } = getTime()

// 获取用户的状态管理库
const userStore = useUserStore()
// 获取用户信息
const { userInfo } = storeToRefs(userStore)

// 获取系统名
const { websiteName } = setting
</script>

<template>
  <div class="home">
    <el-card class="user-center">
      <!-- 用户头像 -->
      <el-avatar fit="cover" :src="avatar" class="user-avatar" />
      <!-- 欢迎词 -->
      <section class="welcome">
        <el-space class="greeting">
          <!-- 当前时间图标 -->
          <el-icon size="50">
            <component :is="timeIcon" />
          </el-icon>
          <h1 style="margin-left: 5px">{{ greeting }}, {{ userInfo?.name }}</h1>
        </el-space>
        <p>Welcome to {{ websiteName }}!</p>
      </section>
    </el-card>
    <!-- 主页图片 -->
    <svg-icon
      name="welcome"
      class="homepage-picture"
      width="50%"
      height="50%"
    />
  </div>
</template>

<style scoped lang="scss">
.home {
  height: 100%;
  // el-card 容器
  .user-center {
    // el-card 内容
    :deep(.el-card__body) {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;

      // 用户头像样式
      .user-avatar {
        width: 100px;
        height: 100px;
        border: 1px solid #f0f0f0;
        cursor: pointer;
        transition: 0.67s all linear;

        &:hover {
          border-radius: 20px;
          box-shadow: 0 0 10px black;
          transform: translate(0, -10px) scale(1.02);
        }
      }

      // 欢迎词样式
      .welcome {
        margin-left: 50px;

        p {
          color: #abc;
          font-weight: bold;
        }
      }
    }
  }

  // 主页图片样式
  .homepage-picture {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: calc(100% - 170.06px);
  }
}
</style>
