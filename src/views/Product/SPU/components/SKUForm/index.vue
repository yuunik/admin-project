<script setup lang="ts" name="SKUForm">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
// 平台属性组件
import PlatformAttr from './components/PlatformAttr/index.vue'
// 销售属性组件
import SaleAttr from './components/SaleAttr/index.vue'
import { useCategoryStore } from '@/store'
import type { AttrInfo } from '@/types/product/attr'
import type { SalesAttr, SPUImage } from '@/types/product/spu'
import { getAttrInfoListAPI } from '@/apis/product/attr'
import { getImgListAPI, getSalesPropertyListByIdAPI } from '@/apis/product/spu'

// 由组件触发的自定义事件
defineEmits<{
  // 改变显示模式事件
  changeScene: [{ sceneValue: number; mode: string }]
}>()

// 获取分类的状态管理库
const categoryStore = useCategoryStore()
const { selectedCategoryId, selectedSubCategoryId, selectedThirdCategoryId } =
  storeToRefs(categoryStore)

// 平台属性列表
const attrInfoList = ref<AttrInfo[]>([])
// 销售属性列表
const saleAttrList = ref<SalesAttr[]>([])
// 图片列表
const imgList = ref<SPUImage[]>([])

// 获取平台平台属性
const getAttrInfoList = async () => {
  const {
    data: { code, data },
  } = await getAttrInfoListAPI(
    selectedCategoryId.value!,
    selectedSubCategoryId.value!,
    selectedThirdCategoryId.value!,
  )
  if (code === 200) {
    attrInfoList.value = data
  }
}

// 获取销售属性列表
const getSaleAttrList = async (spuId: number) => {
  const {
    data: { code, data },
  } = await getSalesPropertyListByIdAPI(spuId)
  if (code === 200) {
    saleAttrList.value = data
  }
}

// 获取图片列表
const getImgList = async (spuId: number) => {
  const {
    data: { code, data },
  } = await getImgListAPI(spuId)
  if (code === 200) {
    imgList.value = data
  }
}

/**
 * SKU 表单数据初始化 (对外暴露)
 * @param spuId 所属的 SPU 的id
 */
const initSKUData = async (spuId: number) => {
  await Promise.all([
    getAttrInfoList(),
    getSaleAttrList(spuId),
    getImgList(spuId),
  ])
}

// 对向外暴露的属性与方法进行类型申明
interface Expose {
  initSKUData: (spuId: number) => void
}

// 对外暴露
defineExpose<Expose>({
  // 数据初始化的回调
  initSKUData,
})
</script>

<template>
  <el-form label-position="left" label-width="80">
    <el-form-item label="sku 名称">
      <el-input placeholder="请输入 SKU 名称" />
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input placeholder="请输入价格" type="number" />
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input placeholder="请输入重量" type="number" />
    </el-form-item>
    <el-form-item label="sku 描述">
      <el-input placeholder="请输入 SKU 相关描述" type="textarea" />
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form inline>
        <PlatformAttr
          v-for="attrInfo in attrInfoList"
          :key="attrInfo.id"
          :name="attrInfo.attrName"
          :property-list="attrInfo.attrValueList"
        />
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form>
        <SaleAttr
          v-for="saleAttr in saleAttrList"
          :key="saleAttr.id"
          :name="saleAttr.saleAttrName"
          :property-list="saleAttr.spuSaleAttrValueList"
        />
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imgList">
        <el-table-column type="selection" width="80" />
        <el-table-column label="图片">
          <template #default="{ row: img }: { row: SPUImage }">
            <el-image
              fit="cover"
              style="width: 100px; height: 100px"
              :src="img.imgUrl"
              :alt="img.imgName"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName" />
        <el-table-column label="操作">
          <template #default>
            <el-button type="warning" plain size="default">
              设置为默认图片
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" plain icon="Plus">
        保存
      </el-button>
      <el-button
        size="default"
        plain
        icon="CloseBold"
        @click="$emit('changeScene', { sceneValue: 0, mode: '' })"
      >
        取消
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
