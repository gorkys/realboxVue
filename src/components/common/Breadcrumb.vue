<style scoped>
  #Breadcrumb {
    margin: 10px 60px;
  }
</style>

<template>
  <div id="Breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">{{$t('nav.Home')}}</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in $route.matched" :to="{ path: item.path}">{{$t(item.name)}}</el-breadcrumb-item>
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
