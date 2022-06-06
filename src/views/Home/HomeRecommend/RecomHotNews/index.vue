<template>
  <div class="RecomHotNews">
    <TitleNav title="热门新闻" />
    <ul class="container">
      <li v-for="hotNews in recommendList" :key="hotNews.article_id">
        <div
          class="infoContainer"
          :style="{ backgroundImage: 'url(' + hotNews.cover_img + ')' }"
          @click.prevent="goDetail(hotNews.article_id)"
        >
          <a href=""></a>
          <div class="newInfo">
            <div class="postInfo">
              <i class="iconfont icon-shizhong"></i><i>{{ getPubTime(hotNews.pub_date) }}</i
              ><i class="iconfont icon-yanjing"></i><i>{{ hotNews.read_count }}</i>
            </div>
            <div class="postTitle">
              {{ hotNews.title }}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import TitleNav from "components/TitleNav";
export default {
  name: "RecomHotNews",
  props: {
    recommendList: {
      type: Array,
      default: [],
    },
  },
  components: { TitleNav },
  methods:{
    goDetail(newsId){
      this.$router.push({name:'detail',query:{id:newsId}})
    }
  }
};
</script>

<style lang="less" scoped>
.RecomHotNews {
  width: 100%;
  .container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 0 20px 0;
    li {
      width: 33%;
      margin-top: 10px;
      position: relative;
      .infoContainer {
        display: block;
        // background-image: url(~assets/images/test.jpg);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        width: 100%;
        height: 250px;
        a {
          display: block;
          width: 100%;
          height: 100%;
        }
        .newInfo {
          width: auto;
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          padding: 5px 10px;
          background-color: rgba(13, 13, 13, 0.611);
          opacity: 0.9;
          .postInfo {
            font-size: 15px;
            margin-top: 5px;
            color: #fff;
            i {
              padding-left: 4px;
            }
          }
          .postTitle {
            font-size: 17px;
            margin: 5px;
            color: #fff;
          }
        }
      }
    }
  }
}

@media screen and(min-width: 997px) and(max-width:1200px) {
  .RecomHotNews {
    width: 100%;
    .container {
      li {
        .infoContainer {
          height: 225px;
        }
      }
    }
  }
}
@media screen and(min-width: 767px) and(max-width:997px) {
  .RecomHotNews {
    width: 100%;
    .container {
      width: 720px;
      li {
        width: 100%;
      }
    }
  }
}
@media screen and(max-width: 767px) {
  .RecomHotNews {
    width: 100%;
    .container {
      width: 100%;
      li {
        width: 100%;
      }
    }
  }
}
</style>