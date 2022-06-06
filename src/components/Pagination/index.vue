<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button v-if="starNumAndEndNum.star > 1" @click="$emit('getPageNo', 1)" :class="{active:pageNo === 1}">
      1
    </button>
    <button v-if="starNumAndEndNum.star - 1 >= 2">···</button>

    <button
      v-for="(num, index) in starNumAndEndNum.end"
      :key="index"
      v-if="num >= starNumAndEndNum.star"
      @click="$emit('getPageNo', num)"
      :class="{active:pageNo === num}"
    >
      {{ num }}
    </button>

    <button v-if="totalPage - starNumAndEndNum.end >= 2">···</button>
    <button
      v-if="starNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{active:pageNo === totalPage}"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo === totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // pageNo是第几页 pageSize是一页多少个数据 total是整一个分页有多少个数据 continue是连续页是多少 一般5或者7
  props: ["pageNo", "pageSize", "total", "continue"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    starNumAndEndNum() {
      let star, end;
      // 判断连续的页数是否会超过整体的页数，超过则不正常
      if (this.continue > this.totalPage) {
        star = 1;
        end = this.totalPage;
      } else {
        // 正常情况
        star = this.pageNo - parseInt(this.continue / 2);
        end = this.pageNo + parseInt(this.continue / 2);
        // star不能是负数或者是零
        // end不能超过最后一页
        if (star < 1) {
          star = 1;
          end = this.continue;
        }
        // 判断是否已经是最大的数量
        if (end > this.totalPage) {
          end = this.totalPage;
          star = this.totalPage - this.continue + 1;
        }
      }

      return { star, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  padding-top: 15px;
  padding-bottom: 10px;
  button {
    margin: 0 5px;
    background-color: #fff;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
  background-color: skyblue;
}
</style>