<template>
  <div class="my_container">
    <div class="header">
      <div class="login_btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="" />
        <p>登录 / 注册</p>
      </div>
    </div>

    <div class="header header_user">
      <div class="base_info">
        <van-image round src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        <span>黑马头条号</span>
        <button>编辑资料</button>
      </div>
      <div class="data_status">
        <van-grid :border="false" :column-num="4">
          <van-grid-item>
            <span>8</span>
            <p>头条</p>
          </van-grid-item>
           <van-grid-item>
            <span>8</span>
            <p>头条</p>
          </van-grid-item>
           <van-grid-item>
            <span>8</span>
            <p>头条</p>
          </van-grid-item>
           <van-grid-item>
            <span>8</span>
            <p>头条</p>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "myIndex",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {}
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {},
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
* {
  margin: 0;
  padding: 0;
}
.header {
  height: 361px;
  background: url("~@/assets/banner.png");
  background-size: cover;
  display: flex;
  justify-content: center;
  .login_btn {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 132px;
      height: 132px;
    }
    p {
      font-size: 28px;
      color: #fff;
      margin-top: 15px;
    }
  }
}
.header_user {
  justify-content: left;
  flex-direction: column;
  // align-items: center;
  .base_info {
    width: 100%;
    height: 268px;
    display: flex;
    padding: 0 32px;
    align-items: center;
    .van-image {
      width: 132px;
      height: 132px;
    }
    span {
      font-size: 30px;
      color: #fff;
      margin-left: 22px;
    }
    button {
      width: 116px;
      height: 33px;
      font-size: 20px;
      margin-left: 262px;
      background-color: #ffffff;
      border-radius: 16px;
      border: none;
    }
  }
  .data_status {
    .van-grid {
      /deep/ .van-grid-item__content {
        color: #fff;
        background-color: transparent;
        span {
          font-size: 36px;
        }
        p {
          font-size: 23px;
        }
      }
    }
  }
}
</style>
