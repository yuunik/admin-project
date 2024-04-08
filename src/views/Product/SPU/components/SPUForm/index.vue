<script setup lang="ts" name="SPUForm">
import { computed, ref } from 'vue'
import type { UploadFile, UploadRawFile, UploadUserFile } from 'element-plus'
import {
  getImgListAPI,
  getSalesPropertyListAPI,
  getSalesPropertyListByIdAPI,
  getTrademarkListAPI,
} from '@/apis/product/spu'
import type { TradeMark } from '@/types/product/trademark'
import type { SPU, SPUImage } from '@/types/product/spu'
import type { SalesProperty } from '@/types/product/spu'
import { SalesAttr } from '@/types/product/spu'

// 对传入的自定义函数进行类型声明
interface Emits {
  // 修改显示模式
  (e: 'changeScene', scene: number): void
}

const emit = defineEmits<Emits>()

// 品牌列表
const trademarkList = ref<TradeMark[]>()
// 获取品牌列表
const getTrademarkList = async () => {
  const {
    data: { code, data },
  } = await getTrademarkListAPI()
  if (code === 200) {
    // 保存品牌列表
    trademarkList.value = data
  }
}

// 图片列表
const imgList = ref<SPUImage[]>([])
// 获取所属 spu 下的图片列表
const getImgList = async (spuId: number) => {
  const {
    data: { code, data },
  } = await getImgListAPI(spuId)
  if (code === 200) {
    // 保存图片列表
    imgList.value = data
  }
}

// 销售属性列表
const salesPropertyList = ref<SalesProperty[]>()
// 获取销售属性列表
const getSalesPropertyList = async () => {
  const {
    data: { code, data },
  } = await getSalesPropertyListAPI()
  if (code === 200) {
    // 保存销售属性列表
    salesPropertyList.value = data
  }
}

// 已有的销售属性列表
const ownSalesPropertyList = ref<SalesAttr[]>()
// 获取已有的销售属性列表
const getOwnSalesPropertyList = async (spuId: number) => {
  const {
    data: { code, data },
  } = await getSalesPropertyListByIdAPI(spuId)
  if (code === 200) {
    // 保存已有的销售属性列表
    ownSalesPropertyList.value = data
  }
}

// spu 数据对象
let spuData = ref<SPU>({
  /* spu 名称 */
  spuName: '',
  /* spu 描述 */
  description: '',
  /* 所属的三级分类 */
  category3Id: undefined,
  /* 所属的品牌id */
  tmId: undefined,
  /* 销售属性列表 */
  spuSaleAttrList: [],
  /* 图片列表 */
  spuImageList: [],
})
// 数据初始化(对外暴露)
const initData = async (spu: SPU) => {
  // 调用接口, 初始化数据
  await Promise.all([
    getTrademarkList(),
    getImgList(spu.id as number),
    getSalesPropertyList(),
    getOwnSalesPropertyList(spu.id as number),
  ])
  // 重置 spu 数据
  Object.assign(spu, {
    spuImageList: imgList.value,
    spuSaleAttrList: ownSalesPropertyList.value,
  })
  // 保存 spu 表单数据
  spuData.value = spu
}

// 对向外暴露的属性与方法进行类型申明
interface Expose {
  // 数据方法
  initData: (spu: SPU) => void
}

// 对外暴露属性与方法
defineExpose<Expose>({
  initData,
})

// 用于展示的图片列表
const fileList = computed<UploadUserFile[]>(() =>
  imgList.value.map((img) => ({ name: img.imgName, url: img.imgUrl })),
)

// 控制预览大图显隐的标记
const dialogVisible = ref<boolean>(false)
// 预览图片的地址
const dialogImageUrl = ref<string>()
// 图片预览
const handlePictureCardPreview = (uploadFile: UploadFile) => {
  // 预判图片地址
  dialogImageUrl.value = uploadFile.url
  // 显示预判大图
  dialogVisible.value = true
}

// 删除图片
const handleRemove = (uploadFile: UploadFile) => {
  // 移除显示图片时, 也移除上传图片列表的图片
  imgList.value = imgList.value.filter((img) => img.imgUrl !== uploadFile.url)
}

// 上传图片前的回调
const handleBeforeUpload = (img: UploadRawFile) => {
  if (
    img.type === 'img/jpeg' ||
    img.type === 'img/png' ||
    img.type === 'img/gif'
  ) {
    if (img.size / 1024 / 1024 < 4) {
      return true
    } else {
      // 提示错误信息
      ElMessage({
        type: 'error',
        message: '仅支持容量小于 4MB 的图片',
      })
      return false
    }
  } else {
    // 提示错误
    ElMessage({
      type: 'error',
      message: '仅支持格式为 jpg | png | gif 的图片',
    })
    return false
  }
}
</script>

<template>
  <el-form class="spu-form">
    <el-form-item label="SPU 名称">
      <el-input placeholder="请输入 SPU 名称" v-model="spuData.spuName" />
    </el-form-item>
    <el-form-item label="SPU 品牌" style="width: 250px">
      <el-select placeholder="请选择品牌" v-model="spuData.tmId">
        <el-option
          v-for="trademark in trademarkList"
          :key="trademark.id"
          :value="trademark.id"
          :label="trademark.tmName"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="SPU 描述">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="请输入相关描述"
        v-model="spuData.description"
      />
    </el-form-item>
    <el-form-item label="SPU 照片">
      <el-upload
        v-model:file-list="fileList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handleBeforeUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible" class="preview-container">
        <img :src="dialogImageUrl" alt="预览图片" class="preview-img" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU 销售属性">
      <!-- 展示销售属性的下拉菜单 -->
      <el-select placeholder="请选择销售属性" class="sales-attributes">
        <el-option
          v-for="salesProperty in salesPropertyList"
          :key="salesProperty.id"
          :value="salesProperty.id"
          :label="salesProperty.name"
        />
      </el-select>
      <el-button type="primary" size="default" plain icon="Plus">
        添加销售属性
      </el-button>
      <el-table style="margin: 20px 0" border :data="spuData.spuSaleAttrList">
        <el-table-column label="序号" type="index" align="center" width="80" />
        <el-table-column label="属性名" prop="saleAttrName" />
        <el-table-column label="属性值">
          <template
            v-for="saleAttr in spuData.spuSaleAttrList"
            :key="saleAttr.id"
          >
            <el-tag
              closable
              v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"
              :key="saleAttrValue.id"
              style="margin-right: 20px"
            >
              {{ saleAttrValue.saleAttrValueName }}
            </el-tag>
          </template>
          <!-- 添加属性值的按键 -->
          <el-button type="success" size="default" plain icon="Plus" />
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template #default>
            <el-button type="danger" size="default" plain icon="Delete" />
          </template>
        </el-table-column>
        <!-- 空数据展示区 -->
        <template #empty>
          <el-empty description="无数据" />
        </template>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" plain icon="Select">
        保存
      </el-button>
      <el-button
        size="default"
        plain
        icon="CloseBold"
        @click="emit('changeScene', 0)"
      >
        取消
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
.spu-form {
  /* 销售属性样式 */
  .sales-attributes {
    display: inline;
    margin-right: 20px;
    width: 250px;
  }
}
</style>
