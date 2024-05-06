<script setup lang="ts" name="GenderChart">
// echart
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

// 男女比例图表实例
const genderChartRef = ref<HTMLDivElement>()
// 初始化男女比例图表
const initGenderChart = () => {
  const chart = echarts.init(genderChartRef.value!)
  chart.setOption({
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    series: [
      // 男士比例
      {
        type: 'bar',
        data: [60],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: '#007AFE',
          borderRadius: 20,
        },
        label: {
          show: true,
          position: 'bottom',
          formatter: '男士 {c} %',
          color: '#fff',
          fontSize: 14,
        },
      },
      // 女士比例
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        // 调整女士柱状条位置
        barGap: '-100%',
        itemStyle: {
          color: '#FF4B7A',
          borderRadius: 20,
        },
        label: {
          show: true,
          position: ['80%', '120%'],
          formatter: '女士 40 %',
          color: '#fff',
          fontSize: 14,
        },
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

// 组件挂载后的回调
onMounted(() => {
  // 初始化男女比例图表
  initGenderChart()
})
</script>

<template>
  <!-- 性别比例 -->
  <ChartBox chart-title="男女比例">
    <!-- 头像图片 -->
    <div class="profile">
      <div class="profile-man">
        <span class="title">男士</span>
        <div class="man">
          <img src="../../../../assets/images/screen/man.png" alt="man" />
        </div>
      </div>
      <div class="profile-woman">
        <span class="title">女士</span>
        <div class="woman">
          <img src="../../../../assets/images/screen/woman.png" alt="woman" />
        </div>
      </div>
    </div>
    <!-- 比例尺 -->
    <div class="gender-chart" ref="genderChartRef" />
  </ChartBox>
</template>

<style scoped lang="scss">
.profile {
  height: 100%;
  top: -35.48px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .profile-man {
    width: 111px;
    height: 116px;
    background: url(../../../../assets/images/screen/man-bg.png);
    text-align: center;
    color: #fff;

    .man {
      width: 100%;
      height: 100%;
      position: relative;
      top: -13.8px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 61px;
        height: 61px;
      }
    }
  }

  .profile-woman {
    width: 111px;
    height: 116px;
    background: url(../../../../assets/images/screen/woman-bg.png);
    text-align: center;
    color: #fff;

    .woman {
      width: 100%;
      height: 100%;
      position: relative;
      top: -13.8px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 61px;
        height: 61px;
      }
    }
  }
}
.gender-chart {
  width: 80%;
  height: 100px;
  position: relative;
  top: -100px;
  margin: 0 auto;
}
</style>
