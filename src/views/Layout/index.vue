<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import {
  HomeFilled,
  DataBoard,
  Lock,
  Handbag,
  ArrowUp,
  ArrowDown,
} from '@element-plus/icons-vue'
import { getUserInfoAPI } from '@/apis/user'
import Logo from './components/Logo/index.vue'

// 用户信息
let userInfo = reactive({})

// 获取用户信息
const getUserInfo = async () => {
  const result = await getUserInfoAPI()
  // 响应信息
  userInfo = result.data.data
  console.log(userInfo)
}
// 组件挂载后执行
onMounted(() => {
  // 获取用户信息
  getUserInfo()
})
</script>

<template>
  <div class="layout-container">
    <aside class="layout-aside">
      <!--   侧边菜单标题   -->
      <div class="aside-title">
        <Logo />
      </div>
      <!--   侧边菜单列表   -->
      <el-scrollbar class="menu-list">
        <el-menu text-color="#fff" background-color="#001529">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">数据大屏</el-menu-item>
          <!-- 二级菜单 -->
          <el-sub-menu index="3">
            <template #title>权限管理</template>
            <el-menu-item index="3-1">item one</el-menu-item>
            <el-menu-item index="3-2">item two</el-menu-item>
            <el-menu-item index="3-3">item three</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>商品管理</template>
            <el-menu-item index="4-1">item one</el-menu-item>
            <el-menu-item index="4-2">item two</el-menu-item>
            <el-menu-item index="4-3">item three</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </aside>
    <div class="layout-tarbar">23</div>
    <main class="layout-main">
      <div class="content">11111</div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100%;

  .layout-aside {
    width: 18%;
    height: 100%;
    background-color: $base-menu-background-color;

    .menu-list {
      height: calc(100vh - $base-menu-logo-height);
      color: #fff;
    }
  }

  .layout-tarbar {
    width: 82%;
    height: 10%;
    background-color: red;
    position: fixed;
    top: 0;
    left: 18%;
  }

  .layout-main {
    width: 82%;
    height: 90%;
    background-color: skyblue;
    position: absolute;
    top: 10%;
    left: 18%;
    padding: 20px;
    box-sizing: border-box;
    overflow: auto;

    .content {
      height: 2000px;
    }
  }
}
</style>
