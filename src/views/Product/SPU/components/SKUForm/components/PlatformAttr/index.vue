<script setup lang="ts" name="PropertySelector">
import type { AttrValue } from '@/types/product/attr'

// 对传入的参数进行类型声明
interface Props {
  // 属性名
  name: string
  // 属性列表
  propertyList: AttrValue[]
}

// 接收参数
defineProps<Props>()
</script>

<template>
  <el-form-item class="property-container" :label="name">
    <el-select
      style="width: 200px; margin: 0 10px"
      :placeholder="`请选择${name}`"
    >
      <el-option
        v-for="property in propertyList"
        :key="property.id"
        :value="property.id as number"
        :label="property.valueName"
      />
    </el-select>
  </el-form-item>
</template>

<style scoped lang="scss">
.property-container {
  margin-bottom: 10px;
}
</style>
