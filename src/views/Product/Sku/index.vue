<script setup lang="ts" name="Sku">
import { onMounted, ref, Fragment } from 'vue'
import Pagination from '@/components/Pagination/index.vue'
import {
  cancelSaleSkuAPI,
  deleteSkuByIdAPI,
  getSkuByIdAPI,
  getSkuListAPI,
  onSaleSkuAPI,
} from '@/apis/product/sku'
import type { Sku } from '@/types/product/sku'
import type { PageData } from '@/types/common'

// 分页器实例
const paginationRef = ref<InstanceType<typeof Pagination>>()
// 分页器数据
const pageData = ref<PageData>({
  // 当前页
  page: 0,
  // 每页条数选项
  pageSizes: [],
  // 每页条数
  limit: 0,
  // 总条数
  total: 0,
})

// sku 列表
const skuList = ref<Sku[]>([])
// 获取 sku 列表
const getSkuList = async (page = 1) => {
  // 没传当前页, 则默认为第一页
  pageData.value.page = page
  // 获取 sku 列表数据
  const {
    data: { code, data },
  } = await getSkuListAPI(pageData.value.page, pageData.value.limit)
  if (code === 200) {
    // 保存 sku 列表数据
    skuList.value = data.records
    // 保存数据的总条数
    pageData.value.total = data.total
  }
}

// 组件挂载后的回调
onMounted(() => {
  // 获取分页器实例的分页数据对象
  pageData.value = paginationRef.value!.pageData
  // 分页数据的每页条数默认为 10 条
  pageData.value.limit = 10
  // 获取 sku 列表
  getSkuList()
})

// 上架与下架 sku
const handleSaleSku = async (sku: Sku) => {
  if (sku.isSale) {
    // 下架 sku
    const {
      data: { code },
    } = await cancelSaleSkuAPI(sku.id as number)
    if (code === 200) {
      // 提示成功
      ElMessage.success('上架成功')
      // 更新列表
      await getSkuList()
    } else {
      // 提示失败
      ElMessage.error('上架失败')
    }
  } else {
    // 下架 sku
    const {
      data: { code },
    } = await onSaleSkuAPI(sku.id as number)
    if (code === 200) {
      // 提示成功
      ElMessage.success('下架成功')
      // 更新列表
      getSkuList()
    } else {
      // 提示失败
      ElMessage.error('下架失败')
    }
  }
}

// 编辑 sku
const editSku = () => {
  // 提示信息
  ElMessage({ type: 'info', message: '编辑功能正在绝赞开发中...' })
}

// 是否展示 sku 详情容器
const isShowSkuDetail = ref(false)

// sku 信息
const skuData = ref<Sku>()
// 获取 sku 详情
const getSkuInfoById = async (skuId: number) => {
  // 获取 sku 详情数据
  const {
    data: { code, data },
  } = await getSkuByIdAPI(skuId)
  if (code === 200) {
    // 保存 sku 详情数据
    skuData.value = data
  }
}

// 查看 sku 详情
const showSkuInfo = (skuId: number) => {
  // 调用接口, 获取 sku 详情
  getSkuInfoById(skuId)
  // 显示 sku 详情容器
  isShowSkuDetail.value = true
}

// 删除 sku
const deleteSku = async (skuId: number) => {
  const {
    data: { code, data },
  } = await deleteSkuByIdAPI(skuId)
  if (code === 200) {
    // 提示成功
    ElMessage.success('删除成功')
    // 更新列表
    await getSkuList()
  } else {
    // 提示失败
    ElMessage.error(data)
  }
}
</script>

<template>
  <el-card>
    <!-- sku 表格 -->
    <el-table border :data="skuList" style="margin-bottom: 20px">
      <el-table-column label="序号" type="index" align="center" />
      <el-table-column label="名称" prop="skuName" align="center" />
      <el-table-column label="描述" prop="skuDesc" align="center" />
      <el-table-column label="图片" align="center">
        <template #default="{ row: { skuDefaultImg } }: { row: Sku }">
          <el-image
            style="width: 100px; height: 100px"
            :src="skuDefaultImg"
            fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column label="重量" prop="weight" align="center" />
      <el-table-column label="价格" prop="price" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="{ row: sku }: { row: Sku }">
          <el-tooltip :content="sku.isSale ? '下架 sku ' : '上架 sku '">
            <el-button
              :type="sku.isSale ? 'warning' : 'success'"
              size="default"
              circle
              :icon="sku.isSale ? 'Download' : 'Upload'"
              @click="handleSaleSku(sku)"
            />
          </el-tooltip>
          <el-tooltip content="编辑 sku ">
            <el-button
              type="primary"
              size="default"
              circle
              icon="Edit"
              @click="editSku"
            />
          </el-tooltip>
          <el-tooltip content="查看 sku 详情">
            <el-button
              type="info"
              size="default"
              circle
              icon="InfoFilled"
              @click="showSkuInfo(sku.id as number)"
            />
          </el-tooltip>
          <el-popconfirm
            title="是否确认删除该商品"
            @confirm="deleteSku(sku.id as number)"
          >
            <template #reference>
              <el-button type="danger" size="default" circle icon="Delete" />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
      <!-- 空数据显示 -->
      <template #empty>
        <el-empty description="无数据" />
      </template>
    </el-table>
    <!-- 分页器 -->
    <Pagination :getList="getSkuList" ref="paginationRef" />
    <!-- sku 详情展示区 -->
    <el-drawer v-model="isShowSkuDetail">
      <template #header>
        <h3 style="text-align: center">查看 sku 详情</h3>
      </template>
      <template #default>
        <el-row style="margin-bottom: 20px">
          <el-col :span="8">名称</el-col>
          <el-col :span="16">{{ skuData?.skuName }}</el-col>
        </el-row>
        <el-row style="margin-bottom: 20px">
          <el-col :span="8">描述</el-col>
          <el-col :span="16">{{ skuData?.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin-bottom: 20px">
          <el-col :span="8">价格</el-col>
          <el-col :span="16">{{ skuData?.price }}</el-col>
        </el-row>
        <el-row style="margin-bottom: 20px">
          <el-col :span="8">平台属性</el-col>
          <el-col :span="16">
            <el-tag
              v-for="attrValue in skuData?.skuAttrValueList"
              :key="attrValue.valueId"
            >
              {{ attrValue.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 20px">
          <el-col :span="8">销售属性</el-col>
          <el-col :span="16">
            <el-tag
              type="danger"
              v-for="saleAttrValue in skuData?.skuSaleAttrValueList"
              :key="saleAttrValue.saleAttrValeId"
            >
              {{ saleAttrValue.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">商品图片</el-col>
          <el-col :span="16">
            <el-carousel :interval="2000" type="card" height="200px" autoplay>
              <el-carousel-item
                v-for="img in skuData?.skuImageList"
                :key="img.id"
              >
                <el-image
                  fit="cover"
                  :src="img.imgUrl"
                  class="image"
                  :alt="img.imgName"
                />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<style scoped lang="scss">
.el-tag:not(:last-child) {
  margin-right: 10px;
}

.el-carousel__item .image {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
