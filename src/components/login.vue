<template>
  <div class="content">
    <div class="loginBox">
      <div class="login">
        <div class="formBox">
          <div class="logo"></div>
          <div class="form">
            <input type="text" v-model="name" name="name" placeholder="账号"/>
            <input type="password" name="pass" v-model="pass" placeholder="密码"/>
            <div class="codeBox">
              <input type="text" name="code" v-model="code" @keyup.enter='getLogin(name)' placeholder="验证码"/>
              <img id="code" :src="codeSrc" @click="getCode">
            </div>
            <a class="entry" @click="getLogin(name)">登录</a>
          </div>
        </div>
      </div>
      <div class="img"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        name: '',
        pass: "",
        code: '',
        codeSrc: 'http://192.168.1.8:8081/code'
      }
    },
    methods: {
      getLogin() {
        if (this.name == '' || this.pass == '') {
          this.$message({message: '账号与密码不能为空！', center: true, type: 'warning'});
        }
        if (this.code == '') {
          this.$message({message: '验证码不能为空！', center: true, type: 'warning'});
        }
        this.$http({
          method: 'post',
          url: 'login',
          withCredentials:true,
          data: {
            name: this.name,
            password: this.pass,
            code: this.code
          }
        }).then(response => {
          debugger
          if (response.data.code == '0000') {
            sessionStorage.setItem("token", response.data.cust.token);
            sessionStorage.setItem("name", response.data.cust.name);
            this.$router.push('/index')
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })

      },
      getCode: function () {
        this.codeSrc = this.codeSrc + '?l=' + Math.random();
      }
    }
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
    padding: 25px 75px;
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
