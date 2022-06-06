<template>
  <div class="Login">
    <div class="container">
      <div class="boxTitle">
        <router-link to="/home">华怡篮球社</router-link>
      </div>
      <form action="">
        <div class="username">
          <span class="iconfont icon-zhanghao"></span>
          <input
            type="text"
            name="username"
            placeholder="请输入用户名"
            v-model="username"
          />
        </div>
        <div class="userpassword">
          <span class="iconfont icon-mima"></span>
          <input
            type="password"
            name="password"
            placeholder="请输入密码"
            v-model="password"
          />
        </div>
        <el-button :plain="true" @click.prevent="subLogin">登录</el-button>
        <!-- <button @click.prevent="subLogin">登录</button> -->
      </form>
      <span class="goRegister"
        ><router-link to="register">去注册</router-link></span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async subLogin() {
      if (!this.username) {
        this.$message.error({
          message: `请输入账号`,
        });
      } else if (!this.password) {
        this.$message.error({
          message: `请输入密码`,
        });
      } else {
        const data = {
          username: this.username,
          password: this.password,
        };
        try {
          let result = await this.$API.userlogin(data);
          if (result.code == 200) {
            localStorage.setItem("TOKEN", result.token);
            this.$message({
              message: `${result.message}`,
              type: "success",
            });
            setTimeout(() => {
              this.$router.push("/home");
              this.$store.dispatch("getUserInfo");
            }, 1000);
          } else {
            this.$message.error({
              message: `${result.message}`,
            });
          }
        } catch (error) {
          this.$message.error({
            message: `${error.message}`,
          });
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.Login {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: url(~assets/images/back.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    width: 400px;
    background-color: #fff;
    border-radius: 6px;
    position: relative;
    padding: 30px 0 60px 0;
    .boxTitle {
      font-size: 25px;
      font-weight: bold;
      text-align: center;
      padding-bottom: 10px;
      a {
        color: skyblue;
      }
    }
    form {
      text-align: center;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      div {
        font-size: 14px;
        width: 75%;
        padding: 10px 5px;
        position: relative;
        input {
          box-sizing: border-box;
          border: none;
          outline: none;
          width: 100%;
          height: 40px;
          // background-color: pink;
          border: 1px solid #e1e0e0;
          padding-left: 30px;
          border-radius: 3px;
        }
        span {
          position: absolute;
          top: 20px;
          left: 13px;
        }
      }
      button {
        width: 75%;
        height: 40px;
        border: none;
        border-radius: 4px;
        background-color: rgb(30, 159, 255);
        font-size: 14px;
        margin-top: 10px;
        color: #fff;
      }
    }
    .goRegister {
      position: absolute;
      bottom: 20px;
      right: 13%;
      cursor: pointer;
    }
  }
}
@media screen and(max-width: 767px) {
  .Login {
    width: 100%;
    .container {
      width: 97%;
    }
  }
}
</style>