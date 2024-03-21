<script setup lang="ts">
import { onMounted } from 'vue'
import { loginAPI } from '@/apis/user'

// 用户登录
const login = async () => {
  const result = await loginAPI({ username: 'root', password: 'root' })
  console.log(result.data.data.token)
}
onMounted(() => {
  login()
})

login()
</script>

<template>
  <span>测试 axios 封装工具</span>
</template>

<style scoped lang="scss">
span {
  font-weight: bolder;
}
</style>
