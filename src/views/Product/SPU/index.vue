<script setup lang="ts" name="Spu">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { PageData } from '@/types/common'
import { deleteSPUAPI, getSPUListAPI } from '@/apis/product/spu'
import type { SPU } from '@/types/product/spu'
import { useCategoryStore } from '@/store'
import SPUForm from '@/views/Product/Spu/components/SpuForm/index.vue'
import SKUForm from '@/views/Product/Spu/components/SkuForm/index.vue'
import { getSkuListBySpuIdAPI } from '@/apis/product/sku'
import { Sku } from '@/types/product/sku'

// 是否展示其他页面的标记
const isCategoryDisabled = ref<boolean>(false)

// 分页器模板对象
const paginationRef = ref<{
  // 分页器组件暴露的分页数据
  pageData: PageData
}>()

// 分页数据
let pageData = ref<PageData>()

// 组件挂载后执行
onMounted(() => {
  // 获取分页数据
  pageData.value = paginationRef.value!.pageData
  // 获取 spu 列表
  getSPUList()
})

// SPU 列表
const spuList = ref<SPU[]>()
// 获取三级分类的id
const categoryStore = useCategoryStore()
const { selectedThirdCategoryId } = storeToRefs(categoryStore)
const getSPUList = async (page = 1) => {
  // 没有分页数据, 则不发送请求
  if (!pageData.value) {
    return
  }
  // 默认当前页为 第一页
  pageData.value.page = page
  const {
    data: {
      code,
      data: { records, total },
    },
  } = await getSPUListAPI(
    selectedThirdCategoryId.value as number,
    pageData.value.page,
    pageData.value.limit,
  )
  if (code === 200) {
    // 保存列表
    spuList.value = records
    // 获取数据总条数
    pageData.value.total = total
  }
}

// 若获取了三级分类, 则发送请求获取 spu 列表
watch(selectedThirdCategoryId, () => {
  // 调用接口, 获取所属三级分类的 spu 信息列表
  getSPUList()
})

// 展示不同显示模式的变量
const scene = ref<number>(0)

// 修改显示模式
const changeScene = ({
  sceneValue,
  mode,
}: {
  sceneValue: number
  mode: string
}) => {
  // 修改显示模式
  scene.value = sceneValue
  // 分类组件可选择
  isCategoryDisabled.value = false
  // 新增则跳转第一页, 编辑则留在当前页
  mode === 'add' ? getSPUList() : getSPUList(pageData.value!.page)
}

// SpuForm 模板对象
const spuFormRef = ref<InstanceType<typeof SPUForm>>()

// 添加 spu
const addSpu = () => {
  // 禁用分类组件
  isCategoryDisabled.value = true
  // 跳转表单
  scene.value = 1
  // 调用 spuForm 对外暴露的接口, 回显数据
  spuFormRef.value?.initData()
}

// 编辑 spu
const editSpu = (spu: SPU) => {
  // 修改显示模式
  scene.value = 1
  // 分类组件不可选择
  isCategoryDisabled.value = true
  // 调用 spuForm 对外暴露的接口, 回显数据
  spuFormRef.value?.initData(spu)
}

// SkuForm 模板引用
const skuFormRef = ref<InstanceType<typeof SKUForm>>()
// 添加 sku
const addSku = (spuId: number, tmId: number) => {
  // 修改显示模式
  scene.value = 2
  // 分类组件不可用
  isCategoryDisabled.value = true
  // 调用 SkuForm 组件暴露的方法, 进行数据初始化
  skuFormRef.value?.initSKUData(spuId, tmId)
}

// 是否展示 sku 表格
const isShowSkuTable = ref<boolean>(false)
// sku 列表
const skuList = ref<Sku[]>()
// 查看 sku 信息
const viewSkuInfo = async (spuId: number) => {
  // 调用接口, 获取 sku 信息列表
  const {
    data: { code, data },
  } = await getSkuListBySpuIdAPI(spuId)
  // 若请求成功, 则保存数据
  if (code === 200) {
    // 保存数据
    skuList.value = data
    // 展示 sku 表格
    isShowSkuTable.value = true
  }
}

