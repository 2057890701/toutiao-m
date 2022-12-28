<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <!-- /导航栏 -->
    <div class="field-wrap">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入新昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user"
export default {
  // 组件名称
  name: "UpdateName",
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    value: {
      type: String,
      required: true
    }
  },
  // 组件状态值
  data() {
    return {
      localName: this.value
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {},
  mounted() {},
  // 组件方法
  methods: {
    async onConfirm() {
      try {
        if (!this.localName) {
          return this.$toast.fail("用户名内容不能为空")
        }
        this.$toast.loading({
          message: "保存中",
          forbidClick: true,
          duration: 0
        })
        await updateUserProfile({ name: this.localName })
        this.$toast.success("修改用户名成功")
        this.$emit("input", this.localName)
        this.$emit("close")
      } catch (e) {
        this.$toast.fail("修改用户名失败")
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  /deep/ .van-nav-bar__text {
    color: #fff;
  }
}
.field-wrap {
  padding: 20px;
}
</style>
