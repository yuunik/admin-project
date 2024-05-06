<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ScreenHeader from './components/ScreenHeader/index.vue'

// 大屏模板实例
const containerRef = ref<HTMLDivElement>()

onMounted(() => {
  containerRef.value!.style.transform = `scale(${getFullScreen().scaleWidth}, ${getFullScreen().scaleHeight}) translate(-50%, -50%)`
})

// window 尺寸改变事件
window.addEventListener('resize', () => {
  // 寸尺进行缩放
  containerRef.value!.style.transform = `scale(${getFullScreen().scaleWidth}, ${getFullScreen().scaleHeight}) translate(-50%, -50%)`
})

// 缩放方案一: 只缩小, 不放大
const getBothDownsize = () => {
  const widthRatio = window.innerWidth / 1920
  const heightRatio = window.innerHeight / 1080
  console.log(window.innerWidth)
  console.log(window.innerHeight)
  return widthRatio < heightRatio ? widthRatio : heightRatio
}

// 缩放方案二: 只放大, 不缩小
const getBothZoomIN = () => {
  const widthRatio = window.innerWidth / 1920
  const heightRatio = window.innerHeight / 1080
  return widthRatio < heightRatio ? heightRatio : widthRatio
}

// 缩放方案三: 全屏铺满
const getFullScreen = () => {
  const widthRatio = window.innerWidth / 1920
  const heightRatio = window.innerHeight / 1080
  return {
    scaleWidth: widthRatio,
    scaleHeight: heightRatio,
  }
}

// 缩放方案四: 宽度铺满, 高度等比例放大

// 缩放方案五: 高度铺满, 宽度等比例放大
</script>

<template>
  <div class="screen">
    <div class="container" ref="containerRef">
      <!-- 数据大屏顶部 -->
      <header class="page-header">
        <ScreenHeader />
      </header>
      <!-- 数据大屏内容区 -->
      <main class="content">
        <div class="chart-left">
          <div class="visitor-statistics">实时游客统计</div>
          <div class="gender-ratio">男女比例</div>
          <div class="age-ratio">年龄比例</div>
        </div>
        <div class="center">
          <div class="map">map</div>
          <div class="chart-tendencies">tendencies</div>
        </div>
        <div class="chart-right">right</div>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.screen {
  width: 100vw;
  height: 100vh;
  background: url(../../assets/images/screen/bg.png) no-repeat 0 0 / 100% 100%;

  .container {
    width: 1920px;
    height: 1080px;
    transform-origin: 0 0;
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-wrap: wrap;

    .page-header {
      width: 100%;
      height: 50px;
      display: flex;
    }

    .content {
      height: calc(100% - 50px);
    }
  }
}
</style>
