<script setup lang="ts">
import { SalesValue } from '@/types/product/spu'

// 对传入的参数进行类型声明
interface Props {
  // 属性名
  name: string
  // 属性列表
  propertyList: SalesValue[]
}

// 接收参数
defineProps<Props>()
</script>

<template>
  <el-form-item
    class="property-container"
    :label="name"
    style="margin-bottom: 10px"
    label-width="110px"
  >
    <el-select
      style="width: 200px; margin: 0 10px"
      :placeholder="`请选择${name}`"
    >
      <el-option
        v-for="property in propertyList"
        :key="property.id"
        :label="property.saleAttrValueName"
        :value="property.id as number"
      />
    </el-select>
  </el-form-item>
</template>

<style scoped lang="scss"></style>
