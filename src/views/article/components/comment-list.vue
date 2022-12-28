<template>
  <div class="">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :immediate-check="false"
    >
    </van-list>
    <CommentItem
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click', $event)"
    />
  </div>
</template>

<script>
import { getComments } from "@/api/article"
import CommentItem from "@/views/article/components/comment-item.vue"
export default {
  // 组件名称
  name: "componentList",
  data() {
    return {
      loading: false,
      finished: false,
      error: false
    }
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'a',
      validator(value) {
        return ['a', 'c'].includes(value)
      }
    }
  },
  methods: {
    async onLoad() {
      try {
        const ret = await getComments({
          type: this.type, // 对文章的评论传'a', 对评论的评论传'c'
          source: this.source, // 文章id或评论id
          offset: "", // 第一页传空, 后续翻页传起始id, 这个id接口会返回
          limit: 10 // 固定第一页获取多少条评论数据
        })
        this.list.push(...(ret?.data?.data?.results || []))
        this.loading = false
        console.log("ret comments", ret)
        this.$parent.totalCommentCount = ret.data?.data?.total_count
        // if (Math.random() > 0.2) {
        //   throw new Error('测试')
        // }
        if (this.list.length >= ret.data.data.total_count) {
          this.finished = true
        } else {
          this.offset = ret.data.data.last_id
        }
      } catch (e) {
        this.loading = false
        this.error = true
        console.log(e)
      }
    }
  },
  created() {
    this.onLoad()
  },
  components: {
    CommentItem
  }
}
</script>

<style scoped lang="less"></style>
