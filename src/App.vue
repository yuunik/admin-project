<script setup lang="ts">
import { http } from '@/utils'
import { ElMessage } from 'element-plus'

const login = async () => {
  const result = await http({
    url: '/user/login',
    method: 'post',
    data: {
      usename: 'root',
      password: 'root',
    },
  })
  console.log(result)
  ElMessage({
    type: 'success',
    message: '登录成功',
  })
}

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
