<script setup lang="ts" name="Screen">
import { ref, onMounted } from 'vue'
// 大屏顶部组件
import ScreenHeader from './components/ScreenHeader/index.vue'
// 实时游客统计图表
import Tourist from './components/Tourist/index.vue'
// 男女比例图表
import Age from './components/Age/index.vue'
// 年龄比例图表
import Gender from './components/Gender/index.vue'
// 地图组件
import Map from './components/Map/index.vue'
// 游客趋势图表
import Tendency from './components/Tendency/index.vue'
// 热门景区排行图表
import Rank from './components/Rank/index.vue'
// 年度游客量对比
import Year from './components/Year/index.vue'
// 预约渠道数据统计图表
import Count from './components/Count/index.vue'

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
        <!-- 左侧图表 -->
        <div class="chart-left">
          <!-- 实时游客统计图表 -->
          <Tourist class="visitor-statistics" />
          <!-- 男女比例图表 -->
          <Gender class="gender-ratio" />
          <!-- 年龄比例图表 -->
          <Age class="age-ratio" />
        </div>
        <!-- 中间内容区 -->
        <div class="center">
          <!-- 地图 -->
          <div class="map">
            <h1>Map</h1>
          </div>
          <!-- 游客趋势图 -->
          <Tendency class="chart-tendencies" />
        </div>
        <!-- 右侧图表 -->
        <div class="chart-right">
          <!-- 热门景区排行 -->
          <Rank class="chart-top" />
          <!-- 年度游客量对比 -->
          <Year class="chart-annual" />
          <!-- 预约渠道数据统计 -->
          <Count class="chart-reservation" />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 数据大屏
.screen {
  width: 100vw;
  height: 100vh;
  background: url(../../assets/images/screen/bg.png) no-repeat 0 0 / 100% 100%;

  // 大屏容器
  .container {
    width: 1920px;
    height: 1080px;
    transform-origin: 0 0;
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-wrap: wrap;

    // 大屏顶部
    .page-header {
      width: 100%;
      height: 50px;
      display: flex;
    }

    // 大屏内容区
    .content {
      display: flex;
      width: 1920px;
      justify-content: space-between;

      // 左侧内容区
      .chart-left {
        width: 450px;
        height: 1010px;
        margin-top: 20px;
        display: flex;
        flex-direction: column;

        // 实时游客统计图表
        .visitor-statistics {
          flex: 1;
        }

        // 男女比例图表
        .gender-ratio {
          flex: 1;
          margin: 10px 0;
        }

        // 年龄比例图表
        .age-ratio {
          flex: 1;
          margin-bottom: 10px;
        }
      }

      .center {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin: 80px 10px 0;

        .map {
          flex: 3.5;
          border: 1px solid #abc;
          border-radius: 20px;
        }

        .chart-tendencies {
          flex: 1.5;
          margin: 10px 0;
        }
      }

      .chart-right {
        width: 450px;
        height: 1010px;
        margin-top: 20px;
        display: flex;
        flex-direction: column;

        .chart-top {
          flex: 1;
        }

        .chart-annual {
          flex: 1;
          margin: 10px 0;
        }

        .chart-reservation {
          flex: 1;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
