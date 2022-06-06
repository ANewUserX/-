<template>
  <div class="DetailMain">
    <div class="container">
      <ul class="articleTab">
        <li v-for="(item, index) in tagList" :key="index">{{ item }}</li>
      </ul>
      <div class="articleTitle">
        <h2>{{ newsDetail.title }}</h2>
        <span></span>
      </div>
      <div class="articleInfo">
        <span
          ><i class="iconfont icon-fenlei"></i>{{ newsDetail.cate_name }}</span
        >
        <span
          ><i class="iconfont icon-shizhong"></i
          >{{ counttime(newsDetail.pub_date) }}前</span
        >
        <span
          ><i class="iconfont icon-yanjing"></i
          >{{ newsDetail.read_count }}</span
        >
        <span
          ><i class="iconfont icon-pinglun"></i
          >{{ newsDetail.comment_count }}</span
        >
      </div>
      <div class="articleContent" ref="content"></div>
      <div class="userAction" @click="userClick">
        <span
          v-show="turnLikeShow ? !isShowLike : !newsDetail.showLike"
          data-action="giveLike"
          ><i data-action="giveLike" class="iconfont icon-good"></i>点赞</span
        >
        <span
          v-show="turnLikeShow ? isShowLike : newsDetail.showLike"
          data-action="cancelLike"
          ><i
            data-action="cancelLike"
            class="iconfont icon-dianzanyidianzan"
            style="color: red"
          ></i
          >已点赞</span
        >
        <span
          v-show="turnCollect ? !hasCollect : !newsDetail.showCollect"
          data-action="collect"
          ><i
            data-action="collect"
            class="iconfont icon-shoucang"
            style="font-size: 23px"
          ></i
          >收藏</span
        >
        <span
          v-show="turnCollect ? hasCollect : newsDetail.showCollect"
          data-action="cancelCollect"
          ><i
            data-action="cancelCollect"
            class="iconfont icon-shoucang-yishoucang"
            style="color: red; font-size: 23px"
          ></i
          >已收藏</span
        >
        <span @click="openComment"
          ><i class="iconfont icon-pinglun1"></i>评论</span
        >
      </div>
      <div class="comments">
        <form action="" v-show="showComInput">
          <span>Re:{{ newsDetail.title }}</span>
          <textarea
            name="inputText"
            id=""
            cols="30"
            rows="10"
            placeholder="请发表你的评论"
            v-model="commentValue"
          ></textarea>
          <button @click.prevent="submitComment">发表</button>
        </form>
      </div>
      <Comment></Comment>
      <div class="jumpControl" @click="goNextOrLast">
        <div class="former" data-info="former">
          <span data-info="former">上一篇</span>
          <h4 data-info="former">{{ lastAndNextNews.lastNews }}</h4>
        </div>
        <div class="latter" data-info="latter">
          <span data-info="latter">下一篇</span>
          <h4 data-info="latter">{{ lastAndNextNews.nextNews }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "./Comment";
import { mapGetters } from "vuex";
export default {
  name: "DetailMain",
  data() {
    return {
      isShowContent: true,
      userComment: "",
      tagList: [],
      turnLikeShow: false,
      turnCollect: false,
      isShowLike: false,
      hasCollect: false,
      commentValue: "",
      index: 0,
      showComInput: false,
    };
  },
  methods: {
    turnShow() {
      this.isShowContent = !this.isShowContent;
    },
    counttime(time) {
      let nowTime = +new Date();
      let InputTime = +new Date(time);
      let Sumtime = (nowTime - InputTime) / 1000;
      let d = parseInt(Sumtime / 60 / 60 / 24);
      let h = parseInt((Sumtime / 60 / 60) % 24);
      let m = parseInt((Sumtime / 60) % 60);
      if (d > 0) {
        // d = d < 10 ? "0" + d : d;
        return d + "天";
      } else if (d == 0 && h > 0) {
        // d = d < 10 ? "0" + d : d;
        return h + "小时";
      } else if (d == 0 && h == 0 && m > 0) {
        // m = m < 10 ? "0" + m : m;
        return m + "分钟";
      } else {
        return "1分钟";
      }
    },
    getData() {
      const id = this.$route.query.id;
      this.$store.dispatch("getDetailList", id);
    },
    goNextOrLast(e) {
      const info = e.target.dataset.info;
      const nowId = this.newsDetail.article_id;
      let goId;
      if (info == "former") {
        goId = nowId - 1;
        this.$router.push({ name: "detail", query: { id: goId } });
      } else {
        goId = nowId - 2;
        this.$router.push({ name: "detail", query: { id: goId } });
      }
    },
    // 点赞和收藏功能
    async userClick(e) {
      const token = localStorage.getItem("TOKEN");
      if (!token) {
        this.$message.error({
          message: `您还未登录，请进行登录`,
        });
        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);
      } else {
        const action = e.target.dataset.action;
        const id = this.$route.query.id;
        switch (action) {
          case "giveLike":
            try {
              let result = await this.$ACTION.reqGiveLike(id);
              if (result.code == 200) {
                this.turnLikeShow = true;
                this.isShowLike = true;
              } else {
                alert(result.message);
              }
            } catch (error) {
              alert(error.message);
            }
            break;
          case "cancelLike":
            try {
              let result = await this.$ACTION.reqCancelLike(id);
              if (result.code == 200) {
                this.turnLikeShow = true;
                this.isShowLike = false;
              } else {
                alert(result.message);
              }
            } catch (error) {
              alert(error.message);
            }
            break;
          case "collect":
            try {
              let result = await this.$ACTION.reqCollect(id);
              if (result.code == 200) {
                this.turnCollect = true;
                this.hasCollect = true;
              } else {
                alert(result.message);
              }
            } catch (error) {
              alert(error.message);
            }
            break;
          case "cancelCollect":
            try {
              let result = await this.$ACTION.reqCancelCollect(id);
              if (result.code == 200) {
                this.turnCollect = true;
                this.hasCollect = false;
              } else {
                alert(result.message);
              }
            } catch (error) {
              alert(error.message);
            }
            break;
        }
      }
    },
    // 评论
    async submitComment() {
      let text = this.commentValue;
      let reg = /^\s*$/;
      let noText = reg.test(text);
      if (noText) {
        this.$message.error({
          message: `请输入评论内容`,
        });
      } else {
        let data = {
          article_id: this.$route.query.id,
          content: this.commentValue,
        };
        try {
          let result = await this.$ACTION.reqUserComment(data);
          if (result.code == 200) {
            this.commentValue = "";
            this.index++;
            this.$message({
              message: `${result.message}`,
              type: "success",
            });
            this.$store.dispatch("addDetail", this.index);
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
    // 打开评论区
    openComment() {
      const token = localStorage.getItem("TOKEN");
      if (!token) {
        this.$message.error({
          message: `您还未登录，请进行登录`,
        });
        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);
      } else {
        this.showComInput = true;
      }
    },
  },
  mounted() {
    // this.$API
    this.getData();
  },
  computed: {
    ...mapGetters(["newsDetail", "lastAndNextNews"]),
  },
  components: { Comment },
  watch: {
    "$store.state.detail.detailList": {
      handler() {
        if (this.newsDetail.article_tabs) {
          this.tagList = this.newsDetail.article_tabs.split(",") || [];
        }
        if (this.$refs.content.childNodes.length == 0) {
          const div = document.createElement("div");
          div.innerHTML = this.newsDetail.content || "";
          this.$refs.content.appendChild(div);
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.DetailMain {
  width: 100%;
  margin: 30px 0;
  .container {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    .articleTab {
      margin-bottom: 15px;
      display: flex;
      flex-wrap: wrap;
      li {
        padding: 7px;
        background-color: #ff5e5c;
        border-radius: 3px;
        color: #fff;
        margin-right: 10px;
        font-size: 12px;
      }
    }
    .articleTitle {
      margin-bottom: 30px;
      h2 {
        font-size: 30px;
        padding-bottom: 25px;
        font-weight: normal;
        border-bottom: 1px solid #c5c3c3;
      }
      span {
        display: block;
        width: 50px;
        height: 4px;
        background-color: red;
        position: relative;
        top: -2px;
      }
    }
    .articleInfo {
      display: flex;
      span {
        font-size: 16px;
        margin-right: 15px;
        i {
          padding-right: 5px;
        }
      }
    }
    .articleContent {
      img {
        width: 100%;
      }
      margin-top: 20px;
      font-size: 18px;
      line-height: 50px;
    }
    .userAction {
      margin: 20px 0 20px 10px;
      span {
        margin-right: 20px;
        font-size: 20px;
        cursor: pointer;
        i {
          font-size: 20px;
          margin-right: 5px;
        }
      }
    }
    .comments {
      margin-bottom: 20px;
      form {
        background-color: #f3f3f3;
        display: flex;
        flex-direction: column;
        padding: 20px;
        position: relative;
        border-radius: 4px;
        #inputText {
          padding: 10px 0;
          text-indent: 9px;
          width: 100%;
          height: 200px;
          border: none;
          outline: none;
        }
        span {
          margin-bottom: 10px;
          font-size: 14px;
        }
        textarea {
          border: none;
          outline: none;
          box-sizing: border-box;
          padding: 20px;
          height: 200px;
          font-size: 14px;
          border-radius: 5px;
          font-size: 15px;
        }
        button {
          width: 20%;
          border: none;
          background-color: red;
          border-radius: 4px;
          color: #fff;
          padding: 10px 0;
          font-size: 14px;
          margin-top: 10px;
          float: right;
          margin-left: 80%;
        }
      }
      .commentsControl {
        margin-top: 15px;
        background-color: #f3f3f3;
        padding-bottom: 20px;
        .commentsHead {
          display: flex;
          padding: 20px 0;
          border-bottom: 1px solid #dad7d7;
          h3 {
            font-size: 20px;
            padding: 0 30px 0 20px;
            border-left: 3px solid red;
          }
          span {
            font-size: 13px;
            position: relative;
            top: 2px;
            margin-left: 15px;
            cursor: pointer;
          }
        }
      }
      .commentList {
        border-radius: 10px;
        margin-bottom: 10px;
        li {
          .commentItem {
            display: flex;
            padding: 10px 15px;
            border-bottom: 1px solid #dad7d7;
            .userImage {
              width: 36px;
              height: 36px;
              border-radius: 50%;
              margin-right: 10px;
              background-image: url(~assets/images/userImage.jpg);
              background-repeat: no-repeat;
              background-size: cover;
              background-position: center center;
            }
            .userComment {
              .userInfo {
                span {
                  font-size: 14px;
                  &:first-child {
                    font-size: 16px;
                    margin-right: 15px;
                    color: skyblue;
                  }
                }
              }
              h3 {
                font-size: 18px;
                padding: 10px 0;
                font-weight: normal;
              }
            }
          }
        }
      }
    }
    .jumpControl {
      display: flex;
      cursor: pointer;
      .former {
        flex: 1;
        height: 150px;
        // background-color: rgba(0,0,0,0.46);
        background-color: rgb(237, 228, 228);
        padding: 0 20px;
        display: flex;
        text-align: center;
        flex-direction: column;
        font-size: 16px;
        color: #fff;
        justify-content: center;
        span {
          font-size: 20px;
        }
        h4 {
          font-weight: normal;
        }
      }
      .latter {
        flex: 1;
        height: 150px;
        background-color: rgba(0, 0, 0, 0.46);
        padding: 0 20px;
        display: flex;
        text-align: center;
        flex-direction: column;
        font-size: 16px;
        color: #fff;
        justify-content: center;
        span {
          font-size: 20px;
        }
        h4 {
          font-weight: normal;
        }
      }
    }
  }
}
</style>