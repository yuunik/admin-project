<script setup lang="ts" name="SkuForm">
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
import { ElTable } from 'element-plus'
import { Sku } from '@/types/product/sku'
import { addOrUpdateSkuAPI } from '@/apis/product/sku'

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
    imgList.value.forEach((img) => (img.isDefault = false))
  }
}

/**
 * Sku 表单数据初始化 (对外暴露)
 * @param spuId 所属的 SPU 的id
 */
const initSKUData = async (spuId: number, tmId: number) => {
  // 获取 spuId
  skuFormData.value.spuId = spuId
  // 获取品牌id
  skuFormData.value.tmId = tmId
  // 获取三级分类 id
  skuFormData.value.category3Id = selectedThirdCategoryId.value as number
  // 调用接口, 初始化数据
  await Promise.all([
    getAttrInfoList(),
    getSaleAttrList(spuId),
    getImgList(spuId),
  ])
}

// 对向外暴露的属性与方法进行类型申明
interface Expose {
  initSKUData: (spuId: number, tmId: number) => void
}

// 对外暴露
defineExpose<Expose>({
  // 数据初始化的回调
  initSKUData,
})

// sku 表单数据
const skuFormData = ref<Sku>({
  /* 所属的三级分类 id */
  category3Id: undefined,
  /* 价格 */
  price: undefined,
  /* 平台属性 */
  skuAttrValueList: [],
  /* 默认图片 */
  skuDefaultImg: '',
  /* sku 描述 */
  skuDesc: '',
  /* sku 名称 */
  skuName: '',
  /* 销售属性列表 */
  skuSaleAttrValueList: [],
  /* 所属的 spu 的 id */
  spuId: undefined,
  /* 所属的品牌 id */
  tmId: undefined,
  /* sku 重量 */
  weight: undefined,
})

// 表格模板
const tableRef = ref<InstanceType<typeof ElTable>>()
// 设置默认图片
const setDefaultImg = (img: SPUImage) => {
  // 其他图片的默认值、勾选重置
  imgList.value.forEach((img) => {
    img.isDefault = false
    tableRef.value!.toggleRowSelection(img, false)
  })
  // 当前图片设置为默认图片
  img.isDefault = true
  // 当前图片的选项勾选
  tableRef.value!.toggleRowSelection(img, true)
  // 保存默认图片
  skuFormData.value.skuDefaultImg = img.imgUrl
}

// 选择平台属性
const handleChangeAttrList = (attrIdAndAttrValueId: string) => {
  const [attrId, attrValueId] = attrIdAndAttrValueId.split(':')
  // 查找当前属性是否已经存在
  const index = skuFormData.value.skuAttrValueList.findIndex(
    (attr) => attr.attrId === attrId,
  )
  // 不存在则添加
  if (index === -1) {
    skuFormData.value.skuAttrValueList.push({
      attrId: attrId,
      valueId: attrValueId,
    })
  }
}

// 选择销售属性
const handleChangeSaleAttrValueList = (
  saleAttrIdAndSaleAttrValueId: string,
) => {
  // 销售属性 id 和销售属性值 id
  const [saleAttrId, saleAttrValueId] = saleAttrIdAndSaleAttrValueId.split(':')
  // 查找当前销售属性是否已经存在
  const saleAttrValue = skuFormData.value.skuSaleAttrValueList.find(
    (saleAttrValue) => saleAttrValue.saleAttrValeId === Number(saleAttrValueId),
  )
  // 不存在则添加
  if (!saleAttrValue) {
    skuFormData.value.skuSaleAttrValueList.push({
      saleAttrId: saleAttrId,
      saleAttrValeId: saleAttrValueId,
    })
  }
}

// 新增或修改 sku
const addOrUpdateSku = async () => {
  const result = await addOrUpdateSkuAPI(skuFormData.value)
  console.log(result)
}
</script>

<template>
  <el-form label-position="left" label-width="80">
    <el-form-item label="sku 名称">
      <el-input placeholder="请输入 SKU 名称" v-model="skuFormData.skuName" />
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input
        placeholder="请输入价格"
        type="number"
        v-model="skuFormData.price"
      />
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input
        placeholder="请输入重量"
        type="number"
        v-model="skuFormData.weight"
        class="sku-weight"
      />
    </el-form-item>
    <el-form-item label="sku 描述">
      <el-input
        placeholder="请输入 SKU 相关描述"
        type="textarea"
        v-model="skuFormData.skuDesc"
      />
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form inline>
        <PlatformAttr
          v-for="attrInfo in attrInfoList"
          :key="attrInfo.id"
          :name="attrInfo.attrName"
          :property-list="attrInfo.attrValueList"
          @changeAttrList="handleChangeAttrList"
        />
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form inline>
        <SaleAttr
          v-for="saleAttr in saleAttrList"
          :key="saleAttr.id"
          :saleAttrId="saleAttr.id as number"
          :name="saleAttr.saleAttrName"
          :property-list="saleAttr.spuSaleAttrValueList"
          @changeSaleAttrValueList="handleChangeSaleAttrValueList"
        />
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imgList" ref="tableRef">
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
        <el-table-column label="名称">
          <template #default="{ row: img }: { row: SPUImage }">
            <el-text :type="img.isDefault ? 'success' : 'info'">
              {{ img.imgName.substring(0, img.imgName.lastIndexOf('.')) }}
            </el-text>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row: img }: { row: SPUImage }">
            <el-button
              :type="img.isDefault ? 'success' : 'warning'"
              plain
              size="default"
              @click="setDefaultImg(img)"
            >
              {{ img.isDefault ? '设置成功' : '设置为默认图片' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="default"
        plain
        icon="Plus"
        @click="addOrUpdateSku"
      >
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

<style scoped lang="scss">
// 默认图片的名称加粗
.el-text--success {
  font-weight: bold;
}
</style>
