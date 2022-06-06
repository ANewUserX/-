<template>
  <div class="Plugin">
    <div class="container">
      <div class="pluginTitle">
        <span><i class="iconfont icon-bg-maillist"></i>账号管理</span>
      </div>
      <ul class="changeInfo" @click="changeIndex">
        <li :class="currenIndex == 1 ? 'active' : ''" data-userInfo="baseInfo">
          基本信息
        </li>
        <li
          :class="currenIndex == 2 ? 'active' : ''"
          data-userInfo="changeImage"
        >
          修改头像
        </li>
        <li
          :class="currenIndex == 3 ? 'active' : ''"
          data-userInfo="changePassword"
        >
          修改密码
        </li>
      </ul>
      <div class="info">
        <div class="userinfo" ref="userInfo">
          <form action="">
            <div class="username">
              <span>用户名</span>
              <input type="text" v-model="nickname"/>
            </div>
            <div class="userSex">
              <span>性别</span>
              <input type="radio" :checked="gender == 1 " @change="changeGender(1)"/>男 <input type="radio" :checked="gender == 0 " @change="changeGender(0)"/>女
            </div>
            <div class="userEmail">
              <span>邮箱</span>
              <input type="email" v-model="userEmail"/>
            </div>
            <div class="userEmail">
              <span>电话</span>
              <input type="text" v-model="userNum"/>
            </div>
            <button @click.prevent="changeInfo">修改</button>
          </form>
        </div>
        <div class="imageContainer" ref="imageContainer">
          <div class="userImage">
            <div class="checkBox">
              <canvas
                id="canvasOne"
                class="myCanvas"
                ref="canvas"
                :width="canvasWidth"
                :height="canvasHeight"
              ></canvas>
            </div>
            <div class="uploadControl">
              <div class="uploadImage">
                <div class="userAvart"></div>
                <div class="uploadAction">
                  <h4>请上传4M以内的图片</h4>
                  <span class="btn btn-success fileinput-button">
                    <span>上传头像</span>
                    <input
                      type="file"
                      @change="inputOne"
                      ref="imgUpload"
                      accept="image/jpg;image/png"
                    />
                  </span>
                </div>
              </div>
              <div class="savaImage">
                <button @click="submintIMG">保存</button>
              </div>
            </div>
          </div>
        </div>
        <div class="userPassword" ref="userPassword">
          <form action="">
            <div class="oldPassword">
              <span>旧密码</span>
              <input type="password" v-model="oldPassword" />
            </div>
            <div class="newPassword">
              <span>新密码</span>
              <input type="password" v-model="newPassword" />
            </div>
            <div class="rePassword">
              <span>确认密码</span>
              <input type="password" v-model="rePassword" />
            </div>
            <button @click.prevent="changePSW">修改</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Plugin",
  data() {
    return {
      currenIndex: 1,
      imgURL: "",
      canvasWidth: 400,
      canvasHeight: 400,
      newPassword: "",
      oldPassword: "",
      rePassword: "",
      gender:-1,
      nickname:'',
      userEmail:'',
      userNum:''
    };
  },
  methods: {
    changeIndex(event) {
      switch (event.target.dataset.userinfo) {
        case "baseInfo":
          // 让盒子显示和隐藏
          this.$refs.userInfo.style.display = "block";
          this.$refs.imageContainer.style.display = "none";
          this.$refs.userPassword.style.display = "none";
          // 给点击的添加类
          this.currenIndex = 1;
          break;
        case "changeImage":
          this.$refs.userInfo.style.display = "none";
          this.$refs.imageContainer.style.display = "block";
          this.$refs.userPassword.style.display = "none";
          this.currenIndex = 2;
          break;
        case "changePassword":
          this.$refs.userInfo.style.display = "none";
          this.$refs.imageContainer.style.display = "none";
          this.$refs.userPassword.style.display = "block";
          this.currenIndex = 3;
          break;
      }
    },
    inputOne() {
      const that = this;
      //1.获取选中的文件列表
      let fileList = this.$refs.imgUpload.files;
      let file = fileList[0];
      //读取文件内容
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (event) {
        //将结果显示到canvas
        that.showCanvas(reader.result);
        that.imgURL = reader.result;
      };
    },
    showCanvas(dataUrl) {
      // console.info(dataUrl);
      let canvas = this.$refs.canvas;
      var ctx = canvas.getContext("2d");
      //加载图片
      let img = new Image();
      let that = this;
      img.onload = function () {
        // that.canvasWidth = img.width
        // that.canvasHeight = img.height
        ctx.drawImage(img, 0, 0, img.width, img.height);
      };
      img.src = dataUrl;
    },
    async submintIMG() {
      if (!this.imgURL) {
        this.$message.error({
          message: `请上传头像`,
        });
      } else {
        let data = {
          avatar: this.imgURL,
        };
        try {
          let result = await this.$ACTION.userAvatar(data);
          if (result.code == 200) {
            this.$message({
              message: `${result.message}`,
              type: "success",
            });
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
    // 修改密码
    async changePSW() {
      if (!this.newPassword) {
        this.$message.error({
          message: `请输入新密码`,
        });
      } else if (!this.oldPassword) {
        this.$message.error({
          message: `请输入旧密码`,
        });
      } else if (!this.rePassword) {
        this.$message.error({
          message: `请输入确认密码`,
        });
      } else {
        if (this.newPassword !== this.rePassword) {
          this.$message.error({
            message: `新密码和确认密码不一致，请重新确认`,
          });
        } else {
          let data = {
            oldPwd: this.oldPassword,
            newPwd: this.newPassword,
          };
          try {
            let result = await this.$ACTION.reqUserPassword(data);
            if (result.code == 200) {
              this.oldPassword = "";
              this.newPassword = "";
              this.rePassword = "";
              localStorage.removeItem("TOKEN");
              localStorage.removeItem("userid");
              this.$store.commit("GETUSERINFO", "");
              this.$message({
                message: `${result.message + ",请重新登录"}`,
                type: "success",
              });
              setTimeout(() => {
                this.$router.push("/login");
              }, 2000);
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
      }
    },
    changeGender(index){
     this.gender = index 
    },
    // 修改个人信息
    async changeInfo(){
      
    }
  },
};
</script>

<style lang="less" scoped>
.Plugin {
  width: 100%;
  height: 100vh;
  margin: 20px 0;
  background-color: #f3f3f3;
  .container {
    border-radius: 5px;
    width: 1110px;
    margin: 0 auto;
    background-color: #fff;
    padding: 30px 20px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
    .pluginTitle {
      font-size: 30px;
      padding: 0 0 15px 0;
      span {
        i {
          font-size: 45px;
          margin-right: 15px;
          color: skyblue;
          position: relative;
          top: 5px;
        }
      }
    }
    .changeInfo {
      display: flex;
      border-top: 1px solid #f3f3f3;
      border-bottom: 1px solid #f3f3f3;
      li {
        font-size: 16px;
        margin-right: 35px;
        padding: 20px 0;
        cursor: pointer;
      }
      .active {
        border-bottom: 4px solid red;
      }
    }
    .info {
      .userinfo {
        form {
          padding: 25px;
          margin-top: 15px;
          div {
            font-size: 16px;
            margin-bottom: 15px;
            position: relative;
            span {
              margin-right: 15px;
              color: orange;
            }
            input {
              outline: none;
            }
          }
          .username {
            input {
              padding: 5px 0 5px 10px;
              border: none;
              border-bottom: 1px solid #a29e9e;
            }
          }
          .userSex {
            span {
              margin-right: 30px;
            }
            input {
              margin-right: 5px;
              &:last-child {
                margin-left: 10px;
              }
            }
          }
          .userEmail {
            span {
              margin-right: 30px;
            }
            input {
              padding: 5px 0 5px 10px;
              border: none;
              border: 1px solid #a29e9e;
            }
          }
          button {
            padding: 5px 20px;
            border: none;
            background-color: rgb(66, 191, 240);
            color: #fff;
            font-size: 16px;
            border-radius: 4px;
          }
        }
      }
      .imageContainer {
        display: none;
        .userImage {
          padding: 25px;
          margin-top: 15px;
          display: flex;
          .canvas {
            display: block;
            width: 400px;
            height: 400px;
            background-color: pink;
            margin-right: 15px;
          }
          .uploadControl {
            margin-left: 20px;
            .uploadImage {
              display: flex;
              .userAvart {
                width: 80px;
                height: 80px;
                background-color: orange;
                border-radius: 50%;
                // float: left;
                background-size: cover;
                overflow: hidden;
                margin-right: 20px;
                background-position: center center;
                background-repeat: no-repeat;
              }
              .uploadAction {
                padding: 20px;
                background-color: antiquewhite;
                box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
                .fileinput-button {
                  position: relative;
                  display: inline-block;
                  overflow: hidden;
                  padding: 10px 15px;
                  background-color: #a6bff5;
                  color: #fff;
                  border-radius: 4px;
                }
                h4 {
                  font-weight: normal;
                  font-size: 14px;
                  margin-bottom: 15px;
                  color: #aaa5a5;
                }
                .fileinput-button input {
                  position: absolute;
                  right: 0px;
                  top: 0px;
                  opacity: 0;
                  -ms-filter: "alpha(opacity=0)";
                  font-size: 200px;
                }
              }
            }
            .savaImage {
              display: flex;
              justify-content: center;
              padding-top: 30px;
              button {
                border: none;
                padding: 5px 20px;
                border-radius: 4px;
                color: #fff;
                background-color: rgb(66, 191, 240);
                font-size: 16px;
              }
            }
          }
        }
      }
      .userPassword {
        display: none;
        padding: 30px 20px;
        div {
          font-size: 16px;
          margin-bottom: 15px;
          position: relative;
          span {
            margin-right: 15px;
            color: orange;
          }
          input {
            outline: none;
            padding: 5px 0 5px 10px;
            border: none;
            border: 1px solid #a29e9e;
          }
        }
        .oldPassword {
          span {
            margin-right: 30px;
          }
        }
        .newPassword {
          span {
            margin-right: 30px;
          }
        }
        button {
          padding: 5px 20px;
          border: none;
          background-color: rgb(66, 191, 240);
          color: #fff;
          font-size: 16px;
          border-radius: 4px;
        }
      }
    }
  }
}
@media screen and(min-width: 997px) and(max-width:1200px) {
  .Plugin {
    width: 100%;
    .container {
      width: 930px;
    }
  }
}
@media screen and(min-width: 767px) and(max-width:997px) {
  .Plugin {
    width: 100%;
    .container {
      width: 680px;
      .info {
        .imageContainer {
          .userImage {
            .canvas {
              width: 200px;
              height: 200px;
            }
            .uploadControl {
              .uploadImage {
                img {
                  width: 50px;
                  height: 50px;
                }
              }
            }
          }
        }
      }
    }
  }
}
@media screen and(max-width: 767px) {
  .Plugin {
    width: 100%;
    .container {
      width: 88%;
      .info {
        .imageContainer {
          .userImage {
            flex-direction: column;
            align-items: center;
            .canvas {
              width: 200px;
              height: 200px;
            }
            .uploadControl {
              .uploadImage {
                margin-top: 15px;
                img {
                  width: 50px;
                  height: 50px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>