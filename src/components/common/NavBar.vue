<template>
  <div class="navBarBox">
    <div class="logo">
      <img src="../../assets/imgs/logo1.png" alt="">
    </div>
    <div class="navBox">
      <!--<ul class="navList">
        <li @click="index">首页</li>
        <li @click="toResource">资源管理</li>
        <li>
          <el-dropdown>
          <span class="el-dropdown-link">
            终端管理<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="goTerminal">终端管理</el-dropdown-item>
              <el-dropdown-item>终端列表</el-dropdown-item>
              <el-dropdown-item @click.native="goActiveCode">激活码管理</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li @click="goTemplate">模板管理</li>
        <li>
          <el-dropdown>
          <span class="el-dropdown-link">
            节目管理<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="goPlay ">节目列表</el-dropdown-item>
              <el-dropdown-item @click.native="goProgram">发布管理</el-dropdown-item>
              <el-dropdown-item @click.native="goAudit">审核列表</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li>
          <el-dropdown>
          <span class="el-dropdown-link">
            日志管理<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="userLog">用户日志</el-dropdown-item>
              <el-dropdown-item @click.native="operatingLog">系统日志</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li>
          <el-dropdown>
          <span class="el-dropdown-link">
            用户管理<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="terGroupSet">终端设置</el-dropdown-item>
              <el-dropdown-item @click.native="userSet">用户设置</el-dropdown-item>
              <el-dropdown-item @click.native="roleSet">角色管理</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li @click="generalSet">系统设置</li>
      </ul>-->
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal"
               background-color="#d33a31" text-color="#fff" active-text-color="#ffd04b" :router="true">
        <el-menu-item index="/index">首页</el-menu-item>
        <el-menu-item index="/resource">资源管理</el-menu-item>
        <el-submenu index="3">
          <template slot="title">终端管理</template>
          <el-menu-item index="/terminal">终端管理</el-menu-item>
          <el-menu-item index="">终端列表</el-menu-item>
          <el-menu-item index="/activeCode">激活码管理</el-menu-item>
        </el-submenu>

        <el-menu-item index="/template">模板管理</el-menu-item>
        <el-submenu index="5">
          <template slot="title">节目管理</template>
          <el-menu-item index="/play">节目列表</el-menu-item>
          <el-menu-item index="/programList">发布管理</el-menu-item>
          <el-menu-item index="/auditList">审核列表</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">日志管理</template>
          <el-menu-item index="/userLog">用户日志</el-menu-item>
          <el-menu-item index="/operatingLog">系统日志</el-menu-item>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">用户管理</template>
          <el-menu-item index="/terGroupSet">终端设置</el-menu-item>
          <el-menu-item index="/userSet">用户设置</el-menu-item>
          <el-menu-item index="/roleSet">角色管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="/generalSet">系统设置</el-menu-item>
      </el-menu>
    </div>
    <div class="user">
      <i class="iconfont icon-guanliyuan"></i>
      <div class="userBox">
        <el-dropdown trigger="click">
          <b class="name">{{name}}</b>
          <i class="iconfont icon-xiala"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="outLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: sessionStorage.getItem('name'),
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    methods: {
      //注销登录
      outLogin: function () {
        sessionStorage.removeItem("name");
        this.$router.push('/')
      },
    }
  }
</script>

<style scoped>
  .navBarBox {
    width: 100%;
    height: 80px;
    min-width: 1120px;
    background-color: #d33a31;
    display: flex;
    justify-content: space-between;
  }

  .logo {
    width: 20%;
    text-align: center;
  }

  .logo img {
    height: 70px;
    margin: 5px 0;
  }

  .navBox {
    width: 60%;
    padding: 0 5%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  .navList {
    height: 80px;
    display: flex;
    color: white;
    font-weight: bold;
    justify-content: space-around;
    align-items: center;
  }

  .navList li {
    font-size: 1.6rem;
    letter-spacing: 4px;
    cursor: pointer;
  }

  .user {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .user > i {
    color: #ffd224;
    font-size: 2.8rem;
    margin-right: 10px;
  }

  .userBox {
    display: inline-block;
    cursor: pointer;
  }

  .userBox i {
    color: white;
    font-size: 1.6rem;
    margin-left: 4px;
  }

  .name {
    color: white;
    font-size: 1.8rem;
  }

  .el-dropdown-link {
    color: white;
    font-size: 1.6rem;
  }
</style>
