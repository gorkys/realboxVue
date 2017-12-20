<template>
  <div class="navBarBox">
    <div class="logo">
      <img src="../../assets/imgs/logo1.png" alt="">
    </div>
    <div class="navBox">
      <ul class="navList">
        <li @click="index">首页</li>
        <li @click="toResource">资源管理</li>
        <li>
          <el-dropdown>
          <span class="el-dropdown-link">
            终端管理<i class="el-icon-arrow-down el-icon--right"></i>
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
            节目管理<i class="el-icon-arrow-down el-icon--right"></i>
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
            日志管理<i class="el-icon-arrow-down el-icon--right"></i>
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
            用户管理<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="departmentSet">部门设置</el-dropdown-item>
              <el-dropdown-item @click.native="userSet">用户设置</el-dropdown-item>
              <el-dropdown-item @click.native="roleSet">角色管理</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li @click="generalSet">系统设置</li>
      </ul>
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
        name: sessionStorage.getItem('name')
      }
    },
    methods: {
      //注销登录
      outLogin: function () {
        sessionStorage.removeItem("name");
        this.$router.push('/')
      },
      //资源管理
      toResource: function () {
        this.$router.push('/resource')
      },
      //日志管理
      userLog: function () {
        this.$router.push('/userLog')
      },
      operatingLog: function () {
        this.$router.push('/operatingLog')
      },
      //首页
      index: function () {
        this.$router.push('/index')
      },
      //系统设置
      generalSet: function () {
        this.$router.push('/generalSet')
      },
      departmentSet: function () {
        this.$router.push('/departmentSet')
      },
      userSet: function () {
        this.$router.push('/userSet')
      },
      roleSet: function () {
        this.$router.push('/roleSet')
      },
      //end
      //终端管理
      goTerminal: function () {
        this.$router.push('/terminal')
      },
      goActiveCode:function () {
        this.$router.push('/activeCode')
      },
      //模板管理
      goTemplate: function () {
        this.$router.push('/template')
      },
      //节目管理
      goPlay:function () {
        this.$router.push('/play')
      },
      goProgram:function () {
        this.$router.push('/programList')
      },
      goAudit:function () {
        this.$router.push('/auditList')
      }
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
