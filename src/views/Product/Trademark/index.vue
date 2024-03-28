<script setup lang="ts">
import { ref } from 'vue'
//@ts-expect-error '无组件声明文件类型'
import Chinese from 'element-plus/dist/locale/zh-cn.mjs'
import { onMounted, reactive } from 'vue'
import { getTrademarkListAPI } from '@/apis/product/trademark'
import type { TradeMark } from '@/types/product/trademark'

// 分页相关数据
const pageData = reactive({
  // 当前页
  page: 1,
  // 每页展示条数
  limit: 4,
  // 每页展示条数选项
  pageSizes: [2, 4, 6, 8, 10],
  // 数据总条数
  total: 0,
})

// 品牌列表
const tradeMarkList = ref<TradeMark[]>()

// 获取品牌列表
const getTradeMarkList = async () => {
  const result = await getTrademarkListAPI({
    page: pageData.page,
    limit: pageData.limit,
  })
  // 保存品牌列表
  tradeMarkList.value = result.data.data.records
  // 保存总条数
  pageData.total = result.data.data.total
}

// 组件挂载后调用
onMounted(() => {
  // 获取品牌列表
  getTradeMarkList()
})

// 换页事件
const handleChange = (current: number) => {
  // 换页
  pageData.page = current
  // 重新渲染数据
  getTradeMarkList()
}
</script>

<template>
  <!-- 品牌管理容器 -->
  <el-card shadow="hover" class="trademark">
    <!-- 顶部添加按键 -->
    <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
    <!-- 表格展示区 -->
    <el-table border style="margin: 20px 0" :data="tradeMarkList">
      <el-table-column label="序号" width="80" align="center" type="index" />
      <el-table-column label="品牌名称" prop="tmName" />
      <el-table-column label="品牌 logo">
        <template #default="{ row: { logoUrl } }">
          <!-- 有图片数据 -->
          <el-image
            style="width: 100px; height: 100px"
            :src="logoUrl"
            alt="品牌logo"
            class="trademark-logo"
            v-if="logoUrl.includes('http')"
          />
          <!-- 无图片数据 -->
          <el-empty
            description="图片丢失"
            v-else
            :image-size="50"
            class="logo-empty"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default>
          <el-button type="primary" icon="Edit">编辑</el-button>
          <el-button type="danger" icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 底部分页器 -->
    <el-config-provider :locale="Chinese">
      <el-pagination
        v-model:current-page="pageData.page"
        v-model:page-size="pageData.limit"
        :page-sizes="pageData.pageSizes"
        :small="false"
        :disabled="false"
        :background="true"
        layout="prev, pager, next, jumper, -> , total, sizes"
        :total="pageData.total"
        prev-icon="DArrowLeft"
        next-icon="DArrowRight"
        @change="handleChange"
      />
    </el-config-provider>
  </el-card>
</template>

<style scoped lang="scss">
.trademark {
  .trademark-logo {
    border-radius: 8px;
    border: 1px solid #ddd;
    cursor: pointer;
    transition: 0.25s all linear;

    &:hover {
      transform: translate(5px);
      box-shadow: 0 0 10px black;
    }
  }

  .logo-empty {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    border: 1px solid #ddd;
    cursor: not-allowed;
  }
}
</style>
