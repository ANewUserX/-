<template>
  <div class="File" ref="file">
    <ChangeTab @activeName="activeName" />
    <RouteContainer>
      <template slot="left">
        <div class="life" v-show="lifeActive">
          <RecomNewsNav v-if="lifeList" :list="lifeList" />
          <Pagination v-show="totalLife <= pageSizeLife ? false : true" @getPageNo="getPageNoLife" :total="totalLife" :pageSize="pageSizeLife" :pageNo="pageNoLife" :continue="contin"/>
        </div>
        <div class="star" v-show="!lifeActive">
          <RecomNewsNav v-if="starList" :list="starList" />
          <Pagination v-show="totalStar <= pageSizeStar ? false : true" @getPageNo="getPageNoStar" :total="totalStar" :pageSize="pageSizeStar" :pageNo="pageNoStar" :continue="contin"/>
        </div>
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
import RecommendMedia from "components/RecommendMedia";
import HotRecommend from "components/HotRecommend";
import RecommendTab from "components/RecommendTab";
import ReadMoreNav from "components/ReadMoreNav";
import Pagination from "components/Pagination"
import ChangeTab from "./ChangeTab";
export default {
  name: "File",
  data() {
    return {
      lifeActive: true,
      totalLife: 0,
      pageNoLife: 1,
      pageSizeLife: 10,
      contin: 5,
      lifeList: "",
      totalStar: 0,
      pageNoStar: 1,
      pageSizeStar: 10,
      starList:""
    };
  },
  components: {
    ChangeTab,
    RouteContainer,
    RecomNewsNav,
    RecommendMedia,
    HotRecommend,
    RecommendTab,
    ReadMoreNav,
    Pagination
  },
  mounted() {
    this.getLikeList()
    this.getStarList()
  },
  methods: {
    activeName(num) {
      if (num == 1) {
        this.lifeActive = true;
      } else {
        this.lifeActive = false;
      }
    },
    async getLikeList() {
      let data = {
        pageNo: this.pageNoLife,
        pageSize: this.pageSizeLife,
      };
      try {
        let result = await this.$API.reqLifeList(data);
        if (result.code == 200) {
          this.lifeList = result.data.liftInfoList;
          this.totalLife = result.data.liftCount;
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
    async getStarList() {
      let data = {
        pageNo: this.pageNoStar,
        pageSize: this.pageSizeStar,
      };
      try {
        let result = await this.$API.reqStarList(data);
        if (result.code == 200) {
          this.starList = result.data.starInfoList;
          this.totalStar = result.data.starCount;
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
    getPageNoLife(num){
      this.pageNoLife = num
      this.getLikeList()
      this.$refs.file.scrollIntoView();
    },
    getPageNoStar(num){
      this.pageNoStar = num
      this.getStarList()
      this.$refs.file.scrollIntoView();
    }
  },
  computed: {},
};
</script>

<style lang="less" scoped>
</style>