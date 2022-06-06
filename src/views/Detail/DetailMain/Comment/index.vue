<template>
  <div class="Comment">
    <div class="commentsHead" ref="commentsHead">
      <h3 v-if="!showHead">暂无评论</h3>
      <h3 v-else>全部评论</h3>
      <div v-show="showHead">
        <span v-show="isShowComment" @click="turnShow"
          >展开<i class="iconfont icon-down1"></i
        ></span>
        <span v-show="!isShowComment" @click="turnShow"
          >收起<i class="iconfont icon-upward"></i
        ></span>
      </div>
    </div>
    <ul class="commentList" v-show="!isShowComment">
      <li v-for="comFirst in commentList" :key="comFirst.discuss_id">
        <div class="commentItem">
          <img
            v-if="comFirst.user_pic ? true : false"
            :src="comFirst.user_pic"
            alt=""
          />
          <img v-else src="~assets/images/userlogo.svg" alt="" />
          <div class="firtComment">
            <div class="userCon">
              <div class="userInfo">
                <span>{{ comFirst.author_name }}</span>
                <span
                  v-show="!showFirstInput(comFirst.discuss_id)"
                  class="anwserBtn"
                  @click="
                    openFirstAnwser(
                      comFirst.discuss_id,
                      comFirst.author_name,
                      comFirst.author_id,
                      comFirst.discuss_id
                    )
                  "
                  data-anwser="first"
                  >回复</span
                >
                <span
                  v-show="showFirstInput(comFirst.discuss_id)"
                  class="anwserBtn"
                  @click="openFirstAnwser(0)"
                  data-anwser="first"
                  >取消回复</span
                >
              </div>
              <span>{{ getTime(comFirst.create_time) }}</span>
            </div>
            <h3>
              {{ comFirst.content }}
            </h3>
            <div class="anwser" v-show="showFirstInput(comFirst.discuss_id)">
              <textarea
                name="firstText"
                id="firstText"
                cols="30"
                rows="10"
                v-model="commentCon"
              ></textarea>
              <button @click="anwserComment">回复</button>
            </div>
            <div
              class="secondCommentItem"
              v-for="comSecond in comFirst.reply"
              :key="comSecond.reply_id"
            >
              <img
                v-if="comSecond.user_pic ? true : false"
                :src="comSecond.user_pic"
                alt=""
              />
              <img v-else src="~assets/images/userlogo.svg" alt="" />
              <div class="secondComment">
                <div class="userCon">
                  <div class="userInfo">
                    <span>{{ comSecond.from_name }}</span>
                    <span
                      class="anwserBtn"
                      data-anwser="second"
                      @click="
                        openFirstAnwser(
                          comSecond.reply_id,
                          comSecond.from_name,
                          comSecond.from_id,
                          comFirst.discuss_id
                        )
                      "
                      v-show="!showSecondInput(comSecond.reply_id)"
                      >回复</span
                    >
                    <span
                      class="anwserBtn"
                      data-anwser="second"
                      @click="openFirstAnwser(0)"
                      v-show="showSecondInput(comSecond.reply_id)"
                      >取消回复</span
                    >
                  </div>
                  <span>{{ getTime(comSecond.create_time) }}</span>
                </div>
                <h3>
                  <span
                    v-show="comSecond.is_parent == 0 ? false : true"
                    style="color: skyblue"
                    >@{{ comSecond.to_name }}</span
                  >
                  {{ comSecond.content }}
                </h3>
                <div
                  class="anwser"
                  v-show="showSecondInput(comSecond.reply_id)"
                >
                  <textarea
                    name="firstText"
                    id="firstText"
                    cols="30"
                    rows="10"
                    v-model="commentCon"
                  ></textarea>
                  <button @click="anwserComment">回复</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <Pagination
      @getPageNo="getPageNo"
      :pageNo="pageNo"
      :pageSize="pageSize"
      :continue="3"
      :total="total"
      v-show="total == 0 || total <= 5 ? false : true"
      ref="pagination"
    />
  </div>
</template>

