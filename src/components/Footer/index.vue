<template>
  <footer>
    <div class="container">
      <span>华怡个人篮球分享社区</span>
      <i></i>
      <span>友情链接</span>
      <img src="~assets/images/erweima.jpg" alt="" />
    </div>
  </footer>
</template>

<script>
export default {
  name: "BasketFooter",
};
</script>

<style lang="less" scoped>
footer {
  width: 100%;
  padding: 5px 0 50px 0;
  background-color: #322f2f;
  .container {
    margin-bottom: 30px;
    text-align: center;
    color: #fff;
    span {
      font-size: 18px;
    }
    i {
      display: inline-block;
      width: 2px;
      height: 18px;
      background-color: #fff;
      margin: 0 10px;
      vertical-align: bottom;
      position: relative;
      top: -2px;
    }
    img {
      width: 100px;
      height: 100px;
      margin-left: 10px;
      transform: translateY(50%);
    }
  }
}
</style>