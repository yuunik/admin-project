<script setup lang="ts" name="PropertySelector">
// 对传入的参数进行类型声明
interface Props {
  // 属性名
  name: string
  // 属性列表
  propertyList: string[] | []
}

// 接收参数
defineProps<Props>()
</script>

<template>
  <el-text>{{ name }}</el-text>
  <el-select style="width: 200px; margin: 0 10px">
    <el-option
      v-for="(property, index) in propertyList"
      :key="index"
      :value="index"
      :label="property"
    />
  </el-select>
</template>

<style scoped lang="scss"></style>
