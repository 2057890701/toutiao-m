<template>
  <div class="">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('close')" />
      <!-- #控制弹出显示与否的属性是在父组件中 -->
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 当前评论项 -->
    <CommentItem :comment="comment" />
    <!-- /当前评论项 -->

    <van-cell title="所有回复" />
    <CommentList :list="list" :source="comment.com_id" type="c" />
    <div class="post-wrap">
      <van-button class="post-btn" size="small" round @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <CommentPost :target="comment.com_id" @post-success="onPost"/>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from "./comment-item"
import CommentList from "./comment-list.vue"
import CommentPost from "./comment-post"
export default {
  // 组件名称
  name: "",
  // 组件参数 接收来自父组件的数据
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  // 局部注册的组件
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  // 组件状态值
  data() {
    return {
      isPostShow: false,
      list: [] // 回复列表
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    onPost(commentItem) {
      this.list.unshift(commentItem)
      this.isPostShow = false
    }
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {}
}
</script>

<style scoped lang="less">
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
  // #可以滚动;
}
</style>
