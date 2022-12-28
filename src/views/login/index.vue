<template>
  <div class="login-container">
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()" />
    <van-form @submit="onSubmit" ref="form">
      <van-field
        name="mobile"
        placeholder="手机号"
        v-model="mobile"
        :rules="rules.mobile"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        type="password"
        name="code"
        placeholder="请输入验证码"
        v-model="code"
        :rules="rules.code"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="5 * 1000"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            round
            class="login_btn"
            size="small"
            type="primary"
            v-else
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px;" class="login_sub">
        <van-button block type="info" native-type="submit" class="login_sub_btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from "@/api/login"

export default {
  // 组件名称
  name: "LoginIndex",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      isCountDownShow: false, // false显示发送验证码, true显示读秒
      mobile: "", // 手机号
      code: "", // 验证码
      // rules手机号和验证码输入限制,必须符合规则
      rules: {
        mobile: [
          { required: true, message: "请填写手机号" },
          { pattern: /^1[3-9]\d{9}$/, message: "请填写正确的手机号" }
        ],
        code: [
          { required: true, message: "请输入验证码" },
          { pattern: /^\d{6}$/, message: "请输入6位数字验证码" }
        ]
      }
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    // 点击登录提示加载中,调用接口, duration值为 0 时, 提示不会消失,会被后面的成功或者错误网络提示抵掉
    async onSubmit(val) {
      console.log("submit", val)
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      })
      try {
        const ret = await login(val)
        // console.log("ret", ret)
        this.$toast.success("登录成功") // 登录成功提示, 用轻提示组件
        this.$store.commit("setUserToken", ret.data.data)
        this.$router.push("/my")
      } catch (err) {
        if (err?.response?.status === 400) {
          // console.log("验证码输入错误", err)
          this.$toast.fail("验证码输入错误")
        } else {
          // console.log("网络异常")
          this.$toast.fail("网络异常")
        }
      }
    },
    // 点击发送验证码显示读秒,调用接口,如果验证码获取失败就显示回发送验证码
    async onSendSms() {
      try {
        // 如果手机号不合法,阻止逻辑往下执行
        const ret = await this.$refs.form.validate("mobile").catch((err) => err) // 箭头函数省略了return,所以返回了err错误信息
        console.log(1, ret) // 手机号不合法那么ret就是有内容的,合法就是undefined
        if (ret) return this.$toast.fail(ret.message) // message是err错误信息里的message
        // 点击发送验证码, 就把isCountDownShow置为true显示读秒
        this.isCountDownShow = true
        console.log(111)
        await getSmsCode(this.mobile)
        this.$toast.success("短信发送成功")
      } catch (err) {
        if (err?.response?.status === 429) {
          this.$toast.fail("短信发送太频繁了")
        } else {
          this.$toast.fail("短信发送失败")
        }
        this.isCountDownShow = false // 发送验证码失败就把isCountDownShow置为false重新显示发送验证码
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

<style scoped lang="less">
.iconfont {
  font-size: 37px;
  margin-right: 39px;
}

.login_btn {
  width: 152px;
  height: 46px;
  background-color: #ededed;
  border: none;
  color: #666666;
  font-size: 22px;
  line-height: 22px;
}
.login_sub {
  padding: 53px 28px;
  .login_sub_btn {
    background-color: #6db4fb;
    border: none;
  }
}
</style>
