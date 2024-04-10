<script setup lang="ts" name="SKUForm">
// 属性选择器
import PropertySelector from './components/PropertySelector/index.vue'
</script>

<template>
  <el-form label-position="left" label-width="80">
    <el-form-item label="sku 名称">
      <el-input placeholder="请输入 SKU 名称" />
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input placeholder="请输入价格" type="number" />
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input placeholder="请输入重量" type="number" />
    </el-form-item>
    <el-form-item label="sku 描述">
      <el-input placeholder="请输入 SKU 相关描述" type="textarea" />
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form inline>
        <el-form-item>
          <PropertySelector name="手机一级" :property-list="[]" />
        </el-form-item>
        <el-form-item>
          <PropertySelector name="电池容量" :property-list="[]" />
        </el-form-item>
        <el-form-item>
          <PropertySelector name="运行内存" :property-list="[]" />
        </el-form-item>
        <br />
        <el-form-item>
          <PropertySelector name="机身内存" :property-list="[]" />
        </el-form-item>
        <el-form-item>
          <PropertySelector name="CPU型号" :property-list="[]" />
        </el-form-item>
        <el-form-item>
          <PropertySelector name="屏幕尺寸" :property-list="[]" />
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form-item>
        <PropertySelector name="颜色" :property-list="[]" />
      </el-form-item>
      <el-form-item>
        <PropertySelector name="版本" :property-list="[]" />
      </el-form-item>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border>
        <el-table-column type="selection" width="80" />
        <el-table-column label="图片" />
        <el-table-column label="名称" />
        <el-table-column label="操作">
          <template #default>
            <el-button type="info" plain size="default">
              设置为默认图片
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" plain icon="Plus">
        保存
      </el-button>
      <el-button size="default" plain icon="CloseBold">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
