<script setup lang="ts" name="SPUForm">
import { computed, nextTick, ref } from 'vue'
import type { UploadFile, UploadRawFile, UploadUserFile } from 'element-plus'
import {
  addOrUpdateSPUAPI,
  getImgListAPI,
  getSalesPropertyListAPI,
  getSalesPropertyListByIdAPI,
  getTrademarkListAPI,
} from '@/apis/product/spu'
import type { TradeMark } from '@/types/product/trademark'
import type { SPU, SPUImage } from '@/types/product/spu'
import type { SalesProperty } from '@/types/product/spu'
import { SalesAttr } from '@/types/product/spu'
import { ElMessage } from 'element-plus'

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
const salesPropertyList = ref<SalesProperty[]>([])
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
const ownSalesPropertyList = ref<SalesAttr[]>([])
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
  // 重置表单
  spuData.value = {
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
  }
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
    img.type === 'image/jpeg' ||
    img.type === 'image/png' ||
    img.type === 'image/gif'
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

// 未选择的属性列表
const unselectedSalesPropertyList = computed(() =>
  salesPropertyList.value.filter((saleProperty) =>
    ownSalesPropertyList.value.every(
      (ownSaleProperty) => ownSaleProperty.saleAttrName !== saleProperty.name,
    ),
  ),
)

// 新增的属性
const selectedSalesProperty = ref<string>('')

// 新增销售属性
const addSaleProperty = () => {
  const [id, saleAttrName] = selectedSalesProperty.value.split(',')
  // 为已有属性列表添加新的销售属性
  ownSalesPropertyList.value.push({
    baseSaleAttrId: parseFloat(id),
    saleAttrName,
    spuSaleAttrValueList: [],
  })
  // 未选择的属性列表重置
  selectedSalesProperty.value = ''
}

// 输入框模板
const inpRef = ref<HTMLInputElement[]>([])
// 跳转新增属性值模式的回调
const toAddSalePropertyValueMode = (saleAttr: SalesAttr, index: number) => {
  // 重置数据
  saleAttr.salePropertyValue = ''
  // 修改标记
  saleAttr.isAdd = true
  // 输入框获取焦点
  nextTick(() => {
    inpRef.value[index].focus()
  })
}

/**
 * 新增属性值
 * @param saleAttr 属性对象
 */
const addSalePropertyValue = (saleAttr: SalesAttr) => {
  // 非空判断
  if (saleAttr.salePropertyValue!.trim() === '') {
    return ElMessage({
      type: 'error',
      message: '属性值不为能空',
    })
  }
  // 新增属性值
  saleAttr.spuSaleAttrValueList.push({
    baseSaleAttrId: saleAttr.baseSaleAttrId,
    saleAttrValueName: saleAttr.salePropertyValue as string,
  })
  // 修改新增模式
  saleAttr.isAdd = false
}

// spu 照片上传成功时的回调
const handleSuccess = (
  { data: imgUrl }: { data: string },
  { name: imgName }: UploadFile,
) => {
  // 为上传的图片列表新增图片
  imgList.value.push({
    imgName,
    imgUrl,
  })
}

// 处理失焦
const handleBlur = ({ target }: FocusEvent, saleAttr: SalesAttr) => {
  if (!target?.value) {
    saleAttr.isAdd = false
    return ElMessage({
      type: 'warning',
      message: '属性值不能为空',
    })
  }
}

/**
 * 删除属性值
 * @param id 属性值 id
 * @param saleAttr  所属的属性对象
 * @param index 所属的属性对象的序号
 */
const deleteSaleAttrValue = (
  id: number,
  saleAttr: SalesAttr,
  index: number,
) => {
  const newList = saleAttr.spuSaleAttrValueList.filter(
    (saleAttrValue) => saleAttrValue.id !== id,
  )
  if (newList.length === 0) {
    ElMessage({
      type: 'info',
      message: '当前无属性值, 默认删除该属性',
    })
    // 属性值列表为空, 默认删除这个属性
    spuData.value.spuSaleAttrList!.splice(index, 1)
  } else {
    // 属性值列表不为空, 则删除单个属性值
    saleAttr.spuSaleAttrValueList = saleAttr.spuSaleAttrValueList.filter(
      (saleAttrValue) => saleAttrValue.id !== id,
    )
  }
}

// 新增或编辑 SPU
const addOrUpdateSPU = async () => {
  const { id } = spuData.value
  const {
    data: { code },
  } = await addOrUpdateSPUAPI(spuData.value)
  if (code === 200) {
    // 提示成功信息
    ElMessage({
      type: 'success',
      message: id ? '编辑 SPU 成功' : '新增 SPU 成功',
    })
    // 跳转回 SPU 显示页
    emit('changeScene', 0)
  } else {
    // 提示错误信息
    ElMessage({
      type: 'error',
      message: id ? '编辑 SPU 失败' : '新增 SPU 失败',
    })
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
        :on-success="handleSuccess"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible" class="preview-container">
        <img :src="dialogImageUrl" alt="预览图片" class="preview-img" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU 销售属性">
      <!-- 展示销售属性的下拉菜单 -->
      <el-select
        v-model="selectedSalesProperty"
        :placeholder="
          unselectedSalesPropertyList.length
            ? `尚有 ${unselectedSalesPropertyList.length} 个属性未选择`
            : '暂无数据可选择'
        "
        class="sales-attributes"
      >
        <el-option
          v-for="saleProperty in unselectedSalesPropertyList"
          :key="saleProperty.id"
          :value="`${saleProperty.id},${saleProperty.name}`"
          :label="saleProperty.name"
        />
      </el-select>
      <el-button
        type="primary"
        size="default"
        plain
        icon="Plus"
        @click="addSaleProperty"
        :disabled="!selectedSalesProperty"
      >
        添加销售属性
      </el-button>
      <el-table style="margin: 20px 0" border :data="spuData.spuSaleAttrList">
        <el-table-column label="序号" type="index" align="center" width="80" />
        <el-table-column label="属性名" prop="saleAttrName" />
        <el-table-column label="属性值">
          <template
            #default="{
              row: saleAttr,
              $index,
            }: {
              row: SalesAttr
              $index: number
            }"
          >
            <!-- 属性值 -->
            <el-tag
              v-for="saleValue in saleAttr.spuSaleAttrValueList"
              :key="saleValue.id"
              closable
              class="sales-value"
              @close="
                deleteSaleAttrValue(saleValue.id as number, saleAttr, $index)
              "
            >
              {{ saleValue.saleAttrValueName }}
            </el-tag>
            <!-- 添加属性值的按键 -->
            <el-input
              v-show="saleAttr.isAdd"
              style="width: 150px; margin-right: 20px"
              :ref="(element: HTMLInputElement) => (inpRef[$index] = element)"
              @change="addSalePropertyValue(saleAttr)"
              @blur="(event: FocusEvent) => handleBlur(event, saleAttr)"
              v-model="saleAttr.salePropertyValue"
              placeholder="请输入属性值"
            />
            <el-button
              type="success"
              size="default"
              plain
              icon="Plus"
              v-show="!saleAttr.isAdd"
              @click="toAddSalePropertyValueMode(saleAttr, $index)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template #default="{ $index }: { $index: number }">
            <el-button
              type="danger"
              size="default"
              plain
              icon="Delete"
              @click="spuData.spuSaleAttrList!.splice($index, 1)"
            />
          </template>
        </el-table-column>
        <!-- 空数据展示区 -->
        <template #empty>
          <el-empty description="无数据" />
        </template>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="default"
        plain
        icon="Select"
        @click="addOrUpdateSPU"
      >
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

  .sales-value {
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>
