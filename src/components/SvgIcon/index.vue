<script setup lang="ts">
interface Props {
  prefix: {
    type: string
    default: '#icon-'
  }
  name: string
  color: {
    type: string
    default: ''
  }
  width: {
    type: string
    default: '16px'
  }
  height: {
    type: string
    default: '16px'
  }
}

defineProps<Props>()
</script>

<template>
  <Fragment>
    <svg :style="{ width: width, height: height }">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </Fragment>
</template>

<style scoped lang="scss"></style>
