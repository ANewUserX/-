<template>
  <header>
    <h3 ref="webdescript">花怡个人篮球社区</h3>
    <div class="BasketHearder" ref="BasketHearder">
          <div class="container">
      <!-- logo部分 -->
      <div class="logo">
        <router-link to="/home"><img src="~assets/images/logo.png" alt="" /></router-link>
      </div>
      <!-- 分类部分 -->
      <div class="category">
        <ul class="catrgoryList">
          <li><router-link to="/home">首页</router-link></li>
          <li><router-link to="/news">新闻</router-link></li>
          <li><router-link to="/file">资讯</router-link></li>
          <li><router-link to="/collect">个人</router-link></li>
        </ul>
      </div>
      <!-- 搜索部分 -->
      <div class="search">
        <form class="search_form" @submit.prevent="submitQuery">
          <input
            type="text"
            placeholder="Search"
            ref="searchInput"
            @focus="inputFocus"
            @blur="inputBlur"
            v-model="searchQuery"
          />
          <button>
            <a @click.prevent="submitQuery"><i></i></a>
          </button>
        </form>
      </div>
      <!-- 用户部分 -->
      <!-- <div class="user" @mouseenter="showUserInfo" @mouseleave="hidenUserInfo">
        <div class="userImage">
          <img :src="userInfo.user_pic"  alt="" v-show="userInfo.user_pic ? true :false"/>
          <img src="~assets/images/userlogo.svg" alt="" v-show="userInfo.user_pic ? false :true"/>
          <span v-show="isHasToken">{{userInfo.nickname}}</span>
          <span v-show="!isHasToken"
            ><router-link to="/login">去登录</router-link></span
          >
        </div>
        <ul class="userInfo" ref="userInfo">
          <li>
            <router-link to="/plugin">账号管理</router-link>
          </li>
          <li @click="outgin">退出登录</li>
        </ul>
      </div> -->
      <!-- 移动端搜索按钮 -->
      <span class="mobile_search_btn" @click="mobileSearchShow"
        ><i class="iconfont icon-sousuo"></i
      ></span>
      <!-- 移动端搜索栏 -->
      <div
        class="mobile_search"
        ref="mobile_search"
        @touchmove="hiddenSearch"
        @mousewheel="hiddenSearch"
      >
        <form>
          <input type="text" @focus="inputFocus" @blur="inputBlur" />
          <button @click.prevent="submitQuery">
            <div class="iconfont icon-sousuo"></div>
          </button>
        </form>
      </div>
      <!-- 移动端列表按钮 -->
      <div class="mobile_list_btn" @click="showMobileList">
        <span class="iconfont icon-liangduanduiqi" v-if="isFont"></span>
        <span class="iconfont icon-cha" v-else></span>
      </div>
      <!-- 移动端列表 -->
      <ul
        class="mobile_list"
        ref="mobileList"
        @click="goRouter"
        @touchmove.prevent
        @mousewheel.prevent
      >
        <li data-listinfo="home">首页</li>
        <li data-listinfo="news">新闻</li>
        <li data-listinfo="file">影片</li>
        <li data-listinfo="collect">收藏</li>
        <li v-show="!isHasToken" data-listinfo="login">去登录</li>
        <li v-show="isHasToken" data-listinfo="plugin">账号管理</li>
        <li v-show="isHasToken" data-listinfo="login">推出登录</li>
      </ul>
    </div>
    </div>
  </header>
</template>

