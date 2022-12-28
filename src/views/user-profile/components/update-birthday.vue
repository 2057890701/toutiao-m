<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user"
import dayjs from "dayjs"
export default {
  // 组件名称
  name: "UpdateBirthday",
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
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
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
    async onConfirm(value) {
      try {
        console.log(value)
        const valueDate = dayjs(value).format("YYYY-MM-DD")
        this.$toast.loading({
          message: "保存中",
          forbidClick: true,
          duration: 0
        })
        await updateUserProfile({ birthday: valueDate })
        this.$toast.success("修改用户生日成功")
        this.$emit("input", valueDate)
        this.$emit("close")
      } catch (e) {
        this.$toast.fail("修改用户生日失败")
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
