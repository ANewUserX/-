<template>
  <div class="NewNewsNav">
    <RouteContainer>
      <template slot="left">
        <RecomNewsNav
        v-if="newsRecommendList"
          :isShowTitle="true"
          titleContent="最新新闻"
          :list="newsRecommendList"
        />
        <ReadMoreNav />
        <ContentBox contentTitle="生活资讯" :showI="true" v-if="lifeRecommendList" :contentList="lifeRecommendList"/>
        <ContentBox contentTitle="球星资讯" :showI="true" v-if="starRecommendList" :contentList="starRecommendList"/>
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
import RecomNewsNav from "components/RecomNewsNav";
import HotRecommend from "components/HotRecommend";
import RecommendMedia from "components/RecommendMedia";
import RecommendTab from "components/RecommendTab";
import ReadMoreNav from "components/ReadMoreNav";
import ContentBox from "components/ContentBox";

import { mapState ,mapGetters} from "vuex";
export default {
  name: "NewNewsNav",
  components: {
    RecomNewsNav,
    HotRecommend,
    RecommendMedia,
    RecommendTab,
    ReadMoreNav,
    ContentBox,
    RouteContainer,
  },
  data() {
    return {
      isshow: true,
    };
  },
  mounted() {
    this.$store.dispatch("getNewNewsList");
  },
  computed: {
    ...mapState({
      newNewsList: state => state.home.newNewsList,
    }),
    ...mapGetters(['lifeRecommendList','newsRecommendList','starRecommendList'])
  },
  methods: {},
};
</script>

<style lang="less" scoped>
</style>