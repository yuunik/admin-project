<script setup lang="ts"></script>

<template>
  我是 Screen
  <el-button type="primary" size="default" @click="$router.go(-1)">
    返回上一级
  </el-button>
</template>

<style scoped lang="scss"></style>
