<template>
  <div class="SearchResult">
    <div class="container">搜索到<span style="color:red;padding: 0 5px;">{{total}}</span>篇与"<span style="color:red;padding: 0 5px;">{{keyword}}</span>"相关的文章</div>
  </div>
</template>

<script>
export default {
  name: "SearchResult",
  props:['total'],
  computed:{
    keyword(){
      return this.$route.query.key
    }
  }
};
</script>

<style lang="less" scoped>
.SearchResult {
  width: 100%;
  margin: 30px 0;
  .container {
    background-color: #fff;
    padding: 30px;
    font-size: 16px;
    border: 2px solid #f3f3f3;
    border-radius: 5px;
    box-shadow: 0 0 1px rgba(67, 66, 66, 0.5);
  }
}
@media screen and(min-width: 767px) and(max-width:997px) {
  .SearchResult {
    width: 100%;
  }
}
@media screen and(max-width: 767px) {
  .SearchResult {
    width: 100%;
  }
}
</style>