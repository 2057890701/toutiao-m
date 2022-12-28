<template>
  <div class="search-history">
    <van-cell title="历史记录">
      <template v-if="isDeleteShow">
        <!-- searchHistories = [] 方案不可行,props数据不能重新赋值,会造成父子组件数据不一致 -->
        <span @click="searchHistories.splice(0)">全部删除</span>
        <!-- <span @click=";(searchHistories.length = 0), $forceUpdate()"
          >全部删除</span
        > -->
        <span @click="isDeleteShow = false">完成</span>
      </template>
      <van-icon name="delete-o" v-else @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="item"
      @click="onSearchItemClick(item, index)"
    >
      <van-icon name="close" v-if="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "SearchHistory",

  data() {
    return {
      isDeleteShow: false
    }
  },
  props: {
    searchHistories: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onSearchItemClick(val, index) {
      // 删除状态
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      }
      // 非删除状态
      else {
        this.$parent.onSearch(val)
      }
    }
  }
}
</script>

<style scoped lang="less">
span {
  margin: 0 10px;
}
</style>
