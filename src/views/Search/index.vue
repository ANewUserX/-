<template>
  <div class="Search" ref="Search">
    <RouteContainer>
      <template slot="left">
        <SearchResult :total="total" />
        <RecomNewsNav v-if="serachList" :list="serachList" />
        <Pagination
          v-show="total <= pageSize ? false : true"
          :pageNo="pageNo"
          :pageSize="pageSize"
          :total="total"
          :continue="contin"
          @getPageNo="changeNo"
        />
      </template>
      <template slot="right">
        <RecommendTab />
      </template>
    </RouteContainer>
  </div>
</template>

<script>
import RouteContainer from "components/RouteContainer";
import RecomNewsNav from "components/RecomNewsNav";
import RecommendTab from "components/RecommendTab";
import SearchResult from "./SearchResult";
import Pagination from "components/Pagination";
export default {
  name: "Search",
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 0,
      contin: 3,
      serachList: "",
    };
  },
  components: {
    SearchResult,
    RouteContainer,
    RecomNewsNav,
    RecommendTab,
    Pagination,
  },
  methods: {
    async getData() {
      let data = {
        keyword: this.$route.query.key,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      };
      try {
        let result = await this.$API.reqSearchList(data);
        if (result.code == 200) {
          this.serachList = result.data;
          this.total = result.total;
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
    changeNo(num) {
      this.pageNo = num;
      this.getData();
      this.$refs.Search.scrollIntoView();
    },
  },
  mounted() {
    this.getData();
  },
  computed: {},
};
</script>

<style lang="less" scoped>
</style>