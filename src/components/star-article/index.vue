<template>
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{ collected: value }"
    @click="onCollect"
    :loading="loading"
  />
</template>

<script>
import { addCollect, deleteCollect } from "@/api/article"
export default {
  // 组件名称
  name: "starArticle",
  // 组件参数 接收来自父组件的数据
  props: {
    value: {
      type: Boolean,
      default: false
    },
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      loading: false
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async onCollect() {
      try {
        this.loading = true
        if (this.value) {
          await deleteCollect(this.articleId)
        } else {
          await addCollect(this.articleId)
        }
        this.$emit("input", !this.value)
        this.$toast.success(!this.value ? "收藏成功" : "取消收藏")
        this.loading = false
      } catch (e) {
        this.loading = false
        this.$toast.fail("请求失败,请重试")
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
  mounted() {}
}
</script>

<style scoped lang="less"></style>
