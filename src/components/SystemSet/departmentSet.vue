<style scoped>
  #departmentSet {
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
  }

  .content {
    height: 778px;
    border-radius: 10px;
    margin: 20px 20px 0px;
    background-color: white;
    box-shadow: 0px 7px 4.8px 3.2px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .title {
    height: 40px;
    background-color: #d33a31;
    line-height: 40px;
    padding-left: 10px;
    font-size: 1.4rem;
    color: white;
    letter-spacing: 3px;
    width: 100%;
  }

  .controlBox {
    height: 60px;
    line-height: 60px;
    display: flex;
    padding-left: 10px;
    font-size: 1.4rem;
    border-bottom: 4px solid #e0e0e0;
  }

  .controlBox a {
    margin-right: 15px;
  }

  .controlBox a i {
    margin-right: 5px;
  }

  .controlBox a:hover {
    color: #d33a31;
  }
</style>

<template>
  <div id="departmentSet">
    <nav-bar></nav-bar>
    <Breadcrumb></Breadcrumb>
    <div class="content">
      <div class="title">部门设置</div>
      <div class="controlBox">
        <a><i class="el-icon-plus"></i>新建</a>
        <a><i class="el-icon-edit"></i>编辑</a>
        <a><i class="el-icon-delete"></i>删除</a>
        <a><i class="el-icon-refresh"></i>刷新</a>
      </div>
      <departmentTree></departmentTree>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
  import NavBar from '@/components/common/Navbar'
  import FooterBar from '@/components/common/footer'
  import Breadcrumb from '@/components/common/Breadcrumb'
  import departmentTree from '@/components/SystemSet/departmentTree'

  export default {
    data() {
      return {}
    },
    components: {
      NavBar,
      FooterBar,
      Breadcrumb,
      departmentTree
    },
    methods: {}
  }
</script>
