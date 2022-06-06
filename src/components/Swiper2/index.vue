<template>
  <div class="container">
    <div
      class="carousel_container"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <ul class="carousel_body" ref="carousel_body">
        <li
          class="carousel_item"
          ref="carousel_item"
          v-for="carousel in bannerList"
          :key="carousel.id"
        >
          <img
            src="http://127.0.0.1:2022/uploads/cover_img-1653831374260.jpg"
            alt=""
          />
          <div class="slider_content">
            <div class="post_info">{{ carousel.category }}</div>
            <div class="slider_title">
              <h2>
                {{ carousel.title }}
              </h2>
            </div>
            <div class="post_authorInfo">
              <span
                ><i class="iconfont icon-hezuozuozhe"></i
                >{{ carousel.author }}</span
              >
              <span
                ><i class="iconfont icon-shizhong"></i
                >{{ carousel.postTime }}</span
              >
              <span
                ><i class="iconfont icon-yanjing"></i
                >{{ carousel.viewNum }}</span
              >
              <i class="redline"></i>
              <i class="fline"></i>
            </div>
            <div class="post_text">
              {{ carousel.content }}
            </div>
            <div class="read_more" @click="goDetail(carousel.id)">阅读原文</div>
          </div>
        </li>
      </ul>
      <a class="carousel_prev" @click="btnFun('prev')"
        ><i class="iconfont icon-prev"></i
      ></a>
      <a class="carousel_next" @click="btnFun('next')"
        ><i class="iconfont icon-next"></i
      ></a>
      <div class="carousel_indicator" ref="carousel_indicator">
        <a href="" class="current" @click.prevent="changeIndex(0)"></a>
        <a href="" @click.prevent="changeIndex(1)"></a>
        <a href="" @click.prevent="changeIndex(2)"></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: ["bannerList"],
  data() {
    return {
      // 当前的个数
      index: 0,
      // 定时器
      timer: {},
      // 获得手指点击的位置
      startx: 0,
      // 获得手指移动的距离
      movex: 0,
      // 一定的单位数据
      moveWidth: 0,
      // 窗口大小
    };
  },
  methods: {
    // 移动导航小圆点
    removeCurrent() {
      // 对下面的小圆点进行操作
      this.$refs.carousel_indicator
        .querySelector(".current")
        .classList.remove("current");
      this.$refs.carousel_indicator.children[this.index].classList.add(
        "current"
      );
    },
    // 添加滑动距离方法
    translateFun(transition = "all 0.3s", movex = 0) {
      this.moveWidth = this.$refs.carousel_item[0].offsetWidth;
      let translatex = -this.index * this.moveWidth + movex;
      this.$refs.carousel_body.style.transition = transition;
      this.$refs.carousel_body.style.transform =
        "translateX(" + translatex + "px)";
    },
    // 点击移动轮播图
    btnFun(type) {
      clearInterval(this.timer);
      if (type == "prev") {
        this.index--;
        this.translateFun();
      } else {
        this.index++;
        this.translateFun();
      }
      this.timer = setInterval(() => {
        // 定义滑动变量
        this.index++;
        this.translateFun();
      }, 3000);
    },
    // 点击小图标移动轮播图
    changeIndex(index) {
      clearInterval(this.timer);
      this.index = index;
      this.removeCurrent();
      this.translateFun();
      this.timer = setInterval(() => {
        // 定义滑动变量
        this.index++;
        this.translateFun();
      }, 3000);
    },
    mouseEnter() {
      clearInterval(this.timer);
    },
    mouseLeave() {
      this.timer = setInterval(() => {
        // 定义滑动变量
        this.index++;
        this.translateFun();
      }, 3000);
    },
    // 移动端变化
    touchStart(event) {
      this.startx = event.targetTouches[0].pageX;
      clearInterval(this.timer);
    },
    touchMove(event) {
      // 定义手指滑动距离
      this.movex = event.targetTouches[0].pageX - this.startx;
      this.translateFun("none", this.movex);
    },
    touchEnd() {
      if (Math.abs(this.movex) > 50) {
        if (this.movex > 0) {
          this.index--;
        } else {
          this.index++;
        }
        this.translateFun();
      } else {
        this.translateFun();
      }
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        // 定义滑动变量
        this.index++;
        this.translateFun();
      }, 3000);
    },
    goDetail(atticleid) {
      this.$router.push({ name: "detail", query: { id: atticleid } });
    },
  },
  mounted() {},
  watch: {
    bannerList: {
      handler() {
        // 开启动画定时器
        this.timer = setInterval(() => {
          // 定义滑动变量
          this.index++;
          this.translateFun();
        }, 3000);
        // 对动画进行判断
        this.$refs.carousel_body.addEventListener("transitionend", () => {
          // 当动画完成执行 当等于三时 去掉过渡效果 让Index等于0
          if (this.index >= 3) {
            this.index = 0;
            this.translateFun("none");
          } else if (this.index < 0) {
            this.index = 2;
            this.translateFun("none");
          }
          this.removeCurrent();
        });
        // this.$nextTick(() => {
        //   let firstChild = this.$refs.carousel_item.children[this.index];
        //   console.log(firstChild);
        // });
      },
    },
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="less" scoped>
.carousel_container {
  width: 1150px;
  margin: 7px auto;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  .carousel_body {
    width: 300%;
    display: flex;
    .carousel_item {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: row;
      cursor: pointer;
      img {
        flex: 6;
        height: 100%;
      }
      .slider_content {
        flex: 3;
        padding: 50px 30px;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        position: relative;
        .post_info {
          width: 70px;
          padding: 5px 15px;
          height: 30px;
          line-height: 30px;
          background-color: red;
          text-align: center;
          font-size: 16px;
          color: #fff;
        }
        .slider_title {
          width: 90%;
          // background-color: yellow;
          margin-bottom: 10px;
          // flex: 1;
          h2 {
            margin: 15px 0px;
            font-size: 30px;
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          }
        }
        .post_authorInfo {
          margin: 20px 0px;
          display: flex;
          font-size: 14px;
          position: relative;
          span {
            padding-right: 10px;
            font-size: 14px;
            i {
              margin-right: 5px;
            }
          }
          .redline {
            display: block;
            width: 60px;
            height: 4px;
            margin-top: 7px;
            background-color: red;
            position: absolute;
            left: 0;
            top: -25px;
            z-index: 5;
          }
          .fline {
            display: block;
            width: 100%;
            height: 1px;
            margin-top: 7px;
            border-radius: 2px;
            background-color: #918b8b;
            position: absolute;
            left: 0;
            top: -23px;
          }
        }
        .post_text {
          font-size: 16px;
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          // text-overflow: ellipsis;
          -webkit-line-clamp: 4;
        }
        .read_more {
          width: 100px;
          height: 50px;
          color: #fff;
          line-height: 50px;
          font-size: 15px;
          text-align: center;
          background-color: black;
          position: absolute;
          bottom: 0;
          right: 30px;
        }
      }
    }
  }
  .carousel_prev,
  .carousel_next {
    position: absolute;
    display: block;
    width: 40px;
    height: 50px;
    font-size: 30px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    // background-color: blue;
  }
  .carousel_prev {
    left: 0;
    top: 40%;
  }
  .carousel_next {
    right: 0;
    top: 40%;
  }
  .carousel_indicator {
    position: absolute;
    display: flex;
    bottom: 10px;
    left: 48%;
    a {
      display: block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-left: 5px;
      border: 2px solid #fff;
    }
    .current {
      background-color: #fff;
    }
  }
}
@media screen and(min-width: 1200px) {
  .carousel_container {
    width: 1150px;
  }
}
@media screen and(min-width: 997px) and(max-width:1200px) {
  .carousel_container {
    width: 970px;
    height: 450px;
    overflow: hidden;
    .carousel_body {
      width: 300%;
      .carousel_item {
        width: 100%;
        height: 450px;
        img {
          width: 68%;
          height: 100%;
        }
        .slider_content {
          width: 32%;
          // height: 300px;
          padding: 25px 20px;
          .post_info {
            width: 50px;
            height: 20px;
            font-size: 14px;
            line-height: 20px;
          }
          .slider_title {
            margin-bottom: 10px;
            // flex: 1;
            h2 {
              margin: 15px 0px;
              font-size: 25px;
            }
          }
        }
      }
    }
  }
}
@media screen and(min-width: 767px) and(max-width:997px) {
  .carousel_container {
    width: 720px;
    height: 620px;
    overflow: hidden;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    padding-bottom: 20px;
    .carousel_body {
      width: 300%;
      .carousel_item {
        width: 100%;
        flex-direction: column;
        img {
          width: 100%;
          height: 98%;
        }
        .slider_content {
          display: block;
          box-sizing: border-box;
          padding: 20px 10px;
          width: 100%;
          // height: 100px;
          .post_info {
            position: absolute;
            left: 10px;
            top: -18px;
            height: 30px;
            font-size: 14px;
            line-height: 30px;
          }
          .slider_title {
            width: 100%;
            h2 {
              font-size: 25px;
              display: -webkit-box;
              overflow: hidden;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
          }
          .post_authorInfo {
            display: block;
            font-size: 14px;
            margin: 30px 0;
          }
          .post_text {
            display: none;
          }
          .read_more {
            display: none;
          }
        }
      }
    }
    .carousel_prev,
    .carousel_next {
      display: none;
    }
    .carousel_indicator {
      bottom: 8px;
      left: 48%;
      a {
        border: 2px solid #746f6f;
      }
      .current {
        background-color: rgb(113, 110, 110);
      }
    }
  }
}
@media screen and(max-width: 767px) {
  .carousel_container {
    width: 95%;
    height: 60%;
    overflow: hidden;
    box-shadow: 0 2px 2px rgba(192, 177, 177, 0.5);
    .carousel_body {
      height: 100%;
      width: 300%;
      .carousel_item {
        width: 100%;
        flex-direction: column;
        img {
          width: 100%;
          height: 90%;
        }
        .slider_content {
          display: block;
          box-sizing: border-box;
          padding: 10px;
          width: 100%;
          .post_info {
            position: absolute;
            left: 10px;
            top: -18px;
            padding: 5px;
            height: 20px;
            font-size: 14px;
            line-height: 20px;
          }
          .slider_title {
            width: 100%;
            h2 {
              font-size: 20px;
              display: -webkit-box;
              overflow: hidden;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
          }
          .post_authorInfo {
            display: block;
            font-size: 14px;
            margin: 30px 0;
          }
          .post_text {
            display: none;
          }
          .read_more {
            display: none;
          }
        }
      }
    }
    .carousel_prev,
    .carousel_next {
      display: none;
    }
    .carousel_indicator {
      position: absolute;
      left: 43%;
      bottom: 8px;
      a {
        border: 2px solid #746f6f;
      }
      .current {
        background-color: rgb(113, 110, 110);
      }
    }
  }
}
</style>