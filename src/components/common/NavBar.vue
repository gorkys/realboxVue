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
        <el-menu-item index="/index">{{$t('nav.Home')}}</el-menu-item>
        <el-menu-item index="/resource">{{$t('nav.Resource')}}</el-menu-item>
        <el-submenu index="3">
          <template slot="title">{{$t('nav.Terminal')}}</template>
          <el-menu-item index="/terminal">{{$t('nav.Terminal')}}</el-menu-item>
          <!--<el-menu-item index="">终端列表</el-menu-item>-->
          <el-menu-item index="/activeCode">{{$t('nav.ActiveCode')}}</el-menu-item>
        </el-submenu>

        <el-menu-item index="/template">{{$t('nav.Template')}}</el-menu-item>
        <el-submenu index="5">
          <template slot="title">{{$t('nav.Program')}}</template>
          <el-menu-item index="/programList">{{$t('nav.ProgramList')}}</el-menu-item>
          <el-menu-item index="/releaseMng">{{$t('nav.Release')}}</el-menu-item>
          <el-menu-item index="/auditList">{{$t('nav.AuditList')}}</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">{{$t('nav.Log')}}</template>
          <el-menu-item index="/userLog">{{$t('nav.UserLog')}}</el-menu-item>
          <el-menu-item index="/operatingLog">{{$t('nav.SystemLog')}}</el-menu-item>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">{{$t('nav.User')}}</template>
          <el-menu-item index="/terGroupSet">{{$t('nav.TerminalSet')}}</el-menu-item>
          <el-menu-item index="/userSet">{{$t('nav.UserSet')}}</el-menu-item>
          <el-menu-item index="/roleSet">{{$t('nav.RoleSet')}}</el-menu-item>
        </el-submenu>
        <el-menu-item index="/generalSet">{{$t('nav.System')}}</el-menu-item>
      </el-menu>
    </div>
    <div class="user">
      <i class="iconfont icon-guanliyuan"></i>
      <div class="userBox">
        <el-dropdown trigger="click">
          <b class="name">{{name}}</b>
          <i class="iconfont icon-xiala"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{$t('nav.ModifyPass')}}</el-dropdown-item>
            <el-dropdown-item @click.native="outLogin">{{$t('nav.SignOut')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="lang">
        <el-dropdown trigger="click">
          <b class="name">中文/EN</b>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="changeLang('zh')">{{$t('message.zh')}}</el-dropdown-item>
            <el-dropdown-item @click.native="changeLang('en')">{{$t('message.en')}}</el-dropdown-item>
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
        int: ''
      }
    },
    mounted() {
      this.check();
      this.$i18n.locale = localStorage.getItem('lang')
    },
    methods: {
      //注销登录
      outLogin: function () {
        sessionStorage.removeItem("name");
        clearTimeout(this.int);
        this.$router.push('/');
      },
      changeLang(val) {
        this.$http({
          method: 'get',
          url: 'system/language?language=' + val,
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code === '0000') {
            localStorage.setItem('lang',val);
            this.$i18n.locale = val;
            this.$emit('lang-change')
          }
        });

      },
      check() {
        let _this = this;
        if (_this.name != null) {
          _this.int = setTimeout(() => {
            _this.$http({
              method: 'get',
              url: 'system/check',
              withCredentials: true,
              headers: {
                token: sessionStorage.getItem('token'),
                name: sessionStorage.getItem('name')
              }
            }).then(response => {
              if (response.data.code == 'TOKEN000') {
                clearTimeout(_this.int);
                _this.$alert(this.$t('Msg.ID_MSG_73'), this.$t('Content.ID_PROMPT'), {
                  confirmButtonText: this.$t('Content.ID_OK'),
                  cancelButtonText: this.$t('Content.ID_CANCEL'),
                  type: 'warning',
                  callback: () => {
                    _this.$router.push('/');
                  }
                });
              } else {
                this.check();
              }
            })
          }, 9000)
        } else {
          this.$router.push('/')
        }
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
    font-size: 2rem;
    margin-right: 10px;
  }

  .userBox, .lang {
    display: inline-block;
    cursor: pointer;
  }

  .lang {
    margin-left: 20px;
  }

  .userBox i {
    color: white;
    font-size: 1.4rem;
    margin-left: 4px;
  }

  .name {
    color: white;
    font-size: 1.6rem;
  }

  .el-menu--horizontal {
    border: none !important;
  }
</style>
