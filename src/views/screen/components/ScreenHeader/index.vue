<script setup lang="ts" name="ScreenHeader">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import dayjs from 'dayjs'

// 统计报告按钮的回调
const showReports = () => ElMessage.info('正在努力开发中...')

// 当前时间
let currentTime = ref<string>('')
// 定时器 id
let timerId = ref<number>(0)

// 组件挂载时获取当前时间
onMounted(() => {
  // 计时器
  timerId.value = setInterval(() => {
    currentTime.value = getCurrentTime()
  }, 1000)
})

// 获取当前时间
const getCurrentTime = () => dayjs().format('YYYY-MM-DD HH:mm:ss')

// 组件销毁时清除计时器
onBeforeUnmount(() => {
  clearInterval(timerId.value)
})
</script>

<template>
  <div class="header-left">
    <!-- 当前时间 -->
    <div class="current-time">
      {{ currentTime }}
    </div>
    <!-- 返回首页按钮 -->
    <div class="homepage-btn" @click="$router.push('/')">首页</div>
  </div>
  <!-- 标题 -->
  <div class="title">智慧旅游可视化大数据平台</div>
  <div class="header-right">
    <!-- 统计报告按钮 -->
    <div class="reports-btn" @click="showReports">统计报告</div>
  </div>
</template>

<style scoped lang="scss">
.header-left {
  width: 415px;
  height: 50px;
  background: url(../../../../assets/images/screen/dataScreen-header-left-bg.png)
    no-repeat 0 0 / 100% 100%;

  /* 消除浮动带来的影响 */
  &::after {
    content: '';
    display: block;
    clear: both;
  }

  .current-time {
    width: 200px;
    height: 50px;
    line-height: 50px;
    margin-left: 10px;
    color: #29fcff;
    float: left;
  }

  /* 首页按钮样式 */
  .homepage-btn {
    width: 150px;
    height: 50px;
    background: url(../../../../assets/images/screen/dataScreen-header-btn-bg-l.png)
      no-repeat 0 0 / 100% 100%;
    font:
      20px 'Microsoft YaHei',
      Arial,
      Helvetica,
      sans-serif;
    color: #29fcff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    float: right;
    transition: 0.25s all linear;

    &:hover {
      transform: translate(-5px);
    }
  }
}

/* 标题样式 */
.title {
  flex: 1;
  height: 74px;
  background: url(../../../../assets/images/screen/dataScreen-header-center-bg.png)
    no-repeat 0 0/ 100% 100%;
  font:
    40px 'Microsoft YaHei',
    Arial,
    Helvetica,
    sans-serif;
  color: #29fcff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-right {
  width: 415px;
  background: url(../../../../assets/images/screen/dataScreen-header-right-bg.png)
    no-repeat 0 0 / 100% 100%;

  /* 统计报告样式 */
  .reports-btn {
    width: 150px;
    height: 50px;
    background: url(../../../../assets/images/screen/dataScreen-header-btn-bg-r.png)
      no-repeat 0 0 / 100% 100%;
    font:
      20px 'Microsoft YaHei',
      Arial,
      Helvetica,
      sans-serif;
    color: #29fcff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.25s all linear;

    &:hover {
      transform: translate(5px);
    }
  }
}
</style>
