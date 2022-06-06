<template>
  <div class="Detail">
    <RouteContainer>
      <template slot="left">
        <DetailMain/>
        <ContentBox contentTitle="猜你喜欢" :showI="false" :showReadmore="false" :contentList="hotList"/>
        <ContentBox contentTitle="最新热帖" :showI="false" :showReadmore="false" :contentList="likeList"/>
      </template>
      <template slot="right">
        <HotRecommend />
        <RecommendMedia />
        <RecommendTab />
      </template>
    </RouteContainer>
  </div>
</template>

<script>
import RouteContainer from "components/RouteContainer";
import RecommendMedia from "components/RecommendMedia";
import HotRecommend from "components/HotRecommend";
import RecommendTab from "components/RecommendTab";
import DetailMain from "./DetailMain"
import ContentBox from "components/ContentBox"
import { mapGetters } from "vuex";
export default {
  name: "Detail",
  components:{
    RouteContainer,
    RecommendMedia,
    HotRecommend,
    RecommendTab,
    DetailMain,
    ContentBox
  },
  computed:{
    ...mapGetters(['hotList','likeList',])
  }
};
</script>

<style lang="less" scoped>
</style>