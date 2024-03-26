<script setup lang="ts">
defineProps({
  // svg 图标前缀名
  prefix: {
    type: String,
    default: '#icon-',
  },
  // svg 图标名
  name: String,
  // svg 颜色名
  color: {
    type: String,
    default: '',
  },
  // svg 图形宽度
  width: {
    type: String,
    default: '16px',
  },
  // svg 图形高度
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<template>
  <i class="svg-icon">
    <svg :style="{ width: width, height: height }">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </i>
</template>

<style scoped lang="scss"></style>
