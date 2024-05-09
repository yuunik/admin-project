<script setup lang="ts" name="Layout">
import { storeToRefs } from 'pinia'
import Logo from './components/Logo/index.vue'
import Menu from './components/Menu/index.vue'
import Content from './components/Content/index.vue'
import Tabbar from './components/Tabbar/index.vue'
import { useUserStore, useSettingStore } from '@/store'

// 获取用户的状态管理库
const userStore = useUserStore()
// 获取状态管理库
const settingStore = useSettingStore()
// 获取是否折叠的标记
const { isFold } = storeToRefs(settingStore)
// 获取修改折叠标记的方法
const { changeIsFold } = settingStore

// 监听窗口大小
window.addEventListener('resize', () => {
  if (window.innerWidth < 1730) {
    // 打开折叠
    changeIsFold(true)
  } else {
    // 关闭折叠
    changeIsFold(false)
  }
})
</script>

<template>
  <div class="layout-container">
    <!-- 侧边菜单栏 -->
    <aside class="layout-aside" :class="{ fold: isFold }">
      <!-- 侧边菜单标题 -->
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
          :collapse="isFold"
          active-text-color="#3A937E"
        >
          <!-- 菜单 -->
          <Menu :menuList="userStore.menuRoute" />
        </el-menu>
      </el-scrollbar>
    </aside>
    <!-- 顶部导航区 -->
    <div class="layout-tabbar" :class="{ fold: isFold }">
      <Tabbar />
    </div>
    <!--  内容展示区 -->
    <main class="layout-main" :class="{ fold: isFold }">
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
    overflow: hidden;
    transition: 0.25s all linear;

    &.fold {
      width: $fold-menu-width;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }

    .menu-list {
      height: calc(100vh - $base-menu-logo-height);
      color: #fff;

      .el-menu {
        border: none;
      }
    }
  }

  // tabbar 样式
  .layout-tabbar {
    width: 82%;
    height: 10%;
    position: fixed;
    top: 0;
    left: 18%;
    padding: 10px;
    box-sizing: border-box;
    transition: 0.25s all linear;

    &.fold {
      @extend %fold-common;
    }
  }

  // 内容区样式
  .layout-main {
    width: 82%;
    height: 90%;
    position: absolute;
    top: 10%;
    left: 18%;
    padding: 20px;
    box-sizing: border-box;
    overflow: auto;
    transition: 0.25s all linear;

    // 折叠样式
    &.fold {
      @extend %fold-common;
    }
  }
}
</style>
