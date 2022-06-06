<template>
  <div class="RecomMediaItem">
    <div class="container">
      <RecommendItem
        v-if="firstItem"
        :showNum="false"
        :itemList="firstItem"
      />
      <ul class="mediaList" v-if="nextItem">
        <li v-for="item in nextItem" :key="item.article_id">
          <div class="mediaListItem">
            <img :src="item.cover_img" alt="" @click="goDetail(item.article_id)"/>
            <div class="mediaContent">
              <h4 @click="goDetail(item.article_id)">
                {{item.title}}
              </h4>
              <span><i class="iconfont icon-shizhong"></i>{{getPubTime(item.pub_date)}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import RecommendItem from "components/RecommendItem";
import {mapState,mapGetters} from "vuex"
export default {
  name: "RecomMediaItem",
  components: { RecommendItem },
  data(){
    return {
      hasData:false,
      recommendMediaList:[]
    }
  },
  computed:{
    ...mapState({
      recommendList:state => state.common.recommendList
    }),
    ...mapGetters(['firstItem','nextItem']),
  },
  mounted(){
    this.recommendMediaList = this.recommendList.recommendMediaList
  },
  // watch:{
  //   recommendList:{
  //     immediate:true,
  //     handler(){
  //       this.$nextTick(()=>{
  //         this.recommendMediaList = this.recommendList.recommendMediaList
  //         this.hasData = true
  //         console.log('b');
  //       })
  //     }
  //   }
  // },
  methods:{
    goDetail(textId){
      this.$router.push({name:'detail',query:{id:textId}})
    }
  }
};
</script>

<style lang="less" scoped>
.RecomMediaItem {
  width: 100%;
  .container {
    display: flex;
    flex-direction: column;
    .mediaList {
      li{
        margin-top: 20px;
        .mediaListItem{
          width: 100%;
          display: flex;
          img{
            width: 30%;
            height: 70%;
            cursor: pointer;
          }
          .mediaContent{
            padding-left: 10px;
            h4{
              font-size: 13px;
              line-height: 18px;
              margin-bottom: 10px;
              cursor: pointer;
            }
            span{
              i{
                padding-right: 4px;
              }
            }
          }
        }
      }
    }
  }
}
</style>