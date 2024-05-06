<script setup lang="ts" name="ChartBox">
// 图标容器组件
interface Props {
  chartTitle: string
}

defineProps<Props>()
</script>

<template>
  <div class="chart-box">
    <div class="header">
      <em class="chart-title">{{ chartTitle }}</em>
      <i class="title-border"></i>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.chart-box {
  background: url(../../assets/images/screen/dataScreen-main-lb.png) no-repeat 0
    0 / 100% 100%;

  .header {
    .chart-title {
      margin-left: 20px;
      color: #fff;
      font-size: 20px;
    }

    // 标题
    .title-border {
      width: 68px;
      height: 7px;
      margin: 10px 0 0 20px;
      background: url(../../assets/images/screen/dataScreen-title.png) no-repeat
        0 0 / 100% 100%;
      display: block;
    }
  }

  .content {
    height: calc(100% - 35.48px);
  }
}
</style>
