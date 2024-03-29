<script setup lang="ts" name="trademark">
import { ref, watch, reactive, onMounted } from 'vue'
//@ts-expect-error '无组件声明文件类型'
import Chinese from 'element-plus/dist/locale/zh-cn.mjs'
import {
  addOrUpdateTrademarkAPI,
  getTrademarkListAPI,
  getTrademarkInfoAPI,
  deleteTrademarkAPI,
} from '@/apis/product/trademark'
import type { TradeMark } from '@/types/product/trademark'
import type {
  FormInstance,
  FormRules,
  UploadProps,
  UploadRawFile,
} from 'element-plus'

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
  const {
    data: { code, data },
  } = await getTrademarkListAPI({
    page: pageData.page,
    limit: pageData.limit,
  })
  if (code === 200) {
    // 保存品牌列表
    tradeMarkList.value = data.records
    // 保存总条数
    pageData.total = data.total
  } else {
    // 提示信息
    ElMessage({
      type: 'error',
      message: '网路异常, 请稍后再试',
    })
  }
}

// 组件挂载后调用
onMounted(() => {
  // 获取品牌列表
  getTradeMarkList()
})

// 监听显示条数
watch(
  () => pageData.limit,
  () => {
    // 显示条数变化, 则当前页重置
    pageData.page = 1
  },
)

// 是否展示添加品牌弹框的标记
const isShowDialog = ref<boolean>(false)
// 表单数据
let form = reactive<TradeMark>({
  // 品牌 id
  tmName: '',
  // 品牌 logo
  logoUrl: '',
})
// 表单实例
const formRef = ref<FormInstance>()
// 表单校验规则
const formRules = ref<FormRules<TradeMark>>({
  tmName: [
    {
      required: true,
      message: '品牌名不能为空',
      trigger: 'blur',
    },
  ],
  logoUrl: [
    {
      required: true,
      message: '品牌logo不能为空',
    },
  ],
})

// 是否为编辑状态
const isEdit = ref<boolean>(false)

// 打开表单
const openFormDialog = async (id?: number) => {
  // 表单重置
  await formRef.value?.resetFields()
  // 表单重置
  if (id) {
    // 编辑模式, 回显数据
    isEdit.value = true
    // 调用接口, 回显数据
    const {
      data: { code, data },
    } = await getTrademarkInfoAPI(id)
    if (code === 200) {
      Object.assign(form, data)
    }
  }
  // 关闭编辑模式
  isEdit.value = false
  // 打开弹框
  isShowDialog.value = true
}

// 新增与编辑品牌
const addOrUpdateTrademark = async () => {
  // 表单预校验
  await formRef.value?.validate()
  // 调用接口, 新增或编辑品牌
  const {
    data: { code },
  } = await addOrUpdateTrademarkAPI(form)
  if (code === 200) {
    // 提示成功信息
    ElMessage({
      type: 'success',
      message: `${isEdit.value ? '编辑' : '新增'}品牌成功`,
    })
    // 关闭弹窗
    isShowDialog.value = false
    // 重新渲染数据
    getTradeMarkList()
  } else {
    // 提示错误信息
    ElMessage({
      type: 'error',
      message: `${isEdit.value ? '编辑' : '新增'}品牌失败`,
    })
  }
}

// 上传品牌封面前的回调
const beforeUpload: UploadProps['beforeUpload'] = (rawFile: UploadRawFile) => {
  // 文件格式校验
  // eslint-disable-next-line no-constant-condition
  if (
    rawFile.type === 'image/jpeg' ||
    rawFile.type === 'image/png' ||
    rawFile.type === 'image/gif'
  ) {
    // 文件大小判断
    if (rawFile.size / 1024 / 1024 < 4) {
      // 允许上传文件
      return true
    } else {
      // 文件大小超过指定
      // 提示错误信息
      ElMessage({
        type: 'error',
        message: '图片大小不得超过 4 MB',
      })
    }
  } else {
    // 上传文件的格式不对
    // 提示错误信息
    ElMessage({
      type: 'error',
      message: '仅支持上传格式为 jpg 、 png 及 gif 的图片',
    })
  }
  return false
}

// 上传品牌封面成功的回调
const uploadLogo = (response: any) => {
  const { code, data } = response
  if (code === 200) {
    // 上传成功
    form.logoUrl = data
  } else {
    // 上传失败
    ElMessage({
      type: 'error',
      message: '上传封面失败',
    })
  }
}

// 删除品牌
const deleteTrademark = (id: number) => {
  ElMessageBox.confirm('是否确认删除该品牌信息', '删除提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      // 调用接口, 删除品牌
      const {
        data: { code },
      } = await deleteTrademarkAPI(id)
      if (code === 200) {
        // 提示成功信息
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        // 当前页重置
        pageData.page = 1
        // 重新渲染数据
        getTradeMarkList()
      }
    })
    .catch(() => {})
}
</script>

<template>
  <!-- 品牌管理容器 -->
  <el-card shadow="hover" class="trademark">
    <!-- 顶部添加按键 -->
    <el-button
      type="primary"
      size="default"
      icon="Plus"
      @click="() => openFormDialog()"
    >
      添加品牌
    </el-button>
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
      <el-table-column label="操作" align="center">
        <template #default="{ row: { id } }">
          <el-button type="primary" icon="Edit" @click="openFormDialog(id)">
            编辑
          </el-button>
          <el-button type="danger" icon="Delete" @click="deleteTrademark(id)">
            删除
          </el-button>
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
        @change="getTradeMarkList"
      />
    </el-config-provider>
  </el-card>

  <!-- 添加品牌弹框 -->
  <el-dialog
    v-model="isShowDialog"
    :title="isEdit ? '编辑品牌' : '添加品牌'"
    width="500"
  >
    <el-form
      :model="form"
      :rules="formRules"
      ref="formRef"
      label-position="left"
      label-width="100"
      style="width: 80%"
    >
      <!-- 品牌名称 -->
      <el-form-item label="品牌名称" prop="tmName">
        <el-input v-model="form.tmName" autocomplete="off" />
      </el-form-item>
      <!-- 品牌 logo -->
      <el-form-item label="品牌LOGO" prop="logoUrl">
        <!-- 上传图片 -->
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="uploadLogo"
          :before-upload="beforeUpload"
        >
          <el-image
            v-if="form.logoUrl"
            :src="form.logoUrl"
            fit="cover"
            alt="品牌图标"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Upload /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isShowDialog = false">取消</el-button>
        <el-button type="primary" @click="addOrUpdateTrademark">确认</el-button>
      </div>
    </template>
  </el-dialog>
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
.avatar-uploader {
  .el-upload.el-upload--text {
    cursor: pointer;
    position: relative;
    overflow: hidden;

    .avatar {
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
      &.avatar-uploader-icon {
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
</style>
