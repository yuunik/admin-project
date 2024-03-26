<script setup lang="ts">
import { useRouter } from 'vue-router'
import Menu from '@/views/Layout/components/Menu/index.vue'

interface Props {
  menuList: any
}

// 接收路由对象
defineProps<Props>()

// 菜单跳转
const router = useRouter()
const goMenu = (menu: any) => {
  // router.push(menu.index)
  router.push(menu.index)
}
</script>

<template>
  <template v-for="menu in menuList" :key="menu.path">
    <!-- 没有子路由 -->
    <template v-if="!menu.children">
      <el-menu-item v-if="menu.meta.isShow" :index="menu.path" @click="goMenu">
        <!-- 菜单图标 -->
        <el-icon>
          <component :is="menu.meta.icon" />
        </el-icon>
        <!-- 菜单标题-->
        <em>{{ menu.meta.title }}</em>
      </el-menu-item>
    </template>
    <!-- 只有 1 个子路由 -->
    <template v-if="menu.children && menu.children.length === 1">
      <el-menu-item
        v-if="menu.children[0].meta.isShow"
        :index="menu.children[0].path"
        @click="goMenu"
      >
        <!-- 菜单图标 -->
        <el-icon>
          <component :is="menu.children[0].meta.icon" />
        </el-icon>
        <!-- 菜单标题-->
        <em>{{ menu.children[0].meta.title }}</em>
      </el-menu-item>
    </template>
    <!-- 子路由数量大于 1 -->
    <el-sub-menu
      v-if="menu.children && menu.children.length > 1"
      :index="menu.path"
    >
      <template #title>
        <!-- 菜单图标 -->
        <el-icon>
          <component :is="menu.meta.icon" />
        </el-icon>
        <!-- 菜单标题-->
        <em>{{ menu.meta.title }}</em>
      </template>
      <Menu :menuList="menu.children" />
    </el-sub-menu>
  </template>
</template>

<style scoped lang="scss"></style>
