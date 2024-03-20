<script setup lang="ts">
import { Fragment } from 'vue'
</script>

<template>
  <Fragment class="container">
    <header>
      <h1>Application</h1>
    </header>
    <main>
      <h2>Content</h2>
    </main>
  </Fragment>
</template>

<style scoped>
.container {
  width: 600px;
  height: 400px;
  background: skyblue;
  h1 {
    color: red;
  }
}
</style>
