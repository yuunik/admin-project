<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
// echart 水球图插件
import 'echarts-liquidfill'
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

// 水球图实例
const liquidfillRef = ref<HTMLDivElement>()

// 初始化水球图
const initialLiquidfill = () => {
  const myChart = echarts.init(liquidfillRef.value)
  myChart.setOption({
    //标题组件
    title: {
      text: '水球图',
    },
    //x|y轴组件
    xAxis: {},
    yAxis: {},
    //系列:决定你展示什么样的图形图标
    series: {
      type: 'liquidFill', //系列
      data: [0.6, 0.4, 0.2], //展示的数据
      waveAnimation: true, //动画
      animationDuration: 3,
      animationDurationUpdate: 0,
      radius: '100%', //半径
      outline: {
        //外层边框颜色设置
        show: true,
        borderDistance: 8,
        itemStyle: {
          color: 'skyblue',
          borderColor: '#294D99',
          borderWidth: 8,
          shadowBlur: 20,
          shadowColor: 'rgba(0, 0, 0, 0.25)',
        },
      },
    },
    //布局组件
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  })
}
onMounted(() => {
  // 初始化水球图
  initialLiquidfill()
})
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
            <div class="chart" ref="liquidfillRef"></div>
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

          // 水球图
          .chart {
            height: 200px;
            margin-top: 20px;
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