<script>
import Pagination from "components/Pagination";
export default {
  // "pageNo", "pageSize", "total", "continue"
  name: "Comment",
  components: {
    Pagination,
  },
  data() {
    return {
      isShowComment: false,
      commentCon: "",
      firstIndex: 0,
      secondIndex: 0,
      comment: [],
      showHead: false,
      pageNo: 1,
      pageSize: 5,
      // total:0,
      continue: 3,
      putdata: {
        to_name: 1,
        to_id: 1,
        comment_id: 1,
        content: "",
        is_parent: 0,
        article_id: 1,
      },
    };
  },
  methods: {
    turnShow() {
      this.isShowComment = !this.isShowComment;
    },
    openFirstAnwser(index, toName, toID, comID) {
      const token = localStorage.getItem("TOKEN");
      if (!token) {
        this.$message.error({
          message: `您还未登录，请进行登录`,
        });
        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);
      } else {
        const anwser = event.target.dataset.anwser;
        this.putdata.to_name = toName;
        this.putdata.to_id = toID;
        this.putdata.comment_id = comID;
        switch (anwser) {
          case "first":
            this.secondIndex = 0;
            if (index == 0) {
              this.commentCon = "";
            }
            this.firstIndex = index;
            break;
          case "second":
            // to_name,
            // to_id,
            // comment_id,
            // content,
            // is_parent = 1
            this.putdata.is_parent = 1;
            this.firstIndex = 0;
            if (index == 0) {
              this.commentCon = "";
            }
            this.secondIndex = index;
            break;
        }
      }
    },
    async getCommentList() {
      const data = {
        id: parseInt(this.$route.query.id),
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      };
      try {
        let result = await this.$API.reqCommentList(data);
        if (result.code == 200) {
          this.comment = result.data;
          if (result.data.firstCommentList.length !== 0) {
            this.showHead = true;
          }
        } else {
          alert(result.message);
        }
      } catch (error) {
        alert(error);
      }
    },
    // 时间格式方法
    getTime(date) {
      const dt = new Date(date);

      var y = dt.getFullYear();
      var m = this.padZero(dt.getMonth() + 1);
      var d = this.padZero(dt.getDate());

      var hh = this.padZero(dt.getHours());
      var mm = this.padZero(dt.getMinutes());

      return y + "-" + m + "-" + d + " " + hh + ":" + mm;
    },
    padZero(n) {
      return n > 9 ? n : "0" + n;
    },
    getPageNo(num) {
      this.pageNo = num;
      this.getCommentList();
      this.$refs.commentsHead.scrollIntoView();
      this.$bus.$emit("getHeight", 0);
    },
    // 回复评论
    async anwserComment() {
      let text = this.commentCon;
      let reg = /^\s*$/;
      let noText = reg.test(text);
      if (!noText) {
        this.putdata.content = this.commentCon;
        this.putdata.article_id = this.$route.query.id;
        try {
          let result = await this.$ACTION.reqAnwserComment(this.putdata);
          if (result.code == 200) {
            this.firstIndex = 0;
            this.commentCon = "";
            this.secondIndex = 0;
            this.getCommentList();
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
      } else {
        this.$message.error({
          message: `请输入回复内容`,
        });
      }
    },
  },
  computed: {
    commentList() {
      return this.comment.firstCommentList || [];
    },
    showFirstInput() {
      return function (args) {
        return args == this.firstIndex ? true : false;
      };
    },
    showSecondInput() {
      return function (args) {
        return args == this.secondIndex ? true : false;
      };
    },
    // 评论数量
    total() {
      return this.comment.total || 0;
    },
  },
  mounted() {
    this.getCommentList();
  },
  watch: {
    "$store.state.detail.index": {
      handler() {
        this.getCommentList();
      },
    },
  },
};
</script>

<style lang="less" scoped>
.Comment {
  // width: 100%;
  // height: 200px;
  background-color: #f3f3f3;
  margin-bottom: 20px;
  // padding-bottom: 10px;
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
  .commentList {
    padding-top: 20px;
    background-color: #fff;
    li {
      .commentItem {
        padding: 10px 15px;
        display: flex;
        // border-bottom: 1px solid #dad7d7;
        background-color: #fff;
        img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin-right: 9px;
        }
        .firtComment {
          flex: 1;
          .userCon {
            font-size: 14px;
            .userInfo {
              display: flex;
              justify-content: space-between;
              padding-bottom: 4px;
              span {
                padding-right: 10px;
              }
              :first-child {
                font-size: 17px;
                color: skyblue;
              }
              .anwserBtn {
                cursor: pointer;
                position: relative;
                top: 2px;
                left: 3px;
              }
            }
          }
          h3 {
            padding: 14px 0 20px 1px;
            font-weight: normal;
            font-size: 17px;
          }
          .anwser {
            transition: all linear 0.2s;
            margin-top: 6px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            textarea {
              // display: block;
              // height: 200px;
              box-sizing: border-box;
              width: 98%;
              padding: 15px;
              margin-right: 6px;
              border: none;
              outline: none;
              font-size: 14px;
              border: 1px solid blue;
              border-radius: 5px;
            }
            button {
              margin: 12px;
              width: 80px;
              border: none;
              padding: 7px;
              border-radius: 4px;
              background-color: red;
              color: #fff;
            }
          }
          .secondCommentItem {
            padding: 10px;
            padding-left: 4px;
            border-radius: 5px;
            background-color: #f3f3f3;
            // border-top: 1px solid #dad7d7;
            border-bottom: 1px solid #dad7d7;
            display: flex;
            .secondComment {
              flex: 1;
              .userCon {
                .userInfo {
                  display: flex;
                  justify-content: space-between;
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