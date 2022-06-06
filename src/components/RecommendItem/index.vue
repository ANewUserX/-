<template>
  <div class="RecommendItem">
    <div
      v-for="item in itemList"
      :key="item.article_id"
      class="container"
      ref="container"
      :style="{ backgroundImage: 'url(' + item.cover_img + ')' }"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave"
    >
      <a href=""></a>
      <div class="recommendItem" v-show="isShow">
        <div class="postInfo">
          <span v-if="showNum"
            ><i class="iconfont icon-yanjing"></i>{{ item.read_count }}</span
          >
          <span v-if="showTime"
            ><i class="iconfont icon-shizhong"></i>{{ getPubTime(item.pub_date) }}</span
          >
        </div>
        <div class="recommendInfo">{{ item.title }}</div>
      </div>
      <transition>
        <div class="coverContainer" v-show="!isShow" @click="goDetail(item.article_id)">
          <span class="iconfont icon-tiaozhuan" :style="turnStyle"></span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendItem",
  data() {
    return {
      isShow: true,
    };
  },
  props: {
    showNum: {
      type: Boolean,
      default: true,
    },
    showTime: {
      type: Boolean,
      default: true,
    },
    itemList:{
      type:Array || Object,
      default:[] || {}
    }
  },
  methods: {
    mouseEnter() {
      this.isShow = false;
    },
    mouseLeave() {
      this.isShow = true;
    },
    goDetail(txtID) {
      this.$router.push({ name: "detail", query: { id: txtID } });
    },
  },
  computed: {
    turnStyle() {
      return this.isShow
        ? {}
        : { top: 40 + "%", left: 43 + "%", "font-size": 35 + "px" };
    },
  },
};
</script>
<style lang="less" scoped>
.RecommendItem {
  width: 100%;
  .container {
    margin-bottom: 15px;
    width: 100%;
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    a {
      display: block;
      width: 100%;
      height: 200px;
    }
    .recommendItem {
      position: absolute;
      width: auto;
      bottom: 0;
      right: 0;
      left: 0;
      padding: 5px 10px;
      background-color: rgb(23, 22, 22);
      opacity: 0.8;
      .postInfo {
        width: 100%;
        span {
          margin-right: 7px;
          font-size: 10px;
          color: #fff;
          i {
            font-size: 10px;
            color: #fff;
            margin-right: 3px;
          }
        }
      }
      .recommendInfo {
        font-size: 12px;
        margin: 15px 0;
        line-height: 20px;
        color: #fff;
      }
    }
    .coverContainer {
      background-color: rgb(23, 22, 22);
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      cursor: pointer;
      span {
        position: absolute;
        left: 0;
        bottom: 0;
        transition: all 0.3s linear;
        // top: 40%;
        // left: 43%;
        color: #fff;
        font-size: 15px;
        opacity: 1;
      }
    }
  }
}
</style>