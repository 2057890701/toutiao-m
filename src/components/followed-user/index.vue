<template>
  <div class="">
    <van-button
      class="follow-btn"
      round
      size="small"
      v-if="isFollowed"
      @click="onFollowed"
      :loading="isFollowedLoading"
      >已关注</van-button
    >
    <van-button
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      v-else
      @click="onFollowed"
      :loading="isFollowedLoading"
      >关注</van-button
    >
  </div>
</template>

<script>
import { deleteFollowed, addFollowed } from "@/api/user"
export default {
  // 组件名称
  name: "",
  // 组件参数 接收来自父组件的数据
  props: {
    isFollowed: {
      type: Boolean,
      default: false
    },
    aut_id: {
      type: [Number, String],
      required: true
    }
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      isFollowedLoading: false
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async onFollowed() {
      try {
        this.isFollowedLoading = true
        if (this.isFollowed) {
          await deleteFollowed(this.aut_id)
        } else {
          await addFollowed(this.aut_id)
        }
        // this.is_followed = !this.is_followed
        // 此处子组件更改了父组件传递过来的数据,所以需要子向父传递数据,告诉父组件这个数据取反,才能正常,否则报错
        // this.$parent.article.is_followed = !this.is_followed // 简单方法,直接使用$parent,$parent是当前组件树的根Vue实例
        this.$emit("updateIsFollowed", !this.isFollowed)
        this.isFollowedLoading = false
      } catch (e) {
        if (+e?.response.status === 400) {
          this.$toast.fail(e?.response?.data?.message || "自己不能关注自己")
        } else {
          this.$toast.fail(
            this.isFollowed ? "取消关注用户失败" : "关注用户失败"
          )
        }
        console.log(e)
        this.isFollowedLoading = false
      }
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
  mounted() {},
  model: {
    prop: 'isFollowed',
    event: 'updateIsFollowed'
  }
}
</script>

<style scoped lang="less">
.follow-btn {
  width: 170px;
  height: 58px;
}
</style>
