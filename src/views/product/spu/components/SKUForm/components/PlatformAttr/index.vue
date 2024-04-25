<script setup lang="ts" name="PropertySelector">
import { ref } from 'vue'
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

// 平台属性 id 和 平台属性值 id
const attrIdAndAttrValueId = ref<string>('')

// 对自定义的事件进行类型声明
interface Emit {
  (e: 'changeAttrList', value: string): void
}

// 发送自定义事件
defineEmits<Emit>()
</script>

<template>
  <el-form-item class="property-container" :label="name">
    <el-select
      style="width: 200px; margin: 0 10px"
      :placeholder="`请选择${name}`"
      v-model="attrIdAndAttrValueId"
      @change="$emit('changeAttrList', attrIdAndAttrValueId)"
    >
      <el-option
        v-for="property in propertyList"
        :key="property.id"
        :value="`${property.attrId}: ${property.id}`"
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