// 删除 Spu
const deleteSpu = (spuId: number) => {
  ElMessageBox.confirm('此操作将永久删除该商品, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    // 调用删除接口
    const {
      data: { code, data },
    } = await deleteSPUAPI(spuId)
    if (code === 200) {
      // 提示成功信息
      ElMessage.success('删除成功')
      // 删除成功后, 刷新列表
      await getSPUList()
    } else {
      // 提示失败信息
      ElMessage.error(data)
    }
  })
}
</script>

<template>
  <!-- 分类选择区 -->
  <Category :isDisabled="isCategoryDisabled" />
  <!-- spu 展示区 -->
  <el-card style="margin-top: 10px">
    <div class="info-content" v-show="scene === 0">
      <!-- 添加 spu 按键 -->
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        plain
        :disabled="!selectedThirdCategoryId"
        @click="addSpu"
      >
        添加SPU
      </el-button>
      <!-- spu 表格展示区 -->
      <el-table border style="margin: 20px 0" :data="spuList">
        <el-table-column label="序号" align="center" width="100" type="index" />
        <el-table-column label="SPU名称" prop="spuName" />
        <el-table-column label="SPU描述" prop="description" />
        <el-table-column label="操作" align="center">
          <template #default="{ row: spu }: { row: SPU }">
            <!-- 添加 sku -->
            <el-tooltip
              effect="dark"
              :content="`为 ${spu.spuName} 添加 Sku 信息`"
              :hide-after="0"
            >
              <el-button
                type="primary"
                size="default"
                icon="Plus"
                plain
                @click="addSku(spu.id as number, spu.tmId as number)"
              />
            </el-tooltip>

            <!-- 编辑 spu 信息 -->
            <el-tooltip effect="dark" content="编辑 spu 信息" :hide-after="0">
              <el-button
                type="warning"
                size="default"
                icon="Edit"
                plain
                @click="editSpu(spu)"
              />
            </el-tooltip>
            <!-- 查看 sku 信息 -->
            <el-tooltip
              effect="dark"
              :content="`查看 ${spu.spuName} 的 SKU 信息`"
              :hide-after="0"
            >
              <el-button
                type="info"
                size="default"
                icon="InfoFilled"
                plain
                @click="viewSkuInfo(spu.id as number)"
              />
            </el-tooltip>
            <!-- 删除 spu -->
            <el-tooltip effect="dark" content="删除 SPU " :hide-after="0">
              <el-button
                type="danger"
                size="default"
                icon="Delete"
                plain
                @click="deleteSpu(spu.id)"
              />
            </el-tooltip>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="无数据" />
        </template>
      </el-table>
      <!-- 分页器 -->
      <Pagination :getList="getSPUList" ref="paginationRef" />
    </div>
    <SPUForm
      class="spu-content"
      v-show="scene === 1"
      @changeScene="changeScene"
      ref="spuFormRef"
      :category3-id="selectedThirdCategoryId as number"
    />
    <SKUForm
      class="sku-content"
      v-show="scene === 2"
      ref="skuFormRef"
      @changeScene="changeScene"
    />
  </el-card>
  <!-- sku 列表表格 -->
  <el-dialog
    v-model="isShowSkuTable"
    title="SKU 列表"
    width="800"
    @close="isShowSkuTable = false"
  >
    <el-table :data="skuList" border>
      <el-table-column property="skuName" label="SKU 名称" />
      <el-table-column property="price" label="SKU 价格" />
      <el-table-column property="weight" label="SKU 重量" />
      <el-table-column label="Sku 图片">
        <template
          #default="{ row: { skuDefaultImg } }: { row: Sku }"
          style="width: 50px; height: 50px"
        >
          <!-- sku 图片 -->
          <el-image fit="cover" :src="skuDefaultImg" />
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
