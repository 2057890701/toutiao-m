<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(item, index) in suggestions"
      :title="item"
      icon="search"
      :key="index"
      @click="$emit('search', item)"
    >
      <template #title>
        <span v-html="highlight2(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search"
import { debounce } from "lodash"
export default {
  // 组件名称
  name: "SearchSuggestion",

  data() {
    return {
      suggestions: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  methods: {
    async loadSearchSuggestions() {
      try {
        const {
          data: {
            data: { options }
          }
        } = await getSearchSuggestions({
          q: this.searchText
        })
        console.log("options", options)
        this.suggestions = options.filter((it) => it)
      } catch (e) {
        console.log("err", e)
      }
    },
    highlight(item) {
      console.log(item)
      return item
        .split(this.searchText)
        .join(`<span style="color: red">${this.searchText}</span>`)
    },
    highlight2(item) {
      console.log(item)
      return item.replace(
        new RegExp(this.searchText, "gi"),
        `<span style="color: red">${this.searchText}</span>`
      )
    }
  },
  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 300),
      immediate: true
    }
  }
}
</script>

<style scoped lang="less"></style>
