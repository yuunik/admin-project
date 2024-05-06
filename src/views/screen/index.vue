<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ScreenHeader from './components/ScreenHeader/index.vue'
import ChartBox from './components/ChartBox/index.vue'

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
const visitorNumber = ref<string>('215908')
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
          <ChartBox chart-title="实时游客统计" class="visitor-statistics">
            <div class="sub-title">
              可预约总人数
              <em style="color: #965d44">99999</em>
              人
            </div>
            <div class="reservations-made">
              <span
                v-for="(item, index) in visitorNumber"
                :key="index"
                class="number"
              >
                {{ item }}
              </span>
              <span class="unit">人</span>
            </div>
          </ChartBox>
          <ChartBox chart-title="男女比例" class="gender-ratio" />
          <ChartBox chart-title="年龄比例" class="age-ratio" />
        </div>
        <!-- 中间内容区 -->
        <div class="center">
          <!-- 地图 -->
          <div class="map">map</div>
          <!-- 游客趋势图 -->
          <div class="chart-tendencies">tendencies</div>
        </div>
        <!-- 右侧图表 -->
        <div class="chart-right">right</div>
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

        // 实时游客统计
        .visitor-statistics {
          flex: 1;

          &::after {
            content: '';
            display: block;
            clear: both;
          }

          .sub-title {
            float: right;
            color: #fff;
            margin-right: 10px;
          }

          .reservations-made {
            width: 100%;
            position: relative;
            top: 10px;
            font-size: 20px;
            color: #29f6fa;
            display: flex;
            padding: 0 10px;
            box-sizing: border-box;

            .number {
              flex: 1;
              text-align: center;
              height: 40px;
              line-height: 40px;
              background: url(../../assets/images/screen/total.png) no-repeat 0
                0 / 100% 100%;
            }

            .unit {
              flex: 1;
              text-align: center;
              height: 40px;
              line-height: 40px;
              background: url(../../assets/images/screen/total.png) no-repeat 0
                0 / 100% 100%;
            }
          }
        }

        .gender-ratio {
          flex: 1;
          margin: 10px 0;
        }

        .age-ratio {
          flex: 1;
          margin-bottom: 10px;
        }
      }

      .chart-right {
        width: 450px;
        height: 1010px;
        margin-top: 20px;
        background-color: yellowgreen;
      }
    }
  }
}
</style>
