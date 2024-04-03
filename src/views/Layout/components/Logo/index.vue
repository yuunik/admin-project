<script setup lang="ts" name="Logo">
import { storeToRefs } from 'pinia'
import basicSetting from '@/setting.ts'
import { useLayoutSettingStore } from '@/store'

const { logo, isLoadingLogo, websiteName } = basicSetting
// 获取状态管理库
const layoutSettingStore = useLayoutSettingStore()
// 获取是否折叠的标记
const { isFold } = storeToRefs(layoutSettingStore)
</script>

<template>
  <div class="logo-container" :class="{ fold: isFold }">
    <img :src="logo" :alt="websiteName" class="logo" v-if="isLoadingLogo" />
    <strong class="website-name" v-show="!isFold">{{ websiteName }}</strong>
  </div>
</template>

<style scoped lang="scss">
.logo-container {
  display: flex;
  align-items: center;
  padding-left: 10px;
  box-sizing: border-box;
  height: $base-menu-logo-height;

  &.fold {
    padding: 0;
  }

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
