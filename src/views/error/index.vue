<script setup lang="ts" name="Error"></script>

<template>
  <div class="error-tip">
    <div class="content">
      <img
        src="../../assets/images/error_images/404.png"
        alt="请求错误提示图片"
        class="tip-img"
      />
      <div class="tip-info">
        <h1>
          <strong>请求路径有误, 请检查路径是否正确!</strong>
        </h1>
      </div>
    </div>
    <div class="homepage-btn" @click="$router.push('/')">返回首页</div>
  </div>
</template>

<style scoped lang="scss">
.error-tip {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    flex: 9.5;

    .tip-img {
      width: 1016px;
      height: 556px;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    }

    .tip-info {
    }
  }

  .homepage-btn {
    flex: 0.5;
    width: 100%;
    height: 100%;
    display: flex;
    border-left: 1px solid #ccc;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.25s all linear;

    &:hover {
      background: rgba(1, 94, 145, 0.25);
      box-shadow: 0 0 10px black;
      border-radius: 20px 0 0 20px;
    }
  }
}
</style>
