<script setup lang="ts" name="TouristChart">
import { ref, onMounted } from 'vue'
// echart
import * as echarts from 'echarts'
// echart 水球图插件
import 'echarts-liquidfill'

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
  <ChartBox chart-title="实时游客统计" class="tourist-chart">
    <div class="sub-title">
      可预约总人数
      <em style="color: #965d44">99999</em>
      人
    </div>
    <div class="reservations-made">
      <span v-for="(item, index) in visitorNumber" :key="index" class="number">
        {{ item }}
      </span>
      <span class="unit">人</span>
    </div>
    <div class="chart" ref="liquidfillRef" />
  </ChartBox>
</template>

<style scoped lang="scss">
// 实时游客统计
.tourist-chart {
  // 清除浮动带来的影响
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
      background: url(../../../../assets/images/screen/total.png) no-repeat 0 0 /
        100% 100%;
      font-weight: bold;
    }

    .unit {
      flex: 1;
      text-align: center;
      height: 40px;
      line-height: 40px;
      background: url(../../../../assets/images/screen/total.png) no-repeat 0 0 /
        100% 100%;
      font-weight: bold;
    }
  }

  // 水球图
  .chart {
    height: 200px;
    margin-top: 20px;
  }
}
</style>
