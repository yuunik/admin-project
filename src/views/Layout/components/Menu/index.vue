<script setup lang="ts">
import { RouteRecordRaw, useRouter } from 'vue-router'
import Menu from '@/views/Layout/components/Menu/index.vue'

interface Props {
  mainRoute: RouteRecordRaw
}

// 接收路由对象
const props = defineProps<Props>()
console.log(props.mainRoute)

// 菜单跳转
const router = useRouter()
const goMenu = (menu: any) => {
  router.push('/home/' + menu.index)
}
</script>

<template>
  <div class="menu">
    <template v-for="subRoute in mainRoute.children" :key="subRoute.path">
      <!-- 二级路由没有子路由 -->
      <el-menu-item
        :index="subRoute.path"
        v-if="!subRoute.children"
        @click="goMenu"
      >
        {{ subRoute.path }}
      </el-menu-item>
      <!-- 二级路由有子路由, 且子路由只有 1 个-->
      <el-sub-menu :index="subRoute.path" v-if="subRoute.children">
        <template #title>{{ subRoute.path }}</template>
        <Menu :mainRoute="subRoute" />
      </el-sub-menu>
    </template>
    <!--<el-menu-item index="2">数据大屏</el-menu-item>-->
    <!--&lt;!&ndash; 二级菜单 &ndash;&gt;-->
    <!--<el-sub-menu index="3">-->
    <!--  <template #title>权限管理</template>-->
    <!--  <el-menu-item index="3-1">item one</el-menu-item>-->
    <!--  <el-menu-item index="3-2">item two</el-menu-item>-->
    <!--  <el-menu-item index="3-3">item three</el-menu-item>-->
    <!--</el-sub-menu>-->
    <!--<el-sub-menu index="4">-->
    <!--  <template #title>商品管理</template>-->
    <!--  <el-menu-item index="4-1">item one</el-menu-item>-->
    <!--  <el-menu-item index="4-2">item two</el-menu-item>-->
    <!--  <el-menu-item index="4-3">item three</el-menu-item>-->
    <!--</el-sub-menu>-->
  </div>
</template>

<style scoped lang="scss"></style>
