<template>
  <div class="RecomNewsNav">
    <TitleNav v-if="isShowTitle" :title="titleContent" />
    <ul class="container">
      <li v-for="newNews in list" :key="newNews.id">
        <div class="newsItem">
          <img :src="newNews.cover_img" alt="" @click="goDetail(newNews.id)"/>
          <div class="newsInfo">
            <h2 @click="goDetail(newNews.article_id)">
              <span>最新</span>
              {{ newNews.title }}
            </h2>
            <div class="postNewsContent">
              {{ htmlToText(newNews.content) }}
            </div>
            <div class="postNewsAuthor">
              <span
                ><i class="iconfont icon-hezuozuozhe"></i
                ><a href="">{{ newNews.author_name }}</a></span
              >
              <span
                ><i class="iconfont icon-fenlei"></i
                >{{ newNews.cate_name }}</span
              >
              <span
                ><i class="iconfont icon-shizhong"></i
                >{{ getPubTime(newNews.pub_date) }}</span
              >
              <span
                ><i class="iconfont icon-yanjing"></i
                >{{ newNews.read_count }}</span
              >
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import TitleNav from "../TitleNav";
export default {
  name: "RecomNewsNav",
  props: {
    isShowTitle: {
      type: Boolean,
      default: false,
    },
    titleContent: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: [],
    },
  },
  components: {
    TitleNav,
  },
  methods:{
    goDetail(articleId){
      this.$router.push({name:'detail',query:{id:articleId}})
    },
  }
};
</script>

<style lang="less" scoped>
.RecomNewsNav {
  width: 100%;
  .container {
    width: 100%;
    li {
      margin: 30px 0;
      .newsItem {
        background-color: #fff;
        border: 2px solid #f3f3f3;
        border-radius: 5px;
        box-shadow: 0 0 1px rgba(67, 66, 66, 0.5);
        padding: 25px 20px;
        display: flex;
        img {
          width: 30%;
          height: 70%;
          cursor: pointer;
        }
        .newsInfo {
          width: 70%;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          h2 {
            font-size: 25px;
            cursor: pointer;
            span {
              margin-right: 5px;
              background-color: red;
              padding: 3px 7px;
              font-size: 15px;
              color: #fff;
              vertical-align: middle;
              font-weight: normal;
              position: relative;
              top: -1px;
            }
          }
          .postNewsContent {
            font-size: 17px;
            margin: 20px 0;
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          }
          .postNewsAuthor {
            font-size: 14px;
            display: flex;
            span {
              margin-right: 15px;
              i {
                margin-right: 5px;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
}
@media screen and(min-width: 767px) and(max-width:997px) {
  .RecomNewsNav {
    width: 100%;
    .container {
      width: 100%;
      border-radius: 5px;
      li {
        margin: 0;
        .newsItem {
          box-shadow: none;
          border: none;
          border-bottom: 1px solid #f3f3f3;
          border-radius: 0;
          img {
            width: 15%;
          }
          .newsInfo {
            width: 80%;
            padding-left: 15px;
            h2 {
              font-size: 20px;
              span {
                font-size: 12px;
                top: 0px;
              }
            }
            .postNewsContent {
              display: none;
            }
          }
        }
        &:first-child {
          margin-top: 25px;
        }
      }
    }
  }
}
@media screen and(max-width: 767px) {
  .RecomNewsNav {
    width: 100%;
    .container {
      width: 100%;
      border-radius: 5px;
      li {
        margin: 0;
        .newsItem {
          box-shadow: none;
          border: none;
          border-bottom: 1px solid #a4a2a2;
          border-radius: 0;
          img {
            width: 15%;
          }
          .newsInfo {
            width: 80%;
            padding-left: 15px;
            h2 {
              font-size: 16px;
              span {
                font-size: 12px;
                top: 0px;
              }
            }
            .postNewsContent {
              display: none;
            }
            .postNewsAuthor {
              span {
                &:last-child {
                  display: none;
                }
              }
            }
          }
        }
        &:first-child {
          margin-top: 25px;
        }
      }
    }
  }
}
</style>