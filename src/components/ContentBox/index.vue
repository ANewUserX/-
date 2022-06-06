<template>
  <div class="ContentBox">
    <BoxContainer>
      <TitleNav
        :title="contentTitle"
        :showI="showI"
        :color="contentTitleColor"
        :borderColor="contentTitleBorderColor"
        :pushRoute="pushRoute"
      />
      <ul class="contentList">
        <li v-for="content in contentList" :key="content.article_id" @click="goDetail(content.article_id)">
          <div class="contentItem">
            <div
              class="imgContainer"
              :style="{'background-image':'url(' + content.cover_img + ')'}"
            ></div>
            <div class="itemInfo">
              <div class="postTitle">
                {{ content.title }}
              </div>
              <div class="postInfo">
                <span
                  ><i class="iconfont icon-shizhong"></i
                  >{{ counttime(content.pub_date) +'前'}}</span
                >
                <span
                  ><i class="iconfont icon-yanjing"></i
                  >{{ content.read_count }}</span
                >
              </div>
            </div>
          </div>
        </li>
      </ul>
    </BoxContainer>
    <ReadMoreNav v-if="showReadmore" :pushRoute="pushRoute"/>
  </div>
</template>

<script>
import BoxContainer from "../BoxContainer";
import TitleNav from "../TitleNav";
import ReadMoreNav from "../ReadMoreNav";
export default {
  name: "ContentBox",
  components: {
    TitleNav,
    BoxContainer,
    ReadMoreNav,
  },
  props: {
    contentList: {
      type: Array,
      default: [],
    },
    contentTitle: {
      type: String,
      default: "",
    },
    contentTitleColor: {
      type: String,
      default: "black",
    },
    contentTitleBorderColor: {
      type: String,
      default: "black",
    },
    showI: {
      type: Boolean,
      default: false,
    },
    showReadmore: {
      type: Boolean,
      default: true,
    },
    pushRoute:{
      type:String,
      default:'file'
    }
  },
  methods:{
    counttime(time) {
      let nowTime = +new Date();
      let InputTime = +new Date(time);
      let Sumtime = (nowTime - InputTime) / 1000;
      let d = parseInt(Sumtime / 60 / 60 / 24);
      let h = parseInt((Sumtime / 60 / 60) % 24);
      let m = parseInt((Sumtime / 60) % 60);
      if(d > 0){
        // d = d < 10 ? "0" + d : d;
        return d + "天"
      }else if(d == 0 && h > 0){
        // d = d < 10 ? "0" + d : d;
        return h + "小时"
      }else if(d == 0 && h == 0 && m >0){
        // m = m < 10 ? "0" + m : m;
        return m + "分钟"
      }else{
        return "1分钟"
      }
    },
    goDetail(newsid){
      this.$router.push({name:'detail',query:{id:newsid}})
    }
  }
};
</script>

<style lang="less" scoped>
.contentList {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px 0;
  li {
    width: 32%;
    margin-top: 10px;
    position: relative;
    margin-bottom: 20px;
    .contentItem {
      display: block;
      padding: 3px;
      border: 1px solid #6f6d6d;
      .imgContainer {
        width: 100%;
        height: 160px;
        // background-image: url(http://127.0.0.1:2022/uploads/cover_img-1654015104589.jpg);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        cursor: pointer;
      }
      .itemInfo {
        .postTitle {
          font-size: 17px;
          line-height: 28px;
          margin-bottom: 5px;
          padding: 5px 0;
          color: black;
          cursor: pointer;
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
      .postInfo {
        border-top: 1px solid #e3e0e0;
        font-size: 13px;
        padding: 5px 0;
        span {
          color: black;
          i {
            padding: 0px 6px;
            font-size: 3px;
          }
        }
      }
    }
  }
}
@media screen and(min-width: 767px) and(max-width:997px) {
  .contentList {
    width: 100%;
    li {
      width: 100%;
    }
  }
}
@media screen and(max-width: 767px) {
  .contentList {
    width: 100%;
    li {
      width: 100%;
    }
  }
}
</style>