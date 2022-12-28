<template>
  <div class="update-gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user"
export default {
  data() {
    return {
      columns: ["男", "女"],
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    async onConfirm(value, index) {
      try {
        this.$toast.loading({
          message: "保存中",
          forbidClick: true,
          duration: 0
        })
        await updateUserProfile({ gender: index })
        this.$toast.success("修改用户性别成功")
        this.$emit("input", index)
        this.$emit("close")
      } catch (e) {
        this.$toast.fail("修改用户性别失败")
      }
    }
  }
}
</script>

<style scoped lang="less">
.update-gender {
  /deep/ .van-picker__toolbar {
    background-color: #2892ff;
    color: #fff;
    button {
      color: #fff;
    }
  }
}
</style>