<script>
import {mapState} from "vuex"
export default {
  name: "BasketHearder",
  data() {
    return {
      searchQuery: "",
      isFont: true,
      isShowSearch: true,
      isShowList: false,
      top:''
    };
  },
  methods: {
    // showUserInfo() {
    //   if (localStorage.getItem("TOKEN"))
    //     this.$refs.userInfo.style.display = "block";
    // },
    // hidenUserInfo() {
    //   if (localStorage.getItem("TOKEN"))
    //     this.$refs.userInfo.style.display = "none";
    // },
    inputFocus() {
      this.$refs.searchInput.style.width = 60 + "%";
    },
    inputBlur() {
      this.$refs.searchInput.style.width = 35 + "%";
    },
    // 提交搜索信息，发送请求
    submitQuery() {
      this.$router.push({ name: "search", query: { key: this.searchQuery } });
      // 关闭移动端搜索栏
      this.searchQuery = ''
      this.hiddenSearch();
      this.hiddenMobiList()
    },
    // 展示移动端搜索栏
    mobileSearchShow() {
      if (this.isShowSearch) {
        this.$refs.mobile_search.style.display = "block";
        this.isShowSearch = false;
      } else {
        this.$refs.mobile_search.style.display = "none";
        this.isShowSearch = true;
      }
    },
    // 展示移动端列表
    showMobileList() {
      if (!this.isShowList) {
        this.$refs.mobileList.style.display = "block";
        this.isShowList = true;
      } else {
        this.$refs.mobileList.style.display = "none";
        this.isShowList = false;
      }
    },
    // 关闭搜索栏
    hiddenSearch() {
      this.$refs.mobile_search.style.display = "none";
    },
    // 关闭导航栏
    hiddenMobiList() {
      this.$refs.mobileList.style.display = "none";
    },
    // 移动端导航栏事件委派加路由跳转
    goRouter(event) {
      // 进行路由跳转
      this.$router.push(`${event.target.dataset.listinfo}`);
      // 关闭搜索栏和导航栏
      this.hiddenSearch();
      this.hiddenMobiList();
    },
    // 退出登录
    outgin(){
      this.$refs.userInfo.style.display = "none";
      localStorage.removeItem('TOKEN')
      localStorage.removeItem('userid')
      this.$router.push('/login')
    }
  },
  computed: {
    isHasToken() {
      return localStorage.getItem('TOKEN') ? true : false;
    },
    ...mapState({
      screenWidth:state => state.common.screenWidth,
      userInfo:state => state.user.userInfo
    }),
    getHeight(){
      this.$bus.$on('getHeight',value => {
        return value;
      })
    }
  },
  watch: {
    screenWidth: {
      handler() {
        if(this.screenWidth > 997){
          // 当大于997的时候关闭移动端的搜索框和导航栏
          this.hiddenSearch()
          this.hiddenMobiList()
        }
      },
    },
    top:{
      // immediate:true,
      handler(oldValue,newValue){
        if(oldValue > newValue){
          // this.$refs.BasketHearder.style.transform = 'scale('+ 0 +')'
          // this.$refs.BasketHearder.style.opacity = 0
          this.$refs.BasketHearder.style.height = 0 +'px'
        }else{
          // this.$refs.BasketHearder.style.opacity = 1
          // this.$refs.BasketHearder.style.transform = 'scale('+ 1 +')'
          this.$refs.BasketHearder.style.height = 90 +'px'
        }
      }
    },
    getHeight:{
      handler(){

      }
    }
  },
  mounted(){
    const token = localStorage.getItem('TOKEN')
    if(token){
      this.$store.dispatch('getUserInfo')
    }
    window.addEventListener('scroll', () => {
			this.top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
		})
  }
};
</script>

