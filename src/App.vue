<script setup lang="ts">
import { onMounted } from 'vue'
import { loginAPI } from '@/apis/user'

// 用户登录
const login = async () => {
  const result = await loginAPI({ username: 'root', password: 'root' })
}
onMounted(() => {
  login()
})

login()
</script>

<template>
  <!-- 一级路由出口 -->
  <RouterView />
</template>

<style scoped lang="scss">
span {
  font-weight: bolder;
}
</style>
