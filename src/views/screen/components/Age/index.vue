<script setup lang="ts" name="AgeChart">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

// 年龄比例饼状图实例
const ageRatioChartRef = ref<HTMLDivElement>()

// 初始化图表
const initAgeRatioChart = () => {
  // 获取年龄比例饼状图实例
  const ageRatioChart = ageRatioChartRef.value

  // 绘制饼状图
  const myChart = echarts.init(ageRatioChart)
  // 设置饼状图配置
  myChart.setOption({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: 20,
      right: 0,
      orient: 'vertical',
      textStyle: {
        color: '#fff',
        fontSize: 14,
      },
    },
    series: [
      {
        name: '年龄比例分布',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 2,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 20, name: '10岁以下' },
          { value: 8, name: '10 - 18 岁' },
          { value: 12, name: '18 - 30 岁' },
          { value: 24, name: '30 - 40 岁' },
          { value: 20, name: '40 - 60 岁' },
          { value: 20, name: '60 岁以上' },
        ],
      },
    ],
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  })
}

// 组件挂载后执行
onMounted(() => {
  // 初始化图表
  initAgeRatioChart()
})
</script>

<template>
  <ChartBox chart-title="年龄比例" class="age-ratio">
    <!-- 年龄比例饼状图 -->
    <div class="chart" ref="ageRatioChartRef" />
  </ChartBox>
</template>

<style scoped lang="scss">
.age-ratio {
  .chart {
    height: 260px;
    margin: 5px 5px 0 0;
  }
}
</style>
