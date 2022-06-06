<template>
  <div class="Collect" ref="collect">
    <RouteContainer>
      <template slot="left">
        <el-card
          class="box-card mobile"
          style="width: 100%"
          v-show="screenWidth < 767"
        >
          <div slot="header" class="clearfix">
            <img
              class="userAvart"
              v-show="userInfo.user_pic ? true : false"
              :src="userInfo.user_pic"
              alt=""
            />
            <img
              class="userAvart"
              v-show="userInfo.user_pic ? false : true"
              src="~assets/images/userlogo.svg"
              alt=""
            />
            <span style="font-size: 15px">你好！{{ userInfo.nickname }}</span>
          </div>
          <div class="text item">昵称：{{ userInfo.nickname }}</div>
          <div class="text item">
            性别：{{
              userInfo.gender ? (userInfo.gender == 1 ? "男" : "女") : "未完善"
            }}
          </div>
          <div class="text item">
            邮箱：{{ userInfo.email ? toStr(userInfo.email) : "未完善" }}
          </div>
          <div class="text item">
            电话：{{ userInfo.user_num ? toStr(userInfo.user_num) : "未完善" }}
          </div>
          <div class="btn">
            <el-button type="text" @click="goPlugin">修改个人信息</el-button>
          </div>
          <div class="btn">
            <el-button type="text" @click="outgin" style="font-size: 13px"
              >退出登录</el-button
            >
          </div>
        </el-card>
        <el-card
          class="box-card noCollect"
          style="width: 100%"
          v-show="collecList.length == 0"
        >
          你还没有收藏的文章！赶紧去看看吧!<span @click="goNews">跳转</span>
        </el-card>
        <RecomNewsNav :list="collecList" />
        <Pagination
          v-show="total <= pageSize ? false : true"
          @getPageNo="getPageNo"
          :pageNo="pageNo"
          :pageSize="pageSize"
          :continue="contin"
          :total="total"
        />
      </template>
      <template slot="right">
        <el-card class="box-card" style="width: 100%">
          <div slot="header" class="clearfix">
            <img
              class="userAvart"
              v-show="userInfo.user_pic ? true : false"
              :src="userInfo.user_pic"
              alt=""
            />
            <img
              class="userAvart"
              v-show="userInfo.user_pic ? false : true"
              src="~assets/images/userlogo.svg"
              alt=""
            />
            <span style="font-size: 15px">你好！{{ userInfo.nickname }}</span>
          </div>
          <div class="text item">昵称：{{ userInfo.nickname }}</div>
          <div class="text item">
            性别：{{
              userInfo.gender ? (userInfo.gender == 1 ? "男" : "女") : "未完善"
            }}
          </div>
          <div class="text item">
            邮箱：{{ userInfo.email ? toStr(userInfo.email) : "未完善" }}
          </div>
          <div class="text item">
            电话：{{ userInfo.user_num ? toStr(userInfo.user_num) : "未完善" }}
          </div>
          <div class="btn">
            <el-button type="text" @click="goPlugin">修改个人信息</el-button>
          </div>
          <div class="btn">
            <el-button type="text" @click="outgin" style="font-size: 13px"
              >退出登录</el-button
            >
          </div>
        </el-card>
      </template>
    </RouteContainer>
  </div>
</template>

<script>
import RouteContainer from "components/RouteContainer";
import RecomNewsNav from "components/RecomNewsNav";
import Pagination from "components/Pagination";
import { mapState } from "vuex";
export default {
  name: "Collect",
  data() {
    return {
      collecList: [],
      pageNo: 1,
      total: 0,
      pageSize: 10,
      contin: 5,
    };
  },
  components: {
    RouteContainer,
    RecomNewsNav,
    Pagination,
  },
  mounted() {
    this.getData();
    // console.log('a');
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      screenWidth: (state) => state.common.screenWidth,
    }),
  },
  methods: {
    goPlugin() {
      this.$router.push("/plugin");
    },
    toStr(num) {
      let str = "" + num;
      let newStr = str.substr(0, 3) + "****" + str.substr(7);
      return newStr;
    },
    outgin() {
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("userid");
      this.$store.commit("GETUSERINFO", "");
      this.$router.push("/login");
    },
    async getData() {
      let token = localStorage.getItem("TOKEN");
      if (token) {
        let data = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        };
        try {
          // console.log('a');
          // this.$store.dispatch("getUserInfo");
          let result = await this.$ACTION.reqUserCollect(data);
          if (result.code == 200) {
            this.collecList = result.data.collectItem;
            this.total = result.data.total;
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
    goNews() {
      this.$router.push("/news");
    },
    getPageNo(num) {
      this.pageNo = num
      this.getData()
      this.$refs.collect.scrollIntoView()
    },
  },
};
</script>

<style lang="less" scoped>
.noCollect {
  margin-top: 30px;
  text-align: center;
  font-size: 25px;
  width: 100%;
  background-color: #fff;
  border: 2px solid #f3f3f3;
  border-radius: 5px;
  box-shadow: 0 0 1px rgba(67, 66, 66, 0.5);
  // padding: 25px 20px;
  padding: 150px 0;
  span {
    color: skyblue;
    cursor: pointer;
  }
}
.mobile {
  margin-top: 30px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.clearfix {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.userAvart {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  margin-bottom: 10px;
}
.btn {
  display: flex;
  justify-content: center;
}
</style>