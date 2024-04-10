<script setup lang="ts" name="Attr">
import { ref, watch, reactive, nextTick, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '@/store'
import type { AttrInfo, AttrValue } from '@/types/product/attr'
import {
  addOrUpdateAttrInfoAPI,
  deleteAttrInfoAPI,
  getAttrInfoListAPI,
} from '@/apis/product/attr'

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
const isShowOtherPage = ref<boolean>(false)

// 添加属性按键的回调
const addAttr = () => {
  // 添加表单重置
  Object.assign(attrFormData, {
    id: undefined,
    attrName: '',
    attrValueList: [],
    categoryId: selectedThirdCategoryId.value,
    categoryLevel: 3,
  })
  // 修改是否展示添加属性页面的标记
  isShowOtherPage.value = true
}

// 属性对象数据
let attrFormData = reactive<AttrInfo>({
  attrName: '',
  attrValueList: [],
  categoryId: undefined,
  categoryLevel: 3,
})

// 添加属性值的回调
const addAttrValue = () => {
  // 添加属性值的模板对象
  ;(attrFormData.attrValueList as AttrValue[]).push({
    valueName: '',
    // 是否展示属性值的标记
    isShowAttrValue: false,
  })
  // 属性值输入框获取焦点
  nextTick(() => {
    // nextTick ---> 当响应式数据发生变化完成后, 才会获取更新的 dom
    attrValueInputRef.value[attrFormData.attrValueList.length - 1].focus()
  })
}

// 保存属性值
const saveAttrValue = async () => {
  // 调用接口, 添加属性值
  const {
    data: { code },
  } = await addOrUpdateAttrInfoAPI(attrFormData)
  if (code === 200) {
    // 提示成功信息
    ElMessage({
      type: 'success',
      message: attrFormData.id ? '属性编辑成功' : '属性添加成功',
    })
    // 关闭添加页面
    isShowOtherPage.value = false
    // 重新渲染数据
    getAttrInfoList()
  } else {
    // 提示错误信息
    ElMessage({
      type: 'error',
      message: attrFormData.id ? '属性编辑失败' : '属性添加失败',
    })
  }
}

// 属性值输入框失焦后的回调
const showAttr = (attrValue: AttrValue, index: number) => {
  // 属性值非空判断
  if (attrValue.valueName.trim() === '') {
    // 删除空的属性值对象
    attrFormData.attrValueList.splice(index, 1)
    // 提示错误信息
    return ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
  }
  // 属性值是否重复的判断
  const foundItem = attrFormData.attrValueList.find((item) => {
    // 排除待检索的元素
    if (item !== attrValue) {
      return item.valueName === attrValue.valueName
    }
  })
  if (foundItem) {
    // 删除为空的 attrValue 对象
    attrFormData.attrValueList.splice(index, 1)
    // 提示错误信息
    return ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
  }
  // 展示属性值
  attrValue.isShowAttrValue = true
}

// 添加属性值的表单实例
const attrValueInputRef = ref<InstanceType<typeof ElInput>[]>([])

// 编辑 属性值
const editTag = (attrValue: AttrValue, index: number) => {
  // 修改为编辑模式
  attrValue.isShowAttrValue = false
  // 输入框获取焦点
  nextTick(() => {
    attrValueInputRef.value[index].focus()
  })
}

// 删除属性值
const deleteAttrValue = async (index: number) => {
  // 根据索引值删除属性值
  await attrFormData.attrValueList.splice(index, 1)
  // 提示成功信息
  ElMessage({
    type: 'success',
    message: '属性值删除成功',
  })
}

// 编辑属性
const editAttrInfo = (attrInfo: AttrInfo) => {
  // 重置表单
  Object.assign(attrFormData, {
    attrName: '',
    attrValueList: [],
    categoryId: undefined,
    categoryLevel: 3,
  })
  // 打开编辑
  isShowOtherPage.value = true
  // 显示所编辑的属性对象信息
  // 解决浅拷贝带来的问题
  Object.assign(attrFormData, JSON.parse(JSON.stringify(attrInfo)))
  // 属性对象中所有属性值为阅读模式
  attrFormData.attrValueList.forEach(
    (attrValue) => (attrValue.isShowAttrValue = true),
  )
}

// 删除属性
const deleteAttrInfo = async (attrId: number) => {
  const {
    data: { code },
  } = await deleteAttrInfoAPI(attrId)
  if (code === 200) {
    // 删除成功
    ElMessage({
      type: 'success',
      message: '属性删除成功',
    })
    // 重新渲染页面
    getAttrInfoList()
  } else {
    // 删除失败
    ElMessage({
      type: 'error',
      message: '属性删除失败',
    })
  }
}

// 组件卸载前执行
onBeforeUnmount(() => {
  // 清除分类的状态管理库中的所有数据
  categoryStore.$reset()
})
</script>

<template>
  <div class="attr">
    <!-- 分类组件 -->
    <Category :isDisabled="isShowOtherPage" />
    <el-card class="attr-content">
      <div class="main-content" v-show="!isShowOtherPage">
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
            <template #default="{ row }: { row: AttrInfo }">
              <el-button
                type="primary"
                size="default"
                icon="Edit"
                @click="editAttrInfo(row)"
              />
              <el-popconfirm
                title="是否删除该属性"
                confirm-button-text="确认"
                cancel-button-text="取消"
                icon="Delete"
                @confirm="deleteAttrInfo(row.id as number)"
              >
                <template #reference>
                  <el-button type="danger" size="default" icon="Delete" />
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
          <template #empty><el-empty description="无数据" /></template>
        </el-table>
      </div>
      <div class="add-attr-card" v-show="isShowOtherPage">
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
        <el-button icon="CloseBold" @click="isShowOtherPage = false">
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
            <template
              #default="{ row, $index }: { row: AttrValue; $index: number }"
            >
              <el-input
                placeholder="请输入属性值的名称"
                v-model="row.valueName"
                v-show="!row.isShowAttrValue"
                @blur="showAttr(row, $index)"
                :ref="(element) => (attrValueInputRef[$index] = element)"
              />
              <el-tag
                v-show="row.isShowAttrValue"
                @click="editTag(row, $index)"
                style="cursor: pointer"
                class="attrValue-tag"
              >
                {{ row.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center">
            <template #default="{ $index }">
              <el-popconfirm
                title="是否删除该属性值"
                confirm-button-text="确认"
                cancel-button-text="取消"
                icon="Delete"
                width="220"
                @confirm="deleteAttrValue($index)"
              >
                <template #reference>
                  <el-button type="danger" size="default" icon="Delete" />
                </template>
              </el-popconfirm>
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
          :disabled="attrFormData.attrValueList.length === 0"
        >
          保存
        </el-button>
        <el-button icon="CloseBold" @click="isShowOtherPage = false">
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

    .attrValue-tag {
      transition: 0.25s all linear;

      &:hover {
        border: 1px solid #ce8f1c;
        color: #ce8f1c;
        background-color: rgba(206, 143, 28, 0.24);
      }
    }
  }
}
</style>
