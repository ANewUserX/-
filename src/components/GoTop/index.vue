<template>
  <div class="GoTop">
    <i class="iconfont icon-up1"></i>
  </div>
</template>

<script>
export default {
  name: "GoTop",
};
</script>

<style lang="less" scoped>
.GoTop {
  width: 55px;
  height: 55px;
  line-height: 55px;
  text-align: center;
  background-color: black;
  border-radius: 3px;
  position: fixed;
  right: 40px;
  bottom: 40px;
  transition: all 0.4s linear;
  i {
    color: #fff;
    font-size: 10px;
  }
}
@media screen and(min-width: 767px) and(max-width:997px) {
  .GoTop {
    width: 40px;
    height: 40px;
    line-height: 40px;
    right: 10px;
    bottom: 40px;
  }
}
@media screen and(max-width: 767px) {
  .GoTop {
    width: 40px;
    height: 40px;
    line-height: 40px;
    right: 10px;
    bottom: 45px;
  }
}
</style>