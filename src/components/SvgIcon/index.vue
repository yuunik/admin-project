<script setup lang="ts">
const props = defineProps({
  // 图标名前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  // 图标名
  name: String,
  // 图标颜色
  color: {
    type: String,
    default: '',
  },
  // 图标宽度
  width: {
    type: String,
    default: '16px',
  },
  // 图标高度
  height: {
    type: String,
    default: '16px',
  },
})

console.log(props)
</script>

<template>
  <i class="svg-icon">
    <svg :style="{ width: width, height: height }">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </i>
</template>

<style scoped lang="scss"></style>
