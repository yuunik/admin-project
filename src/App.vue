<script setup lang="ts">
import { Plus, Edit, Minus } from '@element-plus/icons-vue'
//@ts-expect-error 忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import Chinese from 'element-plus/dist/locale/zh-cn.mjs'
import Son from '@/components/Son.vue'
</script>

<template>
  <el-button type="primary" size="default" :icon="Plus">测试按键</el-button>
  <el-button type="success" size="default" :icon="Edit">测试按键</el-button>
  <el-button type="danger" size="default" :icon="Minus">测试按键</el-button>
  <el-config-provider :locale="Chinese">
    <el-pagination
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000"
    />
  </el-config-provider>
  <Son />
</template>

<style scoped lang="scss"></style>
