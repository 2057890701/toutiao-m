<template>
  <div class="search_container">
    <form action="/" class="search-from">
      <van-search
        clearable
        clear-trigger="always"
        v-model.trim="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#458cfe"
        @focus="isResultShow = false"
      />
    </form>
    <SearchResultVue v-if="isResultShow" :search-text="searchText" />
    <SearchSuggestionVue
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <SearchHistoryVue v-else :search-histories="searchHistories" />
  </div>
</template>

<script>
import SearchHistoryVue from "./components/search-history.vue"
import SearchResultVue from "./components/search-result.vue"
import SearchSuggestionVue from "./components/search-suggestion.vue"
import { getItem, setItem } from "@/utils/storage"
export default {
  // 组件名称
  name: "SearchIndex",
  data() {
    return {
      isResultShow: false,
      searchText: "",
      searchHistories: getItem("TOUTIAO_HISTORIES") || []
    }
  },
  methods: {
    onSearch(val) {
      if (!val) return
      this.searchText = val
      this.isResultShow = true
      // 检索val在searchHistories里的下标,如果没有返回值是-1
      const index = this.searchHistories.indexOf(val)
      if (index > -1) {
        // 如果大于-1, 那么就说明searchHistories里有, index就是val的下标, 所以删除旧的,追加新的
        this.searchHistories.splice(index, 1)
      }
      // 向开头添加val,最多保留10条
      this.searchHistories.unshift(val)
      // 截取前十个,按时间先后从最近的保留,旧的删除
      this.searchHistories = this.searchHistories.splice(0, 10)
    },
    onCancel() {
      this.$router.back()
    }
  },
  components: {
    SearchHistoryVue,
    SearchResultVue,
    SearchSuggestionVue
  },
  watch: {
    searchHistories(newVal) {
      setItem("TOUTIAO_HISTORIES", newVal)
    }
  }
}
</script>

<style scoped lang="less">
.van-search__action {
  color: #fff;
}
.search-from {
  position: sticky;
  z-index: 1;
  top: 0;
  width: 100vw;
}
</style>
