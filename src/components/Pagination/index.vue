<script setup lang="ts" name="Pagination"></script>

<template>
  <!-- 分页器 -->
  <el-config-provider :locale="Chinese">
    <el-pagination
      v-model:current-page="pageData.page"
      v-model:page-size="pageData.limit"
      :page-sizes="pageData.pageSizes"
      :small="false"
      :disabled="false"
      :background="true"
      layout="prev, pager, next, jumper, -> , total, sizes"
      :total="pageData.total"
      prev-icon="DArrowLeft"
      next-icon="DArrowRight"
      @change="getTradeMarkList"
    />
  </el-config-provider>
</template>

<style scoped lang="scss"></style>
