<script setup lang="ts">
import { getUserInfoAPI } from '@/apis/user'
import { UserInfo } from '@/types/user';
import { onMounted, reactive, ref } from 'vue'

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
    <aside class="layout-aside">12</aside>
    <div class="layout-tarbar">23</div>
    <main class="layout-main">34</main>
  </div>
</template>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100%;

  .layout-aside {
    width: 18%;
    height: 100%;
    background-color: #150303;
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
    overflow: auto;
  }
}
</style>
