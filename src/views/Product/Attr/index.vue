<script setup lang="ts" name="Attr">
import { ref, watch, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '@/store'
import type { AttrInfo, AttrValue } from '@/types/product/attr'
import { addOrUpdateAttrInfoAPI, getAttrInfoListAPI } from '@/apis/product/attr'

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

// 添加属性按键的回调
const addAttr = () => {
  // 添加表单重置
  Object.assign(attrFormData, {
    attrName: '',
    attrValueList: [],
    categoryId: selectedThirdCategoryId.value,
    categoryLevel: 3,
  })
  // 修改是否展示添加属性页面的标记
  isShowAddPage.value = true
}

// 属性对象数据
const attrFormData = reactive<AttrInfo>({
  attrName: '',
  attrValueList: [],
  categoryId: undefined,
  categoryLevel: 3,
})

// 是否展示属性值的标记
const isShowAttrValue = ref<boolean>(false)
// 添加属性值的回调
const addAttrValue = () => {
  isShowAttrValue.value = false
  ;(attrFormData.attrValueList as AttrValue[]).push({ valueName: '' })
}

// 保存属性值
const saveAttrValue = async () => {
  console.log(attrFormData)
  const {
    data: { code },
  } = await addOrUpdateAttrInfoAPI(attrFormData)
  if (code === 200) {
    // 提示成功信息
    ElMessage({
      type: 'success',
      message: '属性添加成功',
    })
    // 关闭添加页面
    isShowAddPage.value = false
    // 重新渲染数据
    getAttrInfoList()
  } else {
    // 提示错误信息
    ElMessage({
      type: 'error',
      message: '属性添加失败',
    })
  }
}
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
          @click="addAttr"
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
                {{ (attrValue as AttrValue)?.valueName }}
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
        <el-form inline :model="attrFormData">
          <el-form-item label="属性名称" prop="attrName">
            <el-input
              placeholder="请输入属性名称"
              v-model="attrFormData.attrName"
            />
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          @click="addAttrValue"
          :disabled="!attrFormData.attrName"
        >
          添加属性值
        </el-button>
        <el-button icon="CloseBold" @click="isShowAddPage = false">
          取消
        </el-button>
        <el-table
          border
          style="margin: 20px 0"
          :data="attrFormData.attrValueList"
        >
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80"
          />
          <el-table-column label="属性值">
            <template #default="{ row: attrValue }">
              <el-input
                placeholder="请输入属性值的名称"
                v-model="attrValue.valueName"
                v-show="!isShowAttrValue"
                @blur="isShowAttrValue = true"
              />
              <el-tag v-show="isShowAttrValue">
                {{ (attrValue as AttrValue).valueName }}
              </el-tag>
            </template>
          </el-table-column>
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
        <el-button
          type="primary"
          size="default"
          icon="House"
          @click="saveAttrValue"
        >
          保存
        </el-button>
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
