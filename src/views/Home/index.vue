<script setup lang="ts" name="Home">
import { onMounted } from 'vue'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { getUserInfo } = userStore
const { userInfo } = storeToRefs(userStore)

// 组件挂载后调用
onMounted(async () => {
  await getUserInfo()
  console.log(2, userInfo.value)
})
</script>

<template>
  <div class="home">
    <h1>我是 Home</h1>
    <RouterView />
  </div>
</template>

<style scoped lang="scss"></style>
