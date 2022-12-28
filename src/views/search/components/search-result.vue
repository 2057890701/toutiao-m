<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from "@/api/search"
export default {
  // 组件名称
  name: "SearchResult",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      list: [],
      error: false
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },

  methods: {
    async onLoad() {
      try {
        const ret = await getSearchResults({
          page: this.page,
          per_page: 20,
          q: this.searchText
        })
        // if (Math.random() > 0.5) {
        //   JSON.parse("dsnajndjsa")
        // }
        this.list.push(...(ret?.data?.data?.results || []))
        console.log(this.list)
        this.loading = false
        if (this.list.length >= ret.data.data.total_count) {
          this.finished = true
        } else {
          this.page++
        }
      } catch (e) {
        this.loading = false
        this.error = true
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
