<style scoped>
  #Breadcrumb {
    margin: 10px 60px;
  }
</style>

<template>
  <div id="Breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>快速导航</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    components: {},
    methods: {}
  }
</script>
