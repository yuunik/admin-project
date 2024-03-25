<script setup lang="ts">
import { RouteRecordRaw, useRouter } from 'vue-router'
import Menu from '@/views/Layout/components/Menu/index.vue'

interface Props {
  mainRoute: RouteRecordRaw
}

// 接收路由对象
const props = defineProps<Props>()

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
        <el-icon>
          <component :is="subRoute.icon" />
        </el-icon>
        <em>{{ subRoute.path }}</em>
      </el-menu-item>
      <!-- 二级路由有子路由, 且子路由只有 1 个-->
      <el-sub-menu :index="subRoute.path" v-if="subRoute.children">
        <template #title>
          <!-- 路由图标 -->
          <el-icon>
            <component :is="subRoute.icon" />
          </el-icon>
          {{ subRoute.path }}
        </template>
        <!-- 路由图标 -->
        <Menu :mainRoute="subRoute" />
      </el-sub-menu>
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
