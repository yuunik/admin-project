<script setup lang="ts">
import Logo from './components/Logo/index.vue'
import Menu from './components/Menu/index.vue'
import Content from './components/Content/index.vue'
import Tabbar from './components/Tabbar/index.vue'
import { useUserStore } from '@/store/index.ts'

// 获取用户的状态管理库
const userStore = useUserStore()
</script>

<template>
  <div class="layout-container">
    <aside class="layout-aside">
      <!--   侧边菜单标题   -->
      <div class="aside-title">
        <!-- 网站图标 -->
        <Logo />
      </div>
      <!--   侧边菜单列表   -->
      <el-scrollbar class="menu-list">
        <el-menu
          text-color="#fff"
          background-color="#001529"
          :default-active="$route.path"
        >
          <!-- 菜单 -->
          <Menu :menuList="userStore.menuRoute" />
        </el-menu>
      </el-scrollbar>
    </aside>
    <!-- 顶部导航区 -->
    <div class="layout-tabbar">
      <Tabbar />
    </div>
    <!--  内容展示区 -->
    <main class="layout-main">
      <Content />
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

      .el-menu {
        border: none;
      }
    }
  }

  .layout-tabbar {
    width: 82%;
    height: 10%;
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
