<template>
  <div class="home">
    <nav-bar></nav-bar>
    <breadcrumb></breadcrumb>
    <div class="content">
      <ul class="fastNav">
        <li>
          <a @click="toTemplateMake">
            <i class="iconfont icon-server-kuaisufabu"></i>
            <b>快速发布</b>
          </a>
        </li>
        <li>
          <a @click="toAudit">
            <i class="iconfont icon-shenhe"></i>
            <b>审核列表</b>
          </a>
        </li>
        <li>
          <a @click="toPlay">
            <i class="iconfont icon-jiemu"></i>
            <b>节目列表</b>
          </a>
        </li>
        <li>
          <a @click="toTerminal">
            <i class="iconfont icon-zhongduan"></i>
            <b>终端管理</b>
          </a>
        </li>
        <li>
          <a @click="toResource">
            <i class="iconfont icon-ziyuanguanli"></i>
            <b>资源管理</b>
          </a>
        </li>
      </ul>
      <div style="font-size: 2rem;padding-left: 100px;margin-bottom: 20px;">发布步骤：</div>
      <el-steps :active="4" align-center>
        <el-step title="选择模板" description="选择一个的模板"></el-step>
        <el-step title="选择素材" description="为模板填充素材"></el-step>
        <el-step title="设置属性" description="设置播放的属性值"></el-step>
        <el-step title="发布节目" description="发布节目成功"></el-step>
      </el-steps>
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
      return {}
    },
    components: {
      NavBar,
      FooterBar,
      Breadcrumb
    },
    methods: {
      toTemplateMake: function () {
        this.$router.push('/templateMake')
      },
      toResource: function () {
        this.$router.push('/resource')
      },
      toPlay:function () {
        this.$router.push('/play')
      },
      toTerminal:function () {
        this.$router.push('/terminal')
      },
      toAudit:function () {
        this.$router.push('/auditList')
      }
    }
  }
</script>

<style scoped>
  .home {
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
  }

  .content {
    height: 73%;
    border-radius: 10px;
    margin: 20px 20px 0px;
    background-color: white;
    padding: 5% 270px 0;
    box-shadow: 0px 7px 4.8px 3.2px rgba(0, 0, 0, 0.1);
  }

  .fastNav {
    display: flex;
    justify-content: space-around;
    margin-bottom: 200px;
  }

  .fastNav li {
    text-align: center;
  }

  .fastNav li a b {
    color: #d33a31;
    display: block;
    font-size: 2rem;
  }

  .fastNav li a i {
    font-size: 100px;
    color: #d33a31;
  }
</style>