<style lang="less" scoped>
header{
  width: 100%;
  display: block;
  height: 90px;
  h3{
    display: block;
    height: 100%;
    display: none;
  }
}
.BasketHearder {
  overflow: hidden;
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 10%);
  transition: height linear .3s;
  .container {
    width: 1150px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .logo {
      width: 12%;
      height: 90px;
      img {
        width: 150px;
        height: 100%;
      }
    }
    .category {
      width: 65%;
      line-height: 90px;
      font-size: 20px;
      .catrgoryList {
        display: flex;
        li {
          flex: 1;
          text-align: center;
        }
      }
    }
    .search {
      width: 18%;
      height: 90px;
      position: relative;
      input {
        border: none;
        outline: none;
        transition: all 0.2s linear;
        width: 35%;
        height: 40px;
        padding: 5px 27px 5px 15px;
        border: 1px solid #cdc7c7;
        border-radius: 25px;
        position: absolute;
        top: 22%;
        right: 10px;
      }
      button {
        border: none;
        i:before {
          content: "";
          display: block;
          width: 20px;
          height: 20px;
          position: absolute;
          right: 18px;
          top: 40%;
          background: url(../../assets/images/search.svg) no-repeat;
          background-size: 20px 20px;
        }
      }
    }
    .user {
      width: 5%;
      height: 75px;
      padding-top: 15px;
      position: relative;
      text-align: center;
      .userImage {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-bottom: 5px;
        }
        span {
          a {
            font-size: 8px;
          }
        }
      }
      .userInfo {
        display: none;
        width: 70px;
        padding: 5px 0px;
        border: 1px solid #cdc7c7;
        position: absolute;
        top: 90px;
        right: -9px;
        z-index: 99;
        background-color: #fff;
        text-decoration: none;
        li {
          height: 20px;
          line-height: 20px;
          width: 60px;
          padding: 5px;
          &:hover {
            background-color: skyblue;
          }
        }
      }
    }
    .mobile_search_btn {
      display: none;
      cursor: pointer;
    }
    .mobile_search {
      display: none;
    }
    .mobile_list_btn {
      display: none;
      cursor: pointer;
    }
    .mobile_list {
      display: none;
    }
  }
}
@media screen and(min-width: 1200px) {
  .container {
    width: 1150px;
  }
}
@media screen and(min-width: 997px) and(max-width:1200px) {
  .BasketHearder {
    .container {
      width: 970px;
    }
  }
}
@media screen and(min-width: 767px) and(max-width:997px) {
  .BasketHearder {
    .container {
      width: 720px;
      display: block;
      position: relative;
      .logo {
        position: absolute;
        left: 50%;
        margin: 0 auto;
        transform: translateX(-80%);
      }
      .category,
      .search,
      .user {
        display: none;
      }
      .mobile_search_btn {
        display: block;
        height: 90px;
        line-height: 90px;
        margin-right: 6px;
        position: absolute;
        right: 0;
        top: 0;
        text-align: center;
        .icon-sousuo {
          color: #7d7373;
          font-size: 30px;
        }
      }
      .mobile_search {
        display: none;
        position: fixed;
        width: auto;
        right: 0;
        left: 0;
        top: 90px;
        height: 42px;
        padding: 10px;
        background-color: #fff;
        transition: translateY(30px) 0.3s linear;
        z-index: 99;
        form {
          padding-left: 20px;
          width: 680px;
          margin: 0 auto;
          height: 100%;
          border: 1px solid #b1adad;
          display: flex;
          input {
            flex: 1;
            font-size: 15px;
            outline: none;
            border: none;
          }
          button {
            border: none;
            background-color: red;
            width: 58px;
            text-align: center;
            // line-height: 42px;
            i {
              display: block;
              margin-left: 19px;
              width: 20px;
              height: 15px;
              font-size: 7px;
              color: red;
              background-color: pink;
            }
            .icon-sousuo {
              color: #fff;
              font-size: 20px;
            }
          }
        }
      }
      .mobile_list_btn {
        display: block;
        width: 50px;
        height: 50px;
        line-height: 50px;
        position: absolute;
        text-align: center;
        left: 0;
        top: 20px;
        .icon-liangduanduiqi {
          font-size: 30px;
        }
        .icon-cha {
          font-size: 30px;
        }
      }
      .mobile_list {
        display: none;
        position: fixed;
        width: auto;
        top: 90px;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 9;
        border-top: 1px solid #c6c1c1;
        background-color: #fff;
        padding: 50px 40px;
        li {
          width: 720px;
          height: 70px;
          line-height: 70px;
          font-size: 15px;
          font-weight: 87px;
          border-bottom: 1px solid #c6c1c1;
          margin: 0 auto;
        }
      }
    }
  }
}
@media screen and(max-width: 767px) {
  .BasketHearder {
    position: fixed;
    top: 0;
    z-index: 99;
    .container {
      width: 94%;
      display: block;
      position: relative;
      // background-color: pink;
      .logo {
        margin: 0 auto;
        transform: translateX(-125%);
      }
      .category,
      .search,
      .user {
        display: none;
      }
      .mobile_search_btn {
        display: block;
        height: 90px;
        line-height: 90px;
        // width: 80px;
        margin-right: 3px;
        position: absolute;
        right: 0;
        top: 0;
        text-align: center;
        .icon-sousuo {
          color: #7d7373;
          font-size: 30px;
        }
      }
      .mobile_search {
        display: none;
        position: fixed;
        width: auto;
        right: 0;
        left: 0;
        top: 90px;
        height: 42px;
        padding: 10px;
        background-color: #fff;
        z-index: 99;
        form {
          padding-left: 20px;
          width: 92%;
          margin: 0 auto;
          height: 42px;
          border: 1px solid #b1adad;
          display: flex;
          input {
            flex: 1;
            font-size: 15px;
            outline: none;
            border: none;
          }
          button {
            border: none;
            background-color: red;
            width: 58px;
            text-align: center;
            line-height: 42px;
            i {
              display: block;
              margin-left: 19px;
              width: 20px;
              height: 15px;
              color: #fff;
            }
            .icon-sousuo {
              color: #fff;
              font-size: 20px;
            }
          }
        }
      }
      .mobile_list_btn {
        display: block;
        width: 50px;
        height: 50px;
        line-height: 50px;
        position: absolute;
        left: 0;
        top: 20px;
        .icon-liangduanduiqi {
          font-size: 30px;
        }
        .icon-cha {
          font-size: 30px;
        }
      }
      .mobile_list {
        display: none;
        position: fixed;
        width: auto;
        top: 90px;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 9;
        border-top: 1px solid #c6c1c1;
        background-color: #fff;
        padding: 50px 40px;
        li {
          width: 92%;
          height: 70px;
          line-height: 70px;
          font-size: 15px;
          font-weight: 87px;
          border-bottom: 1px solid #c6c1c1;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>