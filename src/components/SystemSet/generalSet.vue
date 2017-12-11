<style scoped>
  #generalSet {
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

  .audit{
    font-size: 1.4rem;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>

<template>
  <div id="generalSet">
    <nav-bar></nav-bar>
    <Breadcrumb></Breadcrumb>
    <div class="content">
      <div class="title">常规设置</div>
      <div class="Setting">
        <div class="audit">
          <label>发布节目是否需要审核：</label>
          <el-switch
            v-model="audit"
            active-color="#13ce66"
            inactive-color="#B7B7B7">
          </el-switch>
        </div>
      </div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
  import NavBar from '@/components/common/Navbar'
  import FooterBar from '@/components/common/footer'
  import Breadcrumb from '@/components/common/Breadcrumb'

  export default {
    data() {
      return {
        audit:true
      }
    },
    components: {
      NavBar,
      FooterBar,
      Breadcrumb
    },
    methods: {}
  }
</script>
