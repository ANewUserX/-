<template>
  <div class="BoxContainer">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name:"BoxContainer"
  }
</script>

<style lang="less" scoped>
.BoxContainer{
  width: 100%;
  box-sizing: border-box;
  padding: 0 25px 40px 25px ;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
  margin-top: 30px;
  .container{
    width:100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
  }
}
</style>