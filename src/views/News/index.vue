<template>
  <div class="News" ref="news">
    <RouteContainer>
      <template slot="left">
        <RecomNewsNav v-if="newsList" :list="newsList" />
        <Pagination v-show="total <= pageSize ? false : true" @getPageNo="getPageNo" :pageNo="pageNo" :pageSize="pageSize" :total="total" :continue="contin"/>
      </template>
      <template slot="right">
        <HotRecommend />
        <RecommendMedia />
        <RecommendTab />
      </template>
    </RouteContainer>
    <GoTop />
  </div>
</template>

<script>
import RouteContainer from "components/RouteContainer";
import RecomNewsNav from "components/RecomNewsNav";
import RecommendMedia from "components/RecommendMedia";
import HotRecommend from "components/HotRecommend";
import RecommendTab from "components/RecommendTab";
import Pagination from "components/Pagination";
import ReadMoreNav from "components/ReadMoreNav";
import GoTop from "components/GoTop";
export default {
  name: "News",
  data() {
    return {
      total: 0,
      pageNo: 1,
      pageSize: 10,
      contin: 5,
      newsList:''
    };
  },
  components: {
    RouteContainer,
    RecomNewsNav,
    RecommendMedia,
    HotRecommend,
    RecommendTab,
    ReadMoreNav,
    GoTop,
    Pagination,
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      let data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      };
      try {
        let result = await this.$API.reqNewsList(data);
        if (result.code == 200) {
          this.newsList = result.data;
          this.total = result.total
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
    },
    getPageNo(num){
      this.pageNo = num
      this.getData()
      this.$refs.news.scrollIntoView();
    }
  },
};
</script>

<style lang="scss" scoped>
</style>