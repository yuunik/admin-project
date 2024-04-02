<script setup lang="ts" name="Attr">
import { ref, watch } from 'vue'
import { useCategoryStore } from '@/store'
import { storeToRefs } from 'pinia'
import { AttrInfo } from '@/types/product/attr'
import { getAttrInfoListAPI } from '@/apis/product/attr'

const categoryStore = useCategoryStore()
// 解构属性
const { selectedCategoryId, selectedSubCategoryId, selectedThirdCategoryId } =
  storeToRefs(categoryStore)

// 属性列表
const attrInfoList = ref<AttrInfo[]>()
// 获取属性列表
const getAttrInfoList = async () => {
  const result = await getAttrInfoListAPI(
    selectedCategoryId.value!,
    selectedSubCategoryId.value!,
    selectedThirdCategoryId.value!,
  )
  // 保存属性列表
  attrInfoList.value = result.data.data
}
// 监听三级属性的id 的变化
watch(selectedThirdCategoryId, () => {
  // 获取属性列表
  getAttrInfoList()
})

// 是否展示添加属性页面的标记
const isShowAddPage = ref<boolean>(false)

watch(
  isShowAddPage,
  () => {
    console.log(isShowAddPage.value)
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div class="attr">
    <!-- 分类组件 -->
    <Category :isShowAddPage="isShowAddPage" />
    <el-card class="attr-content">
      <div class="main-content" v-show="!isShowAddPage">
        <!-- 添加属性按键 -->
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="!selectedThirdCategoryId"
          @click="isShowAddPage = true"
        >
          添加属性
        </el-button>
        <el-table border style="margin-top: 10px" :data="attrInfoList">
          <el-table-column
            label="序号"
            type="index"
            width="80"
            align="center"
          />
          <el-table-column label="属性名称" width="250" prop="attrName" />
          <el-table-column label="属性值名称">
            <template #default="{ row: { attrValueList } }">
              <el-tag
                type="primary"
                v-for="attrValue in attrValueList"
                :key="attrValue.id"
                style="margin-right: 10px"
              >
                {{ attrValue.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250" align="center">
            <template #default>
              <el-button type="primary" size="default" icon="Edit" />
              <el-button type="danger" size="default" icon="Delete" />
            </template>
          </el-table-column>
          <template #empty><el-empty description="无数据" /></template>
        </el-table>
      </div>
      <div class="add-attr-card" v-show="isShowAddPage">
        <el-form inline>
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称" />
          </el-form-item>
        </el-form>
        <el-button type="primary" size="default" icon="Plus">
          添加属性值
        </el-button>
        <el-button icon="CloseBold" @click="isShowAddPage = false">
          取消
        </el-button>
        <el-table border style="margin-top: 20px">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80"
          />
          <el-table-column label="属性值"></el-table-column>
          <el-table-column label="操作" width="100" align="center">
            <template #default>
              <el-button type="danger" size="default" icon="Delete" />
            </template>
          </el-table-column>
          <!-- 表格没有数据时显示 -->
          <template #empty>
            <el-empty description="无数据" />
          </template>
        </el-table>
        <el-button type="primary" size="default" icon="House">保存</el-button>
        <el-button icon="CloseBold" @click="isShowAddPage = false">
          取消
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.attr {
  .attr-content {
    margin-top: 10px;
  }
}
</style>
