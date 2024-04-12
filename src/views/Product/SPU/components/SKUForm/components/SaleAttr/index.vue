<script setup lang="ts">
import { ref } from 'vue'
import { SalesValue } from '@/types/product/spu'

// 对传入的参数进行类型声明
interface Props {
  // 属性 id
  saleAttrId: number
  // 属性名
  name: string
  // 属性列表
  propertyList: SalesValue[]
}

// 接收参数
defineProps<Props>()

// 销售属性 id 和 销售属性值 id
const saleAttrIdAndSaleAttrValueId = ref<string>('')

// 定义自定义事件
defineEmits<{
  // 改变销售属性值列表
  changeSaleAttrValueList: [saleAttrIdAndSaleAttrValueId: string]
}>()
</script>

<template>
  <el-form-item
    class="property-container"
    :label="name"
    style="margin-bottom: 10px"
  >
    <el-select
      style="width: 200px; margin: 0 10px"
      :placeholder="`请选择${name}`"
      v-model="saleAttrIdAndSaleAttrValueId"
      @change="$emit('changeSaleAttrValueList', saleAttrIdAndSaleAttrValueId)"
    >
      <el-option
        v-for="property in propertyList"
        :key="property.id"
        :label="property.saleAttrValueName"
        :value="`${saleAttrId}:${property.id}`"
      />
    </el-select>
  </el-form-item>
</template>

<style scoped lang="scss"></style>
