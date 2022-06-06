<template>
  <div class="RouteContainer">
    <div class="container">
      <div class="left"><slot name="left"></slot></div>
      <div class="right" ref="right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RouteContainer",
};
</script>

<style lang="less" scoped>
.RouteContainer {
  width: 100%;
  margin-bottom: 40px;
  .container {
    width: 1150px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .left {
      width: 70%;
    }
    .right {
      width: 29%;
      padding-top: 32px;
    }
  }
}
@media screen and(min-width: 1200px) {
  .RouteContainer {
    width: 100%;
    .container {
      width: 1150px;
    }
  }
}
@media screen and(min-width: 997px) and(max-width:1200px) {
  .RouteContainer {
    width: 100%;
    .container {
      width: 970px;
    }
  }
}
@media screen and(min-width: 767px) and(max-width:997px) {
  .RouteContainer {
    width: 100%;
    .container {
      width: 720px;
      .left {
        width: 100%;
      }
      .right {
        display: none;
      }
    }
  }
}
@media screen and(max-width: 767px) {
  .RouteContainer {
    width: 100%;
    .container {
      width: 100%;
      justify-content: space-around;
      .left {
        width: 97%;
      }
      .right {
        display: none;
      }
    }
  }
}
</style>