<script setup lang="ts">
import basicSetting from '@/setting.ts'

const { logo, isLoadingLogo, websiteName } = basicSetting
</script>

<template>
  <div class="logo-container">
    <img :src="logo" alt="网站图标" class="logo" v-if="isLoadingLogo" />
    <strong class="website-name">{{ websiteName }}</strong>
  </div>
</template>

<style scoped lang="scss">
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  box-sizing: border-box;
  height: $base-menu-logo-height;

  img {
    width: 50px;
  }

  .website-name {
    color: #fff;
    margin-left: 10px;
    font-size: $base-logo-title-fontSize;
    font-style: italic;
    -webkit-text-stroke: 0.8px #000;
    text-shadow: 1px 1px 10px #fff;
  }
}
</style>
