<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="onPost">发布</van-button>
  </div>
</template>

<script>
import { addComment } from "@/api/comment"
export default {
  name: "CommentPost",
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      message: ""
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      this.$toast.loading({
        message: "发布中...",
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认 2000，0 表示持续展示不关闭
      })

      try {
        const { articleId } = this.$route.params
        const ret = await addComment({
          target: this.target, // 对文章的评论传文章id, 对评论的评论传评论id
          content: this.message,
          art_id: articleId === this.target ? "" : articleId // 对文章的评论,不需要传递该参数, 对评论的评论传文章id
        })
        console.log("ret CommentPost", ret)
        this.message = ""
        this.$emit("post-success", ret.data.data.new_obj)
        this.$toast.success("发布成功")
      } catch (e) {
        console.log(e)
        this.$toast.fail("发布失败")
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    background: #fff;
    &::before {
      display: none;
    }
  }
}
</style>
