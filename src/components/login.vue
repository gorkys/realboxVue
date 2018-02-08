<template>
  <div class="content">
    <div class="loginBox">
      <div class="login">
        <div class="formBox">
          <div class="logo"></div>
          <div class="form">
            <input type="text" v-model="name" name="name" :placeholder="$t('message.Username')"/>
            <input type="password" name="pass" v-model="pass" :placeholder="$t('message.Password')"/>
            <div class="codeBox">
              <input type="text" name="code" v-model="code" @keyup.enter='getLogin(name)'
                     :placeholder="$t('message.Captcha')"/>
              <img id="code" :src="codeSrc" @click="getCode">
            </div>
            <div class="lang">
              <el-radio-group v-model="language" size="mini">
                <el-radio v-for="item of lang" :label="item.value" border>{{item.label}}</el-radio>
              </el-radio-group>
            </div>
            <a class="entry" @click="getLogin(name)">{{$t('message.login')}}</a>
          </div>
        </div>
      </div>
      <div class="img"></div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    mounted() {
      this.$i18n.locale === 'zh' ? this.language = 0 : this.language = 1
    },
    data() {
      return {
        name: '',
        pass: "",
        code: '',
        language: 0,
        lang: [{
          label: this.$t('message.zh'),
          value: 0
        }, {
          label: this.$t('message.en'),
          value: 1
        }],
        codeSrc: this.$http.defaults.baseURL + '/code'
      }
    },
    methods: {
      getLogin() {
        if (this.name == '' || this.pass == '') {
          this.$message({message: '账号与密码不能为空！', showClose: true, center: true, type: 'warning'});
        }
        if (this.code == '') {
          this.$message({message: '验证码不能为空！', showClose: true, center: true, type: 'warning'});
        }
        this.$http({
          method: 'post',
          url: 'login',
          withCredentials: true,
          data: {
            name: this.name,
            password: this.pass,
            code: this.code
          }
        }).then(response => {
          if (response.data.code == '0000') {
            sessionStorage.setItem("token", response.data.cust.token);
            sessionStorage.setItem("name", response.data.cust.name);
            sessionStorage.setItem("privId", response.data.cust.privId);
            sessionStorage.setItem("userId", response.data.cust.userId)
            this.$router.push('/index')
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              showClose: true,
              center: true,
              type: 'error'
            });
            this.getCode();
          }
        })

      },
      getCode: function () {
        this.codeSrc += '?l=' + Math.random();
      }
    },
    watch: {
      language: function (val) {
        val === 0 ? this.$i18n.locale = 'zh' : this.$i18n.locale = 'en';
        Vue.set(this.lang, 0, {label: this.$t('message.zh'), value: 0});
        Vue.set(this.lang, 1, {label: this.$t('message.en'), value: 1})
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content {
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
    position: relative;
  }

  .loginBox {
    top: 50%;
    left: 50%;
    width: 850px;
    height: 370px;
    margin-top: -185px;
    margin-left: -425px;
    position: absolute;
    border-radius: 10px;
    background-color: white;
    display: flex;
    justify-content: center;
  }

  .login {
    width: 50%;
    height: 100%;
    border-top-left-radius: 1em;
    border-bottom-left-radius: 1em;
  }

  .img {
    width: 50%;
    height: 100%;
    border-top-right-radius: 1em;
    border-bottom-right-radius: 1em;
    background: url("../assets/imgs/login/img.jpg") no-repeat;
    background-size: 130% 100%;
  }

  .formBox {
    padding: 10px 75px;
  }

  .logo {
    height: 85px;
    background: url("../assets/imgs/login/logo.png") no-repeat;
    background-size: 100% 100%;
  }

  .form {
    margin-top: 20px;
  }

  input[name=name], input[name=pass] {
    width: calc(100% - 12px);
    height: 30px;
    margin-bottom: 20px;
    padding-left: 10px;
  }

  .codeBox {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }

  .lang {
    margin-bottom: 20px;
  }

  input[name=code] {
    width: 50%;
    height: 30px;
    display: inline-block;
    padding-left: 10px;
  }

  #code {
    width: 30%;
    height: 32px;
    border: 1px solid #a9a9a9;
    display: inline-block;
    cursor: pointer;
  }

  .entry {
    display: block;
    background-color: rgb(230, 0, 0);
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: white;
    font-size: 1.6rem;
    letter-spacing: 10px;
  }
</style>
