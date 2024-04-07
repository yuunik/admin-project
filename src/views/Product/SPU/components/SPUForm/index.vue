<script setup lang="ts" name="SPUForm">
// 对传入的自定义函数进行类型声明
import { ref } from 'vue'
import {
  getImgListAPI,
  getSalesPropertyListAPI,
  getSalesPropertyListByIdAPI,
  getTrademarkListAPI,
} from '@/apis/product/spu'
import type { TradeMark } from '@/types/product/trademark'
import type { SPU, SPUImage } from '@/types/product/spu'
import type { SalesProperty } from '@/types/product/spu'
import { ResSalesAttr } from '@/types/product/spu'
import { Logger } from 'sass'

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
const imgList = ref<SPUImage[]>()
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
const ownSalesPropertyList = ref<ResSalesAttr[]>()
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
const spuData = ref<SPU>()
// 数据初始化
const initData = async (spu: SPU) => {
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
</script>

<template>
  <el-form class="spu-form">
    <el-form-item label="SPU 名称">
      <el-input placeholder="请输入 SPU 名称" />
    </el-form-item>
    <el-form-item label="SPU 品牌" style="width: 250px">
      <el-select placeholder="请选择品牌">
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
      />
    </el-form-item>
    <el-form-item label="SPU 照片">
      <el-upload class="spu-uploader" action="/api/admin/product/fileUpload">
        <el-image v-if="false" fit="fill" alt="SPU 图片" class="spu-pic" />
        <el-icon v-else class="spu-uploader-icon"><Upload /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="SPU 销售属性">
      <!-- 展示销售属性的下拉菜单 -->
      <el-select placeholder="请选择销售属性" class="sales-attributes">
        <el-option value="beijing" label="北京" />
        <el-option value="beijing" label="南京" />
        <el-option value="beijing" label="上海" />
      </el-select>
      <el-button type="primary" size="default" plain icon="Plus">
        添加销售属性
      </el-button>
      <el-table style="margin: 20px 0" border>
        <el-table-column label="序号" type="index" align="center" width="80" />
        <el-table-column label="属性名" />
        <el-table-column label="属性值">
          <template #default>
            <el-tag closable>111111</el-tag>
            <!-- 添加属性值的按键 -->
            <el-button type="success" size="default" plain icon="Plus" />
          </template>
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
  /* 照片上传框样式*/
  .spu-uploader {
    .el-upload.el-upload--text {
      cursor: pointer;
      position: relative;
      overflow: hidden;

      .spu-pic {
        width: 178px;
        height: 178px;
        display: block;
        border: 1px solid var(--el-border-color);
        border-radius: 6px;
        transition: 0.25s all linear;

        &:hover {
          transform: translate(0px, -5px) scale(1.02);
          box-shadow: 0 0 10px black;
        }
      }

      .el-icon {
        &.spu-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          text-align: center;
          border: 1px dashed var(--el-border-color);
          border-radius: 6px;
          transition: var(--el-transition-duration-fast);

          &:hover {
            border-color: var(--el-color-primary);
          }
        }
      }
    }
  }
}
</style>
